import { useState, useMemo, useRef, useEffect } from "react";
import { createContainer } from "unstated-next";

import { MessageType } from "scripts/utils";

const useSetupHook = () => {
  const previewIframeRef = useRef<HTMLIFrameElement>();
  const [isPreviewLoaded, setPreviewLoadStatus] = useState(false);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [borderColor, setBorderColor] = useState("#CBD5E0");
  const [textColor, setTextColor] = useState("#2D3748");
  const [buttonColor, setButtonColor] = useState("#0fa7dc");
  const [linkColor, setLinkColor] = useState("#0fa7dc");
  const [codeHighlighter, setCodeHighlighter] = useState("github");
  const [withQS, setWithQS] = useState(false);
  const [withHash, setWithHash] = useState(false);
  const dataConfig = useMemo(() => {
    return {
      theme: {
        bg: bgColor,
        border: borderColor,
        text: textColor,
        button: buttonColor,
        link: linkColor,
        highlighter: codeHighlighter,
      },
      qs: withQS,
      hash: withHash,
    };
  }, [
    bgColor,
    borderColor,
    textColor,
    buttonColor,
    linkColor,
    codeHighlighter,
    withQS,
    withHash,
  ]);

  useEffect(() => {
    if (!previewIframeRef?.current?.contentWindow) return;
    previewIframeRef.current.contentWindow.postMessage(
      {
        type: MessageType.UpdateConfig,
        value: dataConfig,
      },
      "*"
    );
  }, [isPreviewLoaded, dataConfig]);

  return {
    bgColor,
    setBgColor,
    borderColor,
    setBorderColor,
    textColor,
    setTextColor,
    buttonColor,
    setButtonColor,
    linkColor,
    setLinkColor,
    codeHighlighter,
    setCodeHighlighter,
    withQS,
    setWithQS,
    withHash,
    setWithHash,
    dataConfig,
    previewIframeRef,
    isPreviewLoaded,
    setPreviewLoadStatus,
  };
};

const Container = createContainer(useSetupHook);

export const useSetup = Container.useContainer;

export const SetupProvider = Container.Provider;

export default Container;
