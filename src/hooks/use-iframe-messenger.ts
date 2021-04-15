import { useEffect, useRef, useCallback, useState } from "react";
import { createContainer } from "unstated-next";

import { useEmbedTheme } from "hooks/use-embed-theme";
import { useComment } from "hooks/use-comment";
import { MessageType, Config } from "scripts/utils";

type CommentHostRef = {
  source: Window;
  origin: string;
};

const useIframeMessengerHook = () => {
  const { origin, setConfig } = useComment();
  const { setTheme } = useEmbedTheme();
  const commentHost = useRef<CommentHostRef>();
  const [isIframeLoaded, setIframeLoadStatus] = useState<boolean>();

  const resizeIframe = useCallback(() => {
    if (!commentHost.current) return;
    const { source, origin } = commentHost.current;
    const reqAnim = requestAnimationFrame(() => {
      source.postMessage(
        {
          type: MessageType.Init,
          height: document.body.clientHeight,
        },
        origin
      );
      cancelAnimationFrame(reqAnim);
    });
  }, []);

  useEffect(() => {
    const onMessage = ({
      origin: iframeOrigin,
      source,
      data,
    }: MessageEvent) => {
      if (iframeOrigin !== origin) return;
      if (typeof data.type === "undefined") return;
      if (source instanceof MessagePort || source instanceof ServiceWorker)
        return;

      switch (data.type) {
        case MessageType.Init:
          commentHost.current = {
            source,
            origin: iframeOrigin,
          };
          setIframeLoadStatus(true);
          resizeIframe();
          break;

        case MessageType.UpdateConfig:
          const { qs, hash, theme } = <Config>data.value;
          setConfig({
            qs,
            hash,
          });
          setTheme({
            ...theme,
          });
          break;
      }
    };

    const eventMessage = "message";
    window.addEventListener(eventMessage, onMessage, false);
    return () => {
      window.removeEventListener(eventMessage, onMessage, false);
    };
  }, [origin]);

  return {
    isIframeLoaded,
    resizeIframe,
  };
};

const Container = createContainer(useIframeMessengerHook);

export const useIframeMessenger = Container.useContainer;

export const IframeMessengerProvider = Container.Provider;

export default Container;
