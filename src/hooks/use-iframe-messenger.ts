import { useEffect, useRef, useCallback, useState } from "react";
import { createContainer } from "unstated-next";

import { useComment } from "hooks/use-comment";

type CommentHostRef = {
  source: Window;
  origin: string;
};

const useIframeMessengerHook = () => {
  const { origin } = useComment();
  const commentHost = useRef<CommentHostRef>();
  const [isIframeLoaded, setIframeLoadStatus] = useState<boolean>();

  const resizeIframe = useCallback(() => {
    if (commentHost.current) {
      const { source, origin } = commentHost.current;
      const reqAnim = requestAnimationFrame(() => {
        source.postMessage(
          {
            type: 0,
            height: document.body.clientHeight,
          },
          origin
        );
        cancelAnimationFrame(reqAnim);
      });
    }
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

      commentHost.current = {
        source,
        origin: iframeOrigin,
      };
      setIframeLoadStatus(true);
      resizeIframe();
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
