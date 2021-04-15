export type ThemeConfig = {
  bg: string;
  border: string;
  text: string;
  button: string;
  link: string;
};

type EmojiTone = "";

export type Config = {
  theme?: ThemeConfig;
  emoji?: EmojiTone;
  hash?: boolean;
  qs?: boolean;
  demo?: boolean;
};

export enum MessageType {
  Init,
  UpdateConfig,
}

const commentHostUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;
const scriptTag = `script[src="${commentHostUrl}/embed.js"]`;

const getSelf = () => {
  const self = document.querySelector<HTMLScriptElement>(scriptTag);
  return self;
};

export const getConfig = () => {
  const self = getSelf();
  if (!self) throw new Error("Invalid script call");
  return JSON.parse(self.dataset.config);
};

export const createIframe = () => {
  const self = getSelf();
  const config = getConfig();
  const uri = new URL(window.location.href);
  if (!config.hash) delete uri.hash;
  if (!config.qs) delete uri.search;

  const originb64 = btoa(window.location.origin);
  const urib64 = btoa(uri.toString());
  const configb64 = btoa(JSON.stringify(config));
  const commentSrc = `${commentHostUrl}/embed?origin=${originb64}&src=${urib64}&config=${configb64}`;
  const parent = self.parentElement;

  const iframe = document.createElement("iframe");
  iframe.src = commentSrc;
  iframe.setAttribute("scrolling", "no");
  iframe.style.border = "0";
  iframe.style.width = `100%`;
  iframe.style.height = "270px";
  parent.insertBefore(iframe, self.nextSibling);
  return iframe;
};

export const useMessenger = (iframe: HTMLIFrameElement) => {
  iframe.addEventListener("load", () => {
    iframe?.contentWindow.postMessage({ type: MessageType.Init }, "*");
  });

  window.addEventListener(
    "message",
    ({ origin, source, data }) => {
      if (origin !== commentHostUrl) return;
      if (source instanceof MessagePort || source instanceof ServiceWorker)
        return;
      if (typeof data.type === "undefined") return;
      const { type } = data;

      switch (type) {
        case MessageType.Init:
          iframe.style.height = `${data.height}px`;
          break;
      }
    },
    false
  );
};
