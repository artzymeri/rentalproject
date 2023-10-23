import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import ContentAppBar from "../ContentAppBar";
import { observer } from "mobx-react";
import stateStorage from "../../../StateStorage";

const lightColor = "rgba(255, 255, 255, 0.7)";

function ReservationsNavbar(props) {
  const { onDrawerToggle } = props;

  const [tabValue, setTabValue] = React.useState(0);

  const activateReservationsCalendar = () => {
    stateStorage.updateReservationsCalendar(true);
    stateStorage.updateReservationsList(false);
    stateStorage.updateReservationsArchive(false);
  };

  const activateReservationsList = () => {
    stateStorage.updateReservationsCalendar(false);
    stateStorage.updateReservationsList(true);
    stateStorage.updateReservationsArchive(false);
  };

  const activateReservationsArchive = () => {
    stateStorage.updateReservationsCalendar(false);
    stateStorage.updateReservationsList(false);
    stateStorage.updateReservationsArchive(true);
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
                Reservations
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
            label="Reservations Calendar"
            onClick={() => {
              setTabValue(0);
              activateReservationsCalendar();
            }}
          />
          <Tab
            label="Reservations List"
            onClick={() => {
              setTabValue(1);
              activateReservationsList();
            }}
          />
          <Tab
            label="Archive"
            onClick={() => {
              setTabValue(2);
              activateReservationsArchive();
            }}
          />
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}

ReservationsNavbar.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default observer(ReservationsNavbar);
