import { observer } from "mobx-react";
import React, { useState } from "react";
import stateStorage from "../../../StateStorage";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";

const AddClientDialog = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarData, setSnackbarData] = useState({ title: "", message: "" });

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const [clientDetails, setClientDetails] = React.useState({
    name: "",
    birthdate: "",
    idNumber: "",
    location: "",
  });

  const resetAllInputs = () => {
    setClientDetails({
      name: "",
      surname: "",
      birthdate: "",
      idNumber: "",
      location: "",
    });
  };

  const submitPosting = () => {
    axios
      .post("http://localhost:8080/insertnewclient", {
        name: clientDetails.name,
        birthdate: clientDetails.birthdate,
        IdNumber: clientDetails.idNumber,
        location: clientDetails.location,
      })
      .then((response) => {
        const { title, message } = response.data;
        setSnackbarData({
          title: title,
          message: message,
        });
        setSnackbarOpen(true);
      });
  };

  return (
    <Dialog
      open={stateStorage.clientDialogOpen}
      onClose={() => {
        stateStorage.updateCarDialog(false);
        resetAllInputs();
      }}
    >
      <DialogTitle>Add Client</DialogTitle>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={snackbarData.title.toLowerCase()}
        >
          {snackbarData.message}
        </MuiAlert>
      </Snackbar>
      <Grid container spacing={2} padding={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Name"
            fullWidth
            autoComplete="off"
            value={clientDetails.name}
            onChange={(e) =>
              setClientDetails({ ...clientDetails, name: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            autoComplete="off"
            value={clientDetails.birthdate}
            onChange={(e) =>
              setClientDetails({ ...clientDetails, birthdate: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="ID Number"
            fullWidth
            autoComplete="off"
            value={clientDetails.idNumber}
            onChange={(e) =>
              setClientDetails({ ...clientDetails, idNumber: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Location"
            fullWidth
            autoComplete="off"
            value={clientDetails.location}
            onChange={(e) =>
              setClientDetails({ ...clientDetails, location: e.target.value })
            }
          />
        </Grid>
      </Grid>
      <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          onClick={() => stateStorage.updateClientDialog(false)}
          color="error"
          variant="contained"
          fullWidth
        >
          Cancel
        </Button>
        <Button
          onClick={submitPosting}
          variant="contained"
          color="primary"
          fullWidth
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default observer(AddClientDialog);
