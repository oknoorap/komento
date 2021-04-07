import { useState, useEffect } from "react";
import { createContainer } from "unstated-next";
import slugify from "slugify";

import { getClientIpAddress } from "utils/network";

type IPFSInstance = Window &
  typeof globalThis & {
    ipfs: any;
  };

const initIPFS = async () => {
  return await (window as any).Ipfs.create({
    repo: "/orbitdb/komento",
    start: true,
    preload: {
      enabled: true,
    },
    EXPERIMENTAL: {
      pubsub: true,
    },
    config: {
      Addresses: {
        Swarm: [
          "/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/",
          "/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star/",
          "/dns4/webrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star/",
        ],
      },
    },
  });
};

const useCommentHook = () => {
  const [origin, setOrigin] = useState<string>();
  const [websiteUrl, setWebsiteUrl] = useState<string>();
  const [config, setConfig] = useState();
  const [clientLocalIp, setClientLocalIp] = useState<string>();
  const [clientIpAddr, setClientIpAddr] = useState<string>();

  useEffect(() => {
    if (!process.browser) return;

    const setup = async () => {
      try {
        // Set host and config
        const { searchParams } = new URL(window.location.href);
        const { origin, src: websiteUrl, config } = Object.fromEntries(
          Array.from(searchParams.entries()).map(([key, value]) => [
            key,
            atob(value),
          ])
        );
        setOrigin(origin);
        setWebsiteUrl(websiteUrl);
        setConfig(JSON.parse(config));

        // Get client / machine IP Address
        const { local, external } = await getClientIpAddress();
        setClientLocalIp(local);
        setClientIpAddr(external);
      } catch (err) {
        console.error(err);
      }
    };

    setup();
  }, []);

  useEffect(() => {
    const setupDB = async () => {
      try {
        if (!(window as IPFSInstance).ipfs) {
          (window as IPFSInstance).ipfs = await initIPFS();
        }

        const orbitdb = await (window as any).OrbitDB.createInstance(
          (window as IPFSInstance).ipfs
        );

        const commentsdb = await orbitdb.open(slugify(websiteUrl), {
          create: true,
          type: "keyvalue",
          accessController: {
            write: ["*"],
          },
        });

        const onChatAdded = () => {};
        commentsdb.events.on("write", onChatAdded);
        commentsdb.events.on("ready", onChatAdded);
        commentsdb.events.on("replicated", onChatAdded);
        await commentsdb.load();
      } catch {}
    };

    // setupDB();
  }, [websiteUrl]);

  return {
    clientLocalIp,
    clientIpAddr,
    config,
    origin,
  };
};

const Container = createContainer(useCommentHook);

export const useComment = Container.useContainer;

export const CommentProvider = Container.Provider;

export default Container;
