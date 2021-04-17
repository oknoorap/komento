import { FC } from "react";
import dynamic from "next/dynamic";
import remarkGfm from "remark-gfm";
import remarkEmoji from "remark-emoji";
import { Box } from "@chakra-ui/react";

import HeadingRenderer from "./renderers/heading";
import ParagraphRenderer from "./renderers/paragraph";
import ListRenderer, { ListItemRenderer } from "./renderers/list";
import TableRenderer, {
  THRenderer,
  TBodyRenderer,
  TRowRenderer,
  TableCellRenderer,
} from "./renderers/table";
import QuoteRenderer from "./renderers/blockquote";
import LinkRenderer from "./renderers/link";
import DividerRenderer from "./renderers/divider";
import ImageRenderer from "./renderers/image";
import HTMLRenderer from "./renderers/html";

const dynamicOpts = { ssr: false };
const Markdown = dynamic(() => import("react-markdown"), dynamicOpts);
const CodeRenderer = dynamic(() => import("./renderers/code"), dynamicOpts);
const InlinCodeRenderer = dynamic(
  () => import("./renderers/code").then((mod) => mod.InlineCodeRenderer),
  dynamicOpts
);

const plugins = [remarkGfm, remarkEmoji];

const MarkdownPreview: FC = ({ children }) => {
  return (
    <Box
      sx={{
        "*:last-child": {
          mb: 0,
        },
      }}
    >
      <Markdown
        children={children as string}
        plugins={plugins}
        renderers={{
          code: CodeRenderer,
          inlineCode: InlinCodeRenderer,
          heading: HeadingRenderer,
          paragraph: ParagraphRenderer,
          list: ListRenderer,
          listItem: ListItemRenderer,
          table: TableRenderer,
          tableHead: THRenderer,
          tableBody: TBodyRenderer,
          tableRow: TRowRenderer,
          tableCell: TableCellRenderer,
          blockquote: QuoteRenderer,
          link: LinkRenderer,
          linkReference: LinkRenderer,
          thematicBreak: DividerRenderer,
          image: ImageRenderer,
          imageReference: ImageRenderer,
          html: HTMLRenderer,
        }}
      />
    </Box>
  );
};

export default MarkdownPreview;
