import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ContentAppBar from "../ContentAppBar";
import { observer } from "mobx-react";
import stateStorage from "../../../StateStorage";

function ClientsNavbar(props) {
  const { onDrawerToggle } = props;

  const activateClientsList = () => {
    stateStorage.updateClientsList(true);
    stateStorage.updateClientsHistory(false);
  };

  const activateClientsHistory = () => {
    stateStorage.updateClientsList(false);
    stateStorage.updateClientsHistory(true);
  };

  const [tabValue, setTabValue] = React.useState(0);

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
                Clients
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
            label="Clients List"
            onClick={() => {
              setTabValue(0);
              activateClientsList();
            }}
          />
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}

ClientsNavbar.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default observer(ClientsNavbar);
