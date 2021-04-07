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
  const { tabIndex, changeTab, isHelpTab } = useCommentBox();
  const tabFocusProps = { outline: "none" };
  const tabSelectedProps = {
    bgColor: "white",
    borderLeftColor: "gray.400",
    borderRightColor: "gray.400",
    borderTopColor: "gray.400",
    borderTopRadius: "md",
    color: "gray.700",
  };
  const tabProps = {
    borderRadius: 0,
    borderColor: "transparent",
    fontSize: "xs",
    fontWeight: "bold",
    color: "gray.500",
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
        bg="gray.100"
        borderWidth="1px"
        borderColor="gray.400"
        borderTopRightRadius="md"
        borderTopLeftRadius="md"
        pt="1"
        px="2"
      >
        <Tab {...tabProps} borderTopLeftRadius="lg">
          WRITE
        </Tab>
        <Tab {...tabProps}>PREVIEW</Tab>
        <Tab ml="auto" {...tabProps}>
          <Icon as={HelpIcon} mr="1" w="4" h="auto" />
          <Box as="span">Help</Box>
        </Tab>
      </TabList>
      <TabPanels
        borderWidth="0 1px 1px"
        borderColor="gray.400"
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
