import { FC } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const TableRenderer: FC = ({ children }) => {
  return (
    <Table
      variant="striped"
      size="sm"
      borderWidth="1px"
      borderColor="gray.300"
      width="auto"
      mb="6"
    >
      {children}
    </Table>
  );
};

export const THRenderer: FC = ({ children }) => {
  return <Thead>{children}</Thead>;
};

export const TBodyRenderer: FC = ({ children }) => {
  return <Tbody>{children}</Tbody>;
};

export const TRowRenderer: FC = ({ children }) => {
  return <Tr>{children}</Tr>;
};

type TableCellRenderer = {
  isHeader?: boolean;
  align?: any;
};

export const TableCellRenderer: FC<TableCellRenderer> = ({
  isHeader,
  children,
  align = "left",
}) => {
  return isHeader ? (
    <Th align={align} py="3">
      {children}
    </Th>
  ) : (
    <Td align={align}>{children}</Td>
  );
};

export default TableRenderer;
