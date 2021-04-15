import { createIframe, useMessenger } from "./utils";

const embed = () => {
  try {
    const iframe = createIframe();
    useMessenger(iframe);
  } catch (err) {
    console.log(err);
  }
};

embed();
