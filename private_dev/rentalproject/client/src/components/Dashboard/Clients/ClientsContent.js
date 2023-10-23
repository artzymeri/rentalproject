import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import { observer } from "mobx-react";
import "../../../styling/CarsDashboardList.css";
import stateStorage from "../../../StateStorage";
import ClientsHistory from "./ClientsHistory";
import ClientsList from "./ClientsList";
import { Button } from "@mui/material";

const ClientsContent = () => {
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
                placeholder="Search by name, surname, id"
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
              {stateStorage.clientsListOpen ? (
                <Button
                  variant="contained"
                  onClick={() => stateStorage.updateClientDialog(true)}
                  sx={{ mr: 1 }}
                >
                  Add Client
                </Button>
              ) : null}
              <IconButton>
                <RefreshIcon color="inherit" sx={{ display: "block" }} />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {stateStorage.clientsListOpen ? (
        <ClientsList searchQuery={searchQuery} />
      ) : null}
    </Paper>
  );
};

export default observer(ClientsContent);
