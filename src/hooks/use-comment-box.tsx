import { useState, useMemo, useCallback, useEffect } from "react";
import { createContainer } from "unstated-next";

import { useIframeMessenger } from "hooks/use-iframe-messenger";

const useCommentBoxHook = () => {
  const { resizeIframe } = useIframeMessenger();
  const [editor, setEditor] = useState<string>();
  const [preview, setPreview] = useState<string>();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const isWriteTab = useMemo(() => tabIndex === 0, [tabIndex]);
  const isPreviewTab = useMemo(() => tabIndex === 1, [tabIndex]);
  const isHelpTab = useMemo(() => tabIndex === 2, [tabIndex]);

  const onTypeComment = useCallback((event) => {
    setEditor(event.target.value);
  }, []);

  const changeTab = useCallback(
    (index: number) => {
      setPreview(index > 0 ? editor : "");
      setTabIndex(index);
    },
    [editor]
  );

  useEffect(() => {
    resizeIframe();
  }, [tabIndex]);

  return {
    editor,
    preview,
    tabIndex,
    isWriteTab,
    isPreviewTab,
    isHelpTab,
    changeTab,
    onTypeComment,
  };
};

const Container = createContainer(useCommentBoxHook);

export const useCommentBox = Container.useContainer;

export const CommentBoxProvider = Container.Provider;

export default Container;
