import * as React from "react";
import axios from "axios";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";

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

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "carmodel",
    numeric: true,
    disablePadding: false,
    label: "Car Model",
  },
  {
    id: "year",
    numeric: true,
    disablePadding: false,
    label: "Year",
  },
  {
    id: "color",
    numeric: true,
    disablePadding: false,
    label: "Color",
  },
  {
    id: "fuel",
    numeric: true,
    disablePadding: false,
    label: "Fuel",
  },
  {
    id: "transmition",
    numeric: true,
    disablePadding: false,
    label: "Transmition",
  },
  {
    id: "doors",
    numeric: true,
    disablePadding: false,
    label: "Doors",
  },
  {
    id: "carId",
    numeric: true,
    disablePadding: false,
    label: "Car ID",
  },
  {
    id: "carLabel",
    numeric: true,
    disablePadding: false,
    label: "Legal Label",
  },
  {
    id: "insurance",
    numeric: true,
    disablePadding: false,
    label: "Insurance",
  },
  {
    id: "availability",
    numeric: true,
    disablePadding: false,
    label: "Availability",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Price",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "normal" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const RentedCars = ({ searchQuery }) => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("brand");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [carsArray, setCarsArray] = React.useState([]);

  function createData(
    id,
    carmodel,
    year,
    color,
    fuel,
    transmition,
    doors,
    carId,
    carLabel,
    insurance,
    availability,
    price
  ) {
    return {
      id,
      carmodel,
      year,
      color,
      fuel,
      transmition,
      doors,
      carId,
      carLabel,
      insurance,
      availability,
      price,
    };
  }

  React.useEffect(() => {
    axios.get("http://localhost:8080/getcars").then((response) => {
      setCarsArray(response.data);
      console.log(response.data);
    });
  }, []);

  const rows = carsArray
    .map((car) => {
      if (car.availability === "Rented") {
        return createData(
          car.id,
          car.carmodel,
          car.year,
          car.color,
          car.fuel,
          car.transmition,
          car.doors,
          car.carId,
          car.carLabel,
          car.insurance,
          car.availability,
          car.price
        );
      }
      return {};
    })
    .filter((row) => Object.keys(row).length !== 0);

  const handleRequestSort = (event, brand) => {
    const isAsc = orderBy === brand && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(brand);
  };

  const filteredRows = React.useMemo(() => {
    return rows.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, rows]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(filteredRows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, filteredRows]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={dense ? "small" : "medium"}
        >
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {visibleRows.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell align="right">{row.carmodel}</TableCell>
                  <TableCell align="right">{row.year}</TableCell>
                  <TableCell align="right">{row.color}</TableCell>
                  <TableCell align="right">{row.fuel}</TableCell>
                  <TableCell align="right">{row.transmition}</TableCell>
                  <TableCell align="right">{row.doors}</TableCell>
                  <TableCell align="right">{row.carId}</TableCell>
                  <TableCell align="right">{row.carLabel}</TableCell>
                  <TableCell align="right">{row.insurance}</TableCell>
                  <TableCell align="right">{row.availability}</TableCell>
                  <TableCell align="right">{row.price}€</TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (dense ? 33 : 53) * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default RentedCars;
