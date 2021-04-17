import { FC } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { lighten } from "polished";

import { useEmbedTheme } from "hooks/use-embed-theme";

const TableRenderer: FC = ({ children }) => {
  const { borderColor } = useEmbedTheme();
  return (
    <Table
      variant="striped"
      size="sm"
      borderWidth="1px"
      borderColor={borderColor}
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
  const { borderColor } = useEmbedTheme();
  return (
    <Tr
      sx={{
        ":nth-of-type(odd) td": {
          bg: `${lighten(0.12, borderColor)} !important`,
        },
      }}
    >
      {children}
    </Tr>
  );
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
  const { textColor } = useEmbedTheme();
  return isHeader ? (
    <Th align={align} border="none" py="3" color={textColor}>
      {children}
    </Th>
  ) : (
    <Td align={align} border="none">
      {children}
    </Td>
  );
};

export default TableRenderer;
