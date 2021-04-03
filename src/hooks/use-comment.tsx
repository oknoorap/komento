import { useState, useEffect } from "react";
import { createContainer } from "unstated-next";

import { getClientIpAddress } from "utils/helpers";

const useCommentHook = () => {
  const [host, setHost] = useState<string>();
  const [config, setConfig] = useState();
  const [clientLocalIp, setClientLocalIp] = useState<string>();
  const [clientIpAddr, setClientIpAddr] = useState<string>();

  useEffect(() => {
    if (!process.browser) return;

    const init = async () => {
      try {
        // Set host and config
        const { searchParams } = new URL(window.location.href);
        const { origin: host, config } = Object.fromEntries(
          Array.from(searchParams.entries()).map(([key, value]) => [
            key,
            atob(value),
          ])
        );
        setHost(host);
        setConfig(JSON.parse(config));

        // Get client / machine IP Address
        const { local, external } = await getClientIpAddress();
        setClientLocalIp(local);
        setClientIpAddr(external);
      } catch (err) {
        console.error(err);
      }
    };

    init();
  }, []);

  return {
    clientLocalIp,
    clientIpAddr,
    config,
    host,
  };
};

const Container = createContainer(useCommentHook);

export const useComment = Container.useContainer;

export const CommentProvider = Container.Provider;

export default Container;
