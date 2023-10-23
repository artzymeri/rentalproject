import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { IconButton, MenuItem, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const localizer = momentLocalizer(moment);

const ReservationsCalendar = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedStart, setEditedStart] = useState(null);
  const [editedEnd, setEditedEnd] = useState(null);
  const [eventListener, setEventListener] = useState(0);

  const [cars, setCars] = useState([]);
  const [clients, setClients] = useState([]);

  const [selectedCar, setSelectedCar] = useState("");
  const [selectedClient, setSelectedClient] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarData, setSnackbarData] = useState({ title: "", message: "" });

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  // Define a function to parse the date string into a Date object
  function parseDateStringToCustomDate(dateString) {
    const dateParts = dateString.split(/[-T:Z. ]/); // Split the string into parts
    const [year, month, day, hour, minute, second] = dateParts.map(Number); // Convert parts to numbers
    return new Date(Date.UTC(year, month - 1, day, hour, minute, second)); // Month is 0-based
  }

  // Inside your useEffect callback
  useEffect(() => {
    try {
      const getEvents = axios.get("http://localhost:8080/getevents");
      const getCars = axios.get("http://localhost:8080/getcars");
      const getClients = axios.get("http://localhost:8080/getclients");

      Promise.all([getEvents, getCars, getClients]).then((responses) => {
        const eventsResponse = responses[0];
        const carsResponse = responses[1];
        const clientsResponse = responses[2];

        const formattedEvents = eventsResponse.data.map((event) => ({
          ...event,
          start: parseDateStringToCustomDate(event.start),
          end: parseDateStringToCustomDate(event.end),
        }));

        setEvents(formattedEvents);
        setCars(carsResponse.data);
        setClients(clientsResponse.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [eventListener]);

  const [events, setEvents] = useState([]);

  const handleEventClick = (event, e) => {
    setSelectedEvent(event);
    setEditedTitle(event.title);
    setEditedDescription(event.description || "");
    setEditedStart(dayjs(event.start).format("YYYY-MM-DD"));
    setEditedEnd(dayjs(event.end).format("YYYY-MM-DD"));
    setSelectedCar(event.carmodel);
    setSelectedClient(event.clientname);
    setDialogOpen(true);
  };

  const handleSaveClick = () => {
    // Update the selected event in the database
    axios
      .post(`http://localhost:8080/updateevent/${selectedEvent.id}`, {
        title: editedTitle,
        description: editedDescription,
        start: dayjs(editedStart).format("YYYY-MM-DDT12:00:00Z"),
        end: dayjs(editedEnd).format("YYYY-MM-DDT12:00:00Z"),
        clientname: selectedClient,
        carmodel: selectedCar,
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
        console.error("Error updating event:", error);
      });
    setEventListener(eventListener + 1);
    setDialogOpen(false);
  };

  const handleAddEventClick = () => {
    setSelectedEvent(null);
    setEditedTitle("");
    setEditedDescription("");
    setEditedStart(null);
    setEditedEnd(null);
    setSelectedCar(null);
    setSelectedClient(null);
    setDialogOpen(true);
  };

  const handleAddEventSaveClick = () => {
    // Set the time to 12:00 PM
    const defaultTime = "12:00:00";

    // Format the selected start and end dates with the default time and timezone
    const formattedStartDate = `${dayjs(editedStart).format(
      "YYYY-MM-DD"
    )}T${defaultTime}.000Z`;
    const formattedEndDate = `${dayjs(editedEnd).format(
      "YYYY-MM-DD"
    )}T${defaultTime}.000Z`;

    const newEvent = {
      title: editedTitle,
      description: editedDescription,
      start: formattedStartDate,
      end: formattedEndDate,
      clientname: selectedClient,
      carmodel: selectedCar,
    };

    axios
      .post(
        "http://localhost:8080/addnewevent",
        { newEvent },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        const { title, message } = response.data;
        setSnackbarData({
          title: title,
          message: message,
        });
        setSnackbarOpen(true);
        setEventListener(eventListener + 1);
        setDialogOpen(false);
      })
      .catch((error) => {
        console.log(error);
        console.error("Error adding event:", error);
      });
  };

  const handleDeleteClick = () => {
    // Delete the selected event from the database
    axios
      .post(`http://localhost:8080/deleteevent/${selectedEvent.id}`)
      .then((response) => {
        console.log("Event deleted successfully!");
        setSnackbarData({
          title: "success",
          message: "Event deleted successfully",
        });
        setSnackbarOpen(true);
        setEventListener(eventListener + 1);
        setDialogOpen(false);
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
        setSnackbarData({
          title: "error",
          message: "Error deleting event",
        });
        setSnackbarOpen(true);
      });
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleEventClick}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddEventClick}
        style={{
          maxWidth: "100%",
          width: "100%",
          padding: 16,
          background: "blue",
        }}
      >
        Add Event
      </Button>
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

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <div>
          <DialogTitle>
            {selectedEvent ? "Edit Event" : "Add Event"}
          </DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <TextField
              label="Title"
              fullWidth
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <TextField
              label="Description"
              fullWidth
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                value={editedStart}
                onChange={(newValue) => setEditedStart(newValue)}
              />
              <DatePicker
                label="End Date"
                value={editedEnd}
                onChange={(newValue) => setEditedEnd(newValue)}
              />
            </LocalizationProvider>
            <TextField
              label="Select Car"
              select
              fullWidth
              value={selectedCar}
              onChange={(e) => setSelectedCar(e.target.value)}
            >
              {cars.map((car) => (
                <MenuItem key={car.id} value={car.carmodel}>
                  {car.carmodel}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Select Client"
              select
              fullWidth
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
            >
              {clients.map((client) => (
                <MenuItem key={client.id} value={client.name}>
                  {client.name}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            {selectedEvent ? (
              <>
                <Button color="primary" onClick={handleSaveClick}>
                  Save
                </Button>
                <IconButton
                  onClick={handleDeleteClick}
                  color="secondary"
                  aria-label="Delete Event"
                >
                  <DeleteIcon />
                </IconButton>
              </>
            ) : (
              <Button color="primary" onClick={handleAddEventSaveClick}>
                Add Event
              </Button>
            )}
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default ReservationsCalendar;
