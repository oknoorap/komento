const commentHostUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;
const { origin: websiteHost, href: websiteUrl } = window.location;
const scriptTag = `script[src="${commentHostUrl}/embed.js"]`;
const self = document.querySelector<HTMLScriptElement>(scriptTag);

type SizeVariant = "xs" | "sm" | "md" | "lg";

type Theme = {
  body: {
    color: string;
  };
  text: {
    font?: string;
    size: SizeVariant;
    color: string;
  };
};

type EmojiTone = "";

type Config = {
  theme?: Theme;
  emoji?: EmojiTone;
  hash?: boolean;
  qs?: boolean;
};

enum MessageType {
  Init,
}

const getConfig = () => {
  if (!self) throw new Error("Invalid script call");
  return JSON.parse(self.dataset.config);
};

const createIframe = (url: string, config: Config = {}) => {
  const uri = new URL(url);
  if (!config.hash) delete uri.hash;
  if (!config.qs) delete uri.search;

  const originb64 = btoa(websiteHost);
  const urib64 = btoa(uri.toString());
  const configb64 = btoa(JSON.stringify(config));
  const commentSrc = `${commentHostUrl}/embed?origin=${originb64}&src=${urib64}&config=${configb64}`;
  const parent = self.parentElement;

  const iframe = document.createElement("iframe");
  iframe.src = commentSrc;
  iframe.setAttribute("scrolling", "no");
  iframe.style.border = "0";
  iframe.style.width = `100%`;
  iframe.style.height = "175px";
  parent.insertBefore(iframe, self.nextSibling);
  return iframe;
};

const useMessenger = (iframe: HTMLIFrameElement) => {
  iframe.onload = () => {
    iframe?.contentWindow.postMessage({ type: MessageType.Init }, "*");
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
};

export const embed = () => {
  try {
    const iframe = createIframe(websiteUrl, getConfig());
    useMessenger(iframe);
  } catch (err) {
    console.log(err);
  }
};

embed();
