import { FC } from "react";
import {
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Icon,
} from "@chakra-ui/react";
import { IoHelpCircleSharp as HelpIcon } from "react-icons/io5";
import { darken, lighten } from "polished";

import { useEmbedTheme } from "hooks/use-embed-theme";
import { useCommentBox } from "hooks/use-comment-box";

import Editor from "./editor";
import Preview from "./preview";
import Help from "./help";
import Submit from "./submit";

type CommentBoxProps = {
  withCancelBtn?: boolean;
  onCancel?: () => void;
};

const CommentBoxView: FC<CommentBoxProps> = ({
  withCancelBtn = false,
  onCancel = () => {},
}) => {
  const { bgColor, borderColor, textColor } = useEmbedTheme();
  const { tabIndex, changeTab, isHelpTab } = useCommentBox();
  const $borderColor = darken(0.15, borderColor);
  const tabFocusProps = { outline: "none" };
  const tabSelectedProps = {
    bgColor: bgColor,
    borderLeftColor: $borderColor,
    borderRightColor: $borderColor,
    borderTopColor: $borderColor,
    borderTopRadius: "md",
    color: textColor,
  };
  const tabProps = {
    borderRadius: 0,
    borderColor: "transparent",
    fontSize: "xs",
    fontWeight: "bold",
    textTransform: "uppercase" as any,
    color: lighten(0.15, textColor),
    _focus: tabFocusProps,
    _selected: tabSelectedProps,
  };

  return (
    <Tabs
      index={tabIndex}
      onChange={changeTab}
      size="md"
      variant="enclosed"
      position="relative"
    >
      <TabList
        bg={darken(0.03, bgColor)}
        borderWidth="1px"
        borderColor={$borderColor}
        borderTopRightRadius="md"
        borderTopLeftRadius="md"
        pt="1"
        px="2"
      >
        <Tab {...tabProps} borderTopLeftRadius="lg">
          Write
        </Tab>
        <Tab {...tabProps}>Preview</Tab>
        <Tab ml="auto" {...tabProps} textTransform="capitalize">
          <Icon as={HelpIcon} mr="1" w="4" h="auto" />
          <Box as="span">Help</Box>
        </Tab>
      </TabList>
      <TabPanels
        borderWidth="0 1px 1px"
        borderColor={$borderColor}
        borderBottomRadius="md"
      >
        <TabPanel>
          <Editor />
        </TabPanel>
        <TabPanel>
          <Preview />
        </TabPanel>
        <TabPanel>
          <Help />
        </TabPanel>
        {!isHelpTab && <Submit cancelBtn={withCancelBtn} onCancel={onCancel} />}
      </TabPanels>
    </Tabs>
  );
};

export default CommentBoxView;
