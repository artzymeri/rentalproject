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

const lightColor = "rgba(255, 255, 255, 0.7)";

function InvoicesNavbar(props) {
  const { onDrawerToggle } = props;

  const [tabValue, setTabValue] = React.useState(0);

  const activateMakeInvoices = () => {
    stateStorage.updateMakeInvoices(true);
    stateStorage.updateInvoicesArchive(false);
  };

  const activateInvoicesArchive = () => {
    stateStorage.updateMakeInvoices(false);
    stateStorage.updateInvoicesArchive(true);
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
                Invoices
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
            label="Make invoices"
            onClick={() => {
              setTabValue(0);
              activateMakeInvoices();
            }}
          />
          <Tab
            label="Invoices Archive"
            onClick={() => {
              setTabValue(1);
              activateInvoicesArchive();
            }}
          />
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}

InvoicesNavbar.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default observer(InvoicesNavbar);
