import { observer } from "mobx-react";
import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
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
import axios from "axios";

const EditCarDialog = ({ car, onClose }) => {
  const [editedCar, setEditedCar] = useState({ ...car });
  const [images, setImages] = useState(editedCar.images);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarData, setSnackbarData] = useState({ title: "", message: "" });

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const submitEdit = () => {
    axios
      .post("http://localhost:8080/updatecar", {
        id: editedCar.id,
        carmodel: editedCar.carmodel,
        transmition: editedCar.transmition,
        fuel: editedCar.fuel,
        year: editedCar.year,
        color: editedCar.color,
        doors: editedCar.doors,
        images: JSON.stringify(images),
        price: editedCar.price,
        carId: editedCar.carId,
        carLabel: editedCar.carLabel,
        insurance: editedCar.insurance,
        condition: editedCar.condition,
      })
      .then((response) => {
        const { title, message } = response.data;
        setSnackbarData({
          title: title,
          message: message,
        });
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error("Error updating car data:", error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedCar({
      ...editedCar,
      [name]: value,
    });
  };

  const hiddenFileInput = React.useRef(null);

  const handleImagesChange = (e) => {
    const imageArray = [];
    for (const file of e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        imageArray.push(e.target.result);
        setImages(imageArray);
      };
    }
  };

  const handleFilesButton = () => {
    hiddenFileInput.current.click();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Edit Car</DialogTitle>
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
            name="model"
            value={editedCar.carmodel}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Year"
            fullWidth
            autoComplete="off"
            type="number"
            name="year"
            value={editedCar.year}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Color"
            fullWidth
            autoComplete="off"
            name="color"
            value={editedCar.color}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Fuel</InputLabel>
            <Select
              name="fuel"
              value={editedCar.fuel}
              onChange={handleInputChange}
            >
              <MenuItem value="Gasoline">Gasoline</MenuItem>
              <MenuItem value="Diesel">Diesel</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>transmition</InputLabel>
            <Select
              name="transmition"
              value={editedCar.transmition}
              onChange={handleInputChange}
            >
              <MenuItem value="Automatic">Automatic</MenuItem>
              <MenuItem value="Manual">Manual</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Doors</InputLabel>
            <Select
              name="doors"
              value={editedCar.doors}
              onChange={handleInputChange}
            >
              <MenuItem value="4">4-Doors</MenuItem>
              <MenuItem value="2">2-Doors</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Car ID"
            fullWidth
            autoComplete="off"
            name="carId"
            value={editedCar.carId}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Car Label"
            fullWidth
            autoComplete="off"
            name="carLabel"
            value={editedCar.carLabel}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Insurance</InputLabel>
            <Select
              name="insurance"
              value={editedCar.insurance}
              onChange={handleInputChange}
            >
              <MenuItem value="Full Kasko">Full Kasko</MenuItem>
              <MenuItem value="None">None</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Price"
            fullWidth
            autoComplete="off"
            type="number"
            name="price"
            value={editedCar.price}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Condition</InputLabel>
            <Select
              name="condition"
              value={editedCar.condition}
              onChange={handleInputChange}
            >
              <MenuItem value="Good">Good</MenuItem>
              <MenuItem value="OutOfService">Out of service</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            onClick={handleFilesButton}
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
          >
            Upload images
          </Button>
          <input
            type="file"
            ref={hiddenFileInput}
            style={{ display: "none" }}
            onChange={handleImagesChange}
            multiple
          />
        </Grid>
      </Grid>
      <DialogActions>
        <Button onClick={onClose} color="error" variant="contained">
          Cancel
        </Button>
        <Button onClick={submitEdit} color="primary" variant="contained">
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default observer(EditCarDialog);
