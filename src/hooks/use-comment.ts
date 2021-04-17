import { useState, useEffect, useRef, useCallback } from "react";
import { createContainer } from "unstated-next";
import slugify from "slugify";

import { useEmbedTheme } from "hooks/use-embed-theme";
import { Config } from "scripts/utils";
import { getClientIpAddress } from "utils/network";

type IPFSInstance = Window &
  typeof globalThis & {
    ipfs: any;
  };

export const DB_KEY = "comments";

const initIPFS = async () => {
  return await (window as any).Ipfs.create({
    repo: "/orbitdb/komento",
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
  const dbRef = useRef<any>();
  const { setTheme } = useEmbedTheme();
  const [isDBReady, setDBStatus] = useState<boolean>();
  const [origin, setOrigin] = useState<string>();
  const [websiteUrl, setWebsiteUrl] = useState<string>();
  const [config, setConfig] = useState<Config>();
  const [isDemo, setIsDemo] = useState(false);
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
        const { demo, hash, qs, theme, emoji }: Config = JSON.parse(config);
        setOrigin(origin);
        setWebsiteUrl(websiteUrl);
        setConfig({ hash, qs });
        setTheme(theme);
        setIsDemo(Boolean(demo));

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
    if (!websiteUrl) return;
    if (!config) return;
    if (isDemo) {
      setDBStatus(true);
      return;
    }

    const dbAddress = slugify(websiteUrl, {
      remove: /[/\:\(\)\?\#]/g,
    });

    const setupDB = async () => {
      try {
        if (!(window as IPFSInstance).ipfs) {
          (window as IPFSInstance).ipfs = await initIPFS();
        }

        const orbitdb = await (window as any).OrbitDB.createInstance(
          (window as IPFSInstance).ipfs
        );

        dbRef.current = await orbitdb.open(dbAddress, {
          create: true,
          sync: true,
          type: "keyvalue",
          accessController: {
            write: ["*"],
          },
        });
        setDBStatus(true);
      } catch (err) {
        console.log(err);
      }
    };

    window.addEventListener("load", setupDB);
    return () => {
      window.removeEventListener("load", setupDB);
    };
  }, [websiteUrl, isDemo]);

  return {
    dbRef,
    isDBReady,
    clientLocalIp,
    clientIpAddr,
    config,
    origin,
    isDemo,
    setConfig,
    setTheme,
  };
};

const Container = createContainer(useCommentHook);

export const useComment = Container.useContainer;

export const CommentProvider = Container.Provider;

export default Container;
