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
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const AddCarDialog = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarData, setSnackbarData] = useState({ title: "", message: "" });

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const [carDetails, setCarDetails] = React.useState({
    carmodel: "",
    year: "",
    color: "",
    fuel: "",
    transmition: "",
    doors: "",
    price: "",
    carId: "",
    carLabel: "",
    insurance: "",
  });

  const [images, setImages] = useState([]);

  const handleImages = (e) => {
    setImages([...e.target.files]);
  };

  const resetAllInputs = () => {
    setCarDetails({
      carmodel: "",
      transmition: "",
      fuel: "",
      year: "",
      color: "",
      doors: "",
      price: "",
      carId: "",
      carLabel: "",
      insurance: "",
    });
  };

  const submitPosting = () => {
    if (images.length > 0) {
      const imagesArray = [];
      for (const file of images) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = (e) => {
          const imageData = e.target.result;
          imagesArray.push(imageData);
          if (imagesArray.length === images.length) {
            axios
              .post("http://localhost:8080/insertnewcar", {
                carmodel: carDetails.carmodel,
                transmition: carDetails.transmition,
                fuel: carDetails.fuel,
                year: carDetails.year,
                color: carDetails.color,
                doors: carDetails.doors,
                images: imagesArray,
                price: carDetails.price,
                carId: carDetails.carId,
                carLabel: carDetails.carLabel,
                insurance: carDetails.insurance,
              })
              .then((response) => {
                const { title, message } = response.data;
                setSnackbarData({
                  title: title,
                  message: message,
                });
                setSnackbarOpen(true);
                resetAllInputs();
              });
          }
        };
      }
    } else {
      window.alert("Please Select Images to upload!");
    }
  };

  const hiddenFileInput = React.useRef(null);

  const handleFilesButton = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <Dialog
      open={stateStorage.carDialogOpen}
      onClose={() => {
        stateStorage.updateCarDialog(false);
        resetAllInputs();
      }}
    >
      <DialogTitle>Add Car</DialogTitle>
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
            label="Car Model"
            fullWidth
            autoComplete="off"
            value={carDetails.carmodel}
            onChange={(e) =>
              setCarDetails({ ...carDetails, carmodel: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Transmition</InputLabel>
            <Select
              value={carDetails.transmition}
              onChange={(e) =>
                setCarDetails({ ...carDetails, transmition: e.target.value })
              }
            >
              <MenuItem value="Automatic">Automatic</MenuItem>
              <MenuItem value="Manual">Manual</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Fuel</InputLabel>
            <Select
              value={carDetails.fuel}
              onChange={(e) =>
                setCarDetails({ ...carDetails, fuel: e.target.value })
              }
            >
              <MenuItem value="Gasoline">Gasoline</MenuItem>
              <MenuItem value="Diesel">Diesel</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Year"
            fullWidth
            autoComplete="off"
            type="number"
            value={carDetails.year}
            onChange={(e) =>
              setCarDetails({ ...carDetails, year: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Color"
            fullWidth
            autoComplete="off"
            value={carDetails.color}
            onChange={(e) =>
              setCarDetails({ ...carDetails, color: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Doors</InputLabel>
            <Select
              value={carDetails.doors}
              onChange={(e) =>
                setCarDetails({ ...carDetails, doors: e.target.value })
              }
            >
              <MenuItem value="4">4-Doors</MenuItem>
              <MenuItem value="2">2-Doors</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Price"
            fullWidth
            autoComplete="off"
            type="number"
            value={carDetails.price}
            onChange={(e) =>
              setCarDetails({ ...carDetails, price: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Car ID Number"
            fullWidth
            autoComplete="off"
            type="number"
            value={carDetails.carId}
            onChange={(e) =>
              setCarDetails({ ...carDetails, carId: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Car Label"
            fullWidth
            autoComplete="off"
            value={carDetails.carLabel}
            onChange={(e) =>
              setCarDetails({ ...carDetails, carLabel: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Insurance</InputLabel>
            <Select
              value={carDetails.insurance}
              onChange={(e) =>
                setCarDetails({ ...carDetails, insurance: e.target.value })
              }
            >
              <MenuItem value="Full Kasko">Full Kasko</MenuItem>
              <MenuItem value="None">None</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button
            sx={{
              width: "100%",
              height: "100%",
              background: "blueviolet",
              color: "white",
              "&:hover": {
                background: "blue",
                color: "white",
              },
            }}
            onClick={handleFilesButton}
          >
            Upload images
          </Button>
          <input
            type="file"
            ref={hiddenFileInput}
            style={{ display: "none" }}
            multiple
            onChange={handleImages}
          />
        </Grid>
      </Grid>
      <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          onClick={() => stateStorage.updateCarDialog(false)}
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

export default observer(AddCarDialog);
