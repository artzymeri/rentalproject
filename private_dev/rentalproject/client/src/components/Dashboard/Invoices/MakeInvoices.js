import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import moment from "moment";

const MakeInvoices = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [carModel, setCarmodel] = useState("");
  const [carIdNumber, setCarIdNumber] = useState("");
  const [totalDays, setTotalDays] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [pricePerDay, setPricePerDay] = useState("");
  const [cars, setCars] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Fetch cars data from the API
    fetch("http://localhost:8080/getcars")
      .then((response) => response.json())
      .then((data) => setCars(data));

    // Fetch clients data from the API
    fetch("http://localhost:8080/getclients")
      .then((response) => response.json())
      .then((data) => setClients(data));
  }, []);

  console.log(cars);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    calculateTotalDays(e.target.value, endDate);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    calculateTotalDays(startDate, e.target.value);
  };

  const handlePricePerDayChange = (e) => {
    setPricePerDay(e.target.value);
    calculateTotalCost(startDate, endDate, e.target.value);
  };

  const calculateTotalDays = (start, end) => {
    if (start && end) {
      const startDt = new Date(start);
      const endDt = new Date(end);
      const diffInDays = Math.floor((endDt - startDt) / (1000 * 60 * 60 * 24));
      setTotalDays(diffInDays.toString());
    } else {
      setTotalDays("");
    }
  };

  const calculateTotalCost = (start, end, price) => {
    if (start && end && price) {
      const startDt = new Date(start);
      const endDt = new Date(end);
      const diffInDays = Math.floor((endDt - startDt) / (1000 * 60 * 60 * 24));
      setTotalDays(diffInDays.toString());

      // Calculate the total cost
      const cost = diffInDays * parseFloat(price);
      setTotalCost(cost.toFixed(2).toString());
    } else {
      setTotalCost("");
    }
  };

  const closeAlert = () => {
    setAlertOpen(false);
  };

  const downloadPdf = (blob, fileName) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const modifyPDF = async () => {
    if (
      !name ||
      !birthdate ||
      !idNumber ||
      !startDate ||
      !endDate ||
      !carModel ||
      !carIdNumber
    ) {
      setAlertOpen(true);
      return;
    }

    try {
      // Load the PDF template from the 'public' directory
      const templateBytes = await fetch("/template.pdf").then((res) =>
        res.arrayBuffer()
      );
      const pdfDoc = await PDFDocument.load(templateBytes);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];

      const textColor = rgb(0, 0, 0);

      const fonts = {
        Helvetica: await pdfDoc.embedFont(StandardFonts.Helvetica),
        TimesRoman: await pdfDoc.embedFont(StandardFonts.TimesRoman),
        Courier: await pdfDoc.embedFont(StandardFonts.Courier),
        ZapfDingbats: await pdfDoc.embedFont(StandardFonts.ZapfDingbats),
      };

      const fields = [
        {
          name: name,
          x: 100,
          y: 550,
          fontSize: 50,
          fontFamily: fonts.Helvetica,
        },
        {
          name: surname,
          x: 100,
          y: 500,
          fontSize: 30,
          fontFamily: fonts.TimesRoman,
        },
        {
          name: birthdate,
          x: 100,
          y: 450,
          fontSize: 20,
          fontFamily: fonts.Helvetica,
        },
        {
          name: idNumber,
          x: 100,
          y: 400,
          fontSize: 10,
          fontFamily: fonts.TimesRoman,
        },
        {
          name: startDate,
          x: 100,
          y: 350,
          fontSize: 5,
          fontFamily: fonts.Helvetica,
        },
        {
          name: endDate,
          x: 100,
          y: 300,
          fontSize: 25,
          fontFamily: fonts.TimesRoman,
        },
        {
          name: carModel,
          x: 100,
          y: 250,
          fontSize: 15,
          fontFamily: fonts.Helvetica,
        },
        {
          name: carIdNumber,
          x: 100,
          y: 150,
          fontSize: 18,
          fontFamily: fonts.Helvetica,
        },
      ];

      fields.forEach(({ name, x, y, fontSize, fontFamily }) => {
        firstPage.drawText(name, {
          x: x,
          y: y,
          size: fontSize,
          color: textColor,
          font: fontFamily,
        });
      });

      // Save the modified PDF as a blob
      const modifiedPdfBytes = await pdfDoc.save();

      // Download the modified PDF
      downloadPdf(
        new Blob([modifiedPdfBytes], { type: "application/pdf" }),
        "modified.pdf"
      );
    } catch (error) {
      console.error("Error modifying PDF:", error);
    }
  };

  const handleCarChange = (e) => {
    const selectedCar = cars.find((car) => car.carmodel === e.target.value);
    if (selectedCar) {
      setCarmodel(selectedCar.carmodel);
      setCarIdNumber(selectedCar.carId);
    }
  };

  const handleClientChange = (e) => {
    const selectedClient = clients.find(
      (client) => client.name === e.target.value
    );
    if (selectedClient) {
      setName(selectedClient.name);
      setBirthdate(selectedClient.birthdate);
      setIdNumber(selectedClient.idNumber);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    modifyPDF();
  };

  return (
    <div style={{ padding: 20 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="car-select-label">Car</InputLabel>
              <Select
                labelId="car-select-label"
                label="Car"
                fullWidth
                value={carModel}
                onChange={handleCarChange}
              >
                {cars.map((car) => (
                  <MenuItem key={car.id} value={car.carmodel}>
                    {car.carmodel}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="client-select-label">Client</InputLabel>
              <Select
                labelId="client-select-label"
                label="Client"
                fullWidth
                value={name}
                onChange={handleClientChange}
              >
                {clients.map((client) => (
                  <MenuItem key={client.id} value={client.name}>
                    {client.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Birthdate"
              variant="outlined"
              fullWidth
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="ID Number"
              variant="outlined"
              fullWidth
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              type="date"
              fullWidth
              value={startDate}
              onChange={handleStartDateChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              type="date"
              fullWidth
              value={endDate}
              onChange={handleEndDateChange}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label="Total Days"
              variant="outlined"
              fullWidth
              value={totalDays}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label="Price per Day"
              variant="outlined"
              type="number"
              fullWidth
              value={pricePerDay}
              onChange={handlePricePerDayChange}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label="Total Cost"
              variant="outlined"
              fullWidth
              value={totalCost}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Car ID Number"
              variant="outlined"
              fullWidth
              value={carIdNumber}
              onChange={(e) => setCarIdNumber(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: "100%" }}
            >
              Generate PDF
            </Button>
          </Grid>
        </Grid>
      </form>
      {alertOpen && (
        <Alert
          open={alertOpen}
          onClose={closeAlert}
          severity="error"
          sx={{ mt: 2 }}
        >
          Fill in all the inputs.
        </Alert>
      )}
    </div>
  );
};

export default MakeInvoices;
