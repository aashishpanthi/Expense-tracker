import { filter } from "lodash";
import Iconify from "../components/Iconify";

import { useState } from "react";
import { Link } from "react-router-dom";
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";
// components
import Page from "../components/Page";
import Label from "../components/Label";
import SearchNotFound from "../components/SearchNotFound";
import { UserListHead, UserListToolbar } from "../components/tableHead";

import { Edit } from "@mui/icons-material";
// import toast from "react-hot-toast";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "expenseName", label: "Name" },
  { id: "amount", label: "Amount" },
  { id: "date", label: "Date" },
  { id: "description", label: "Description" },
  { id: "category", label: "Category" },
  { id: "" },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("expenseName");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  function applySortFilter(array, comparator, query) {
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis?.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    if (query) {
      return filter(array, (_e) => {
        return (
          _e["expenseName"].toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
      });
    }
    return stabilizedThis?.map((el) => el[0]);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = expenses.map((n) => n.employee_contact);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleDelete = () => {
    // toast.success("Delete selected");
    setSelected([]);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - expenses.length) : 0;

  const filteredUsers = applySortFilter(
    expenses,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Expenses">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Expenses
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="new"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Expense
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            handleDelete={handleDelete}
            select={false}
          />

          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={expenses.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const {
                      _id,
                      employee_contact,
                      employee_name,
                      employee_limit,
                      employee_status,
                      employee_post,
                    } = row;
                    const isItemSelected =
                      selected.indexOf(employee_contact) !== -1;

                    return (
                      <TableRow
                        hover
                        key={_id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            onChange={(event) =>
                              handleClick(event, employee_contact)
                            }
                          />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Link
                            to={`edit/${employee_contact}`}
                            style={{
                              textDecoration: "none",
                              color: "inherit",
                            }}
                          >
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Avatar alt={employee_name} src="" />
                              <Typography variant="subtitle2" noWrap>
                                {employee_name}
                              </Typography>
                            </Stack>
                          </Link>
                        </TableCell>
                        <TableCell align="left">
                          {employee_limit > 5 ? (
                            <Label variant="ghost" color="success">
                              {employee_limit}
                            </Label>
                          ) : (
                            <Label variant="ghost" color="error">
                              {employee_limit}
                            </Label>
                          )}
                        </TableCell>

                        <TableCell align="left">
                          {employee_status == true ? (
                            <Label variant="ghost" color="success">
                              Active
                            </Label>
                          ) : (
                            <Label variant="ghost" color="error">
                              Inactive
                            </Label>
                          )}
                        </TableCell>

                        <TableCell align="left">
                          {employee_post == "E2" && "Outside Staff"}
                          {employee_post == "E1" && "Office Staff"}
                          {employee_post == "ADMIN" && "Admin"}
                        </TableCell>
                        <TableCell align="left">{employee_contact}</TableCell>

                        <TableCell align="right">
                          <Link to={`edit/${employee_contact}`}>
                            <Edit />
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>

              {isUserNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <SearchNotFound searchQuery={filterName} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={expenses.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
