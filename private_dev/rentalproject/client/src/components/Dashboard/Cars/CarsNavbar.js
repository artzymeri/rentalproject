import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ContentAppBar from "../ContentAppBar";
import stateStorage from "../../../StateStorage";
import { observer } from "mobx-react";

function CarsNavbar(props) {
  const { onDrawerToggle } = props;

  const [tabValue, setTabValue] = React.useState(0);

  const activateCarsList = () => {
    stateStorage.updateCarsList(true);
    stateStorage.updateRentedCars(false);
    stateStorage.updateAvailableCars(false);
    stateStorage.updateOutOfServiceCars(false);
  };

  const activateRentedCars = () => {
    stateStorage.updateCarsList(false);
    stateStorage.updateRentedCars(true);
    stateStorage.updateAvailableCars(false);
    stateStorage.updateOutOfServiceCars(false);
  };

  const activateAvailableCars = () => {
    stateStorage.updateCarsList(false);
    stateStorage.updateRentedCars(false);
    stateStorage.updateAvailableCars(true);
    stateStorage.updateOutOfServiceCars(false);
  };

  const activateOutOfServiceCars = () => {
    stateStorage.updateCarsList(false);
    stateStorage.updateRentedCars(false);
    stateStorage.updateAvailableCars(false);
    stateStorage.updateOutOfServiceCars(true);
  };

  return (
    <React.Fragment>
      <ContentAppBar />
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                Cars
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Tabs value={tabValue} textColor="inherit">
          <Tab
            label="Car List"
            onClick={() => {
              setTabValue(0);
              activateCarsList();
            }}
          />
          <Tab
            label="Rented Cars"
            onClick={() => {
              setTabValue(1);
              activateRentedCars();
            }}
          />
          <Tab
            label="Available Cars"
            onClick={() => {
              setTabValue(2);
              activateAvailableCars();
            }}
          />
          <Tab
            label="Out of Service Cars"
            onClick={() => {
              setTabValue(3);
              activateOutOfServiceCars();
            }}
          />
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}

CarsNavbar.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default observer(CarsNavbar);
