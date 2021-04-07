import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";

import MarkdownPreview from "components/markdown-preview";
import Scrollbar from "components/scrollbar";

import basicDoc from "./help-basic.doc.md";
import headingDoc from "./help-heading.doc.md";
import listDoc from "./help-list.doc.md";
import linkDoc from "./help-link.doc.md";
import imageDoc from "./help-image.doc.md";
import codesDoc from "./help-codes.doc.md";
import emojisDoc from "./help-emojis.doc.md";
import extrasDoc from "./help-extras.doc.md";

const tabs = [
  { label: "Basics", content: basicDoc },
  { label: "Heading", content: headingDoc },
  { label: "List", content: listDoc },
  { label: "Link", content: linkDoc },
  { label: "Image", content: imageDoc },
  { label: "Codes", content: codesDoc },
  { label: "Emojis", content: emojisDoc },
  { label: "Extras", content: extrasDoc },
];

const CommentBoxHelpView = () => {
  const tabProps = {
    bgColor: "cerulean.500",
    color: "white",
    mr: 2,
    _focus: { outline: "none" },
  };

  return (
    <Tabs isLazy size="sm" variant="soft-rounded">
      <TabList>
        {tabs.map(({ label }, index) => (
          <Tab key={`tab-${index}`} {...tabProps}>
            {label}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {tabs.map(({ content }, index) => (
          <TabPanel key={`tab-panel-${index}`}>
            <Scrollbar maxHeight={350}>
              <MarkdownPreview>{content}</MarkdownPreview>
            </Scrollbar>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default CommentBoxHelpView;
