import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import { observer } from "mobx-react";
import stateStorage from "../../../StateStorage";
import "../../../styling/CarsDashboardList.css";
import CarsList from "./CarsList";
import RentedCars from "./RentedCars";
import AvailableCars from "./AvailableCars";
import OutOfServiceCars from "./OutOfServiceCars";

const CarsContent = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Paper
      sx={{
        maxWidth: 1100,
        maxHeight: 600,
        margin: "auto",
        overflow: "auto",
        position: "relative",
      }}
    >
      <AppBar
        position="sticky"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon color="inherit" sx={{ display: "block" }} />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Search by brand, model, transmition, fuel or year"
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: "default" },
                }}
                variant="standard"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </Grid>
            <Grid item>
              {stateStorage.carListOpen ? (
                <Button
                  variant="contained"
                  onClick={() => stateStorage.updateCarDialog(true)}
                  sx={{ mr: 1 }}
                >
                  Add car
                </Button>
              ) : null}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {stateStorage.carListOpen ? <CarsList searchQuery={searchQuery} /> : null}
      {stateStorage.rentedCarsOpen ? (
        <RentedCars searchQuery={searchQuery} />
      ) : null}
      {stateStorage.availableCarsOpen ? (
        <AvailableCars searchQuery={searchQuery} />
      ) : null}
      {stateStorage.outOfServiceCarsOpen ? (
        <OutOfServiceCars searchQuery={searchQuery} />
      ) : null}
    </Paper>
  );
};

export default observer(CarsContent);
