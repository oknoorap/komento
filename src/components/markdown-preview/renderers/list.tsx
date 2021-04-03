import { FC } from "react";
import { UnorderedList, OrderedList, ListItem } from "@chakra-ui/react";

type ListRendererProps = {
  ordered?: boolean;
};

const ListRenderer: FC<ListRendererProps> = ({ ordered, children }) => {
  return ordered ? (
    <OrderedList mb="4">{children}</OrderedList>
  ) : (
    <UnorderedList mb="4">{children}</UnorderedList>
  );
};

export const ListItemRenderer: FC = ({ children }) => {
  return <ListItem>{children}</ListItem>;
};

export default ListRenderer;
