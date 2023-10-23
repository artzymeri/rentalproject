import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { observer } from "mobx-react";
import stateStorage from "../../StateStorage";
import "../../styling/Cars.css";
import axios from "axios";

import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Skeleton,
} from "@mui/material";

import {
  AddBox,
  CarRental,
  DoorSliding,
  Euro,
  KeyboardBackspace,
  LocalGasStation,
  LoupeRounded,
  SensorDoor,
  TimeToLeave,
  Tune,
  Waves,
  Close,
  RotateLeft,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Cars = () => {
  const navigate = useNavigate();
  const [brand, setBrand] = useState("");
  const [transmition, settransmition] = useState("");
  const [fuel, setFuel] = useState("");
  const [doors, setDoors] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [basicData, setBasicData] = useState([]);
  const [carsArray, setCarsArray] = React.useState([]);

  React.useEffect(() => {
    axios.get("http://localhost:8080/getcars").then((response) => {
      setCarsArray(response.data);
      setBasicData(response.data);
    });
  }, []);

  const openFilterDialog = () => {
    stateStorage.updateFilterDialog(true);
  };

  const closeFilterDialog = () => {
    stateStorage.updateFilterDialog(false);
    console.log(stateStorage.filterDialog);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };
  const handletransmitionChange = (e) => {
    settransmition(e.target.value);
  };
  const handleFuelChange = (e) => {
    setFuel(e.target.value);
  };
  const handleDoorsChange = (e) => {
    setDoors(e.target.value);
  };

  const handleMinPrice = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPrice = (e) => {
    setMaxPrice(e.target.value);
  };

  const filterCars = () => {
    if (
      brand !== "" ||
      transmition !== "" ||
      fuel !== "" ||
      doors !== "" ||
      minPrice !== "" ||
      maxPrice !== ""
    ) {
      let filtered = basicData.filter(
        (car) =>
          car.carmodel.includes(brand) ||
          car.fuel === fuel ||
          car.doors === doors ||
          car.transmition === transmition ||
          (Number(car.price) >= Number(minPrice) &&
            Number(car.price) <= Number(maxPrice))
      );
      setCarsArray(filtered);
    }
  };

  const resetFilter = () => {
    setCarsArray(basicData);
    setBrand("");
    settransmition("");
    setFuel("");
    setDoors("");
    setMinPrice("");
    setMaxPrice("");
  };

  const toHomePath = () => {
    navigate("/");
  };

  return (
    <>
      <Dialog
        open={stateStorage.filterDialog}
        onClose={() => closeFilterDialog()}
        fullScreen
      >
        <DialogTitle
          sx={{
            background: "black",
            color: "white",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          Filter Tab
          <button
            className="carspage-filter-dialog-close"
            onClick={() => closeFilterDialog()}
          >
            <Close></Close>
          </button>
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            marginTop: "30px",
            alignItems: "center",
          }}
        >
          <FormControl fullWidth sx={{ marginTop: "10px" }}>
            <InputLabel id="demo-simple-select-label">Brand</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={brand}
              label="Brand"
              onChange={handleBrandChange}
            >
              <MenuItem value={"Mercedes"}>Mercedes</MenuItem>
              <MenuItem value={"Audi"}>Audi</MenuItem>
              <MenuItem value={"BMW"}>BMW</MenuItem>
              <MenuItem value={"VW"}>Volkswagen</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Fuel</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={fuel}
              label="Fuel"
              onChange={handleFuelChange}
            >
              <MenuItem value={"Gasoline"}>Gasoline</MenuItem>
              <MenuItem value={"Diesel"}>Diesel</MenuItem>
              <MenuItem value={"Electric"}>Electric</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">transmition</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={transmition}
              label="transmition"
              onChange={handletransmitionChange}
            >
              <MenuItem value={"Automatic"}>Automatic</MenuItem>
              <MenuItem value={"Manual"}>Manual</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Doors</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={doors}
              label="Doors"
              onChange={handleDoorsChange}
            >
              <MenuItem value={"4"}>4-Doors</MenuItem>
              <MenuItem value={"2"}>2-Doors</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            sx={{ display: "flex", flexDirection: "row", gap: "30px" }}
          >
            <TextField
              id="outlined-basic"
              label="Min Price"
              variant="outlined"
              value={minPrice}
              onChange={handleMinPrice}
              type="number"
              sx={{
                width: "50%",
              }}
            />
            <TextField
              id="outlined-basic"
              label="Max Price"
              variant="outlined"
              value={maxPrice}
              onChange={handleMaxPrice}
              type="number"
              sx={{
                width: "50%",
                color: "black",
              }}
            />
          </FormControl>
          <button
            className="carspage-filter-dialog-submitbutton"
            onClick={() => {
              filterCars();
              closeFilterDialog();
            }}
          >
            Filter
            <Tune></Tune>
          </button>
          {brand !== "" ||
          transmition !== "" ||
          fuel !== "" ||
          doors !== "" ||
          (minPrice !== "" && maxPrice !== "") ? (
            <button
              className="carspage-filter-dialog-submitbutton"
              onClick={() => {
                resetFilter();
                closeFilterDialog();
              }}
            >
              Reset Filter
              <RotateLeft></RotateLeft>
            </button>
          ) : null}
        </DialogContent>
      </Dialog>
      <div className="cars-body">
        <div className="cars-navigation-bar">
          <button onClick={toHomePath}>
            <KeyboardBackspace></KeyboardBackspace>
            <p>Back to Home Page</p>
          </button>
          <button onClick={() => openFilterDialog()}>
            <p>Filter</p> <Tune></Tune>
          </button>
        </div>

        {carsArray && carsArray.length > 0 ? (
          <div className="cars-container">
            {carsArray.map((car, index) => {
              return (
                <div className="car-card" key={index}>
                  <Swiper>
                    {car.images &&
                      JSON.parse(car.images).map((image) => {
                        return (
                          <SwiperSlide key={image}>
                            <img loading="lazy" src={image} alt={car.brand} />
                          </SwiperSlide>
                        );
                      })}
                  </Swiper>
                  <div className="car-card-info-wrapper">
                    <div className="car-card-info-child car-card-info-child-top">
                      <h2 className="car-title-holder">{car.carmodel}</h2>
                      <div className="car-card-info-subchild">
                        <Euro
                          sx={{ fontSize: "40px", color: "blueviolet" }}
                        ></Euro>
                        <h1 style={{ color: "blueviolet" }}>{car.price}</h1>
                        <p style={{ color: "blueviolet", fontWeight: "600" }}>
                          / day
                        </p>
                      </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="car-card-info-child">
                      <div className="car-card-info-subchild">
                        <TimeToLeave></TimeToLeave> {car.transmition}
                      </div>
                      <div className="car-card-info-subchild">
                        <SensorDoor></SensorDoor> {car.doors} doors
                      </div>
                      <div className="car-card-info-subchild">
                        <LocalGasStation></LocalGasStation> {car.fuel}
                      </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="car-card-info-child car-card-button-wrapper">
                      <button className="car-card-button">
                        <AddBox sx={{ color: "whitesmoke" }}></AddBox>Details
                      </button>
                      <button className="car-card-button">
                        <CarRental sx={{ color: "whitesmoke" }}></CarRental>Rent
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="cars-container">
            {Array.from({ length: 6 }, (_, index) => (
              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
                key={index}
              >
                <Skeleton
                  variant="rounded"
                  width={330}
                  height={200}
                  animation="wave"
                />
                <Skeleton
                  variant="rounded"
                  width={330}
                  height={200}
                  animation="wave"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default observer(Cars);
