import {
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { ReactNode } from "react";
import { COLORS } from "../../styles/colors";

export type Column<T> = {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => ReactNode;
};

export type GenericTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  count?: number;
  currentPage?: number;
  onPageChange?: (newPage: number) => void;
  MobileViewCard?: React.FC<{ data: T }>;
};

// TableCell
function GenericTableCell<T>({
  value,
  render,
  row,
}: {
  value: T[keyof T];
  render?: (value: T[keyof T], row: T) => ReactNode;
  row: T;
}) {
  return (
    <TableCell align="center">
      <Typography fontWeight={600} color={COLORS.grey_table_cell}>
        {render ? render(value, row) : String(value)}
      </Typography>
    </TableCell>
  );
}

// TableRow
function GenericTableRow<T extends { id: string | number }>({
  row,
  columns,
}: {
  row: T;
  columns: Column<T>[];
}) {
  return (
    <TableRow>
      {columns.map((column) => (
        <GenericTableCell
          key={String(column.key)}
          value={row[column.key]}
          render={column.render}
          row={row}
        />
      ))}
    </TableRow>
  );
}

// TableHeader
function TableHeader<T>({ columns }: { columns: Column<T>[] }) {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell align="center" key={String(column.key)}>
            <Typography fontWeight={600} color={COLORS.text_gray} my={1}>
              {column.header}
            </Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// GenericTable
const GenericTable = <T extends { id: string | number }>({
  data,
  columns,
  onPageChange,
  count = 0,
  currentPage = 1,
  MobileViewCard,
}: GenericTableProps<T>) => {
  const isBelowMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  return (
    <TableContainer sx={{ overflowX: "auto" }}>
      {isBelowMd ? (
        <Stack gap={2} width={"100%"}>
          {data.map((each) =>
            MobileViewCard ? <MobileViewCard key={each.id} data={each} /> : null
          )}
        </Stack>
      ) : (
        <Table>
          <TableHeader columns={columns} />
          <TableBody sx={{ ".MuiTableCell-root": { p: 0.5 } }}>
            {data.map((row) => (
              <GenericTableRow key={row.id} row={row} columns={columns} />
            ))}
          </TableBody>
        </Table>
      )}
      {currentPage > 1 && (
        <Stack
          gap={1}
          p={2}
          direction={{ xs: "column", sm: "row" }}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography fontWeight={400} color={COLORS.black} fontSize={"12px"}>
            {` Showing ${(currentPage - 1) * 10 + 1} to ${Math.min(currentPage * 10, count)} of
            ${count} entries`}
          </Typography>
          <Pagination
            onChange={(_e, page) => onPageChange?.(page)}
            page={currentPage}
            count={Math.ceil(count / 10)}
          />
        </Stack>
      )}
    </TableContainer>
  );
};

export default GenericTable;
