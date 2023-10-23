import { observer } from "mobx-react";
import stateStorage from "../../StateStorage";
import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import { Container, Grid, Paper } from "@mui/material";
import ReservationsNavbar from "./Reservations/ReservationsNavbar";
import ReservationsContent from "./Reservations/ReservationsContent";

const ReservationsRoot = () => {
  let theme = createTheme({
    palette: {
      primary: {
        light: "#63ccff",
        main: "#009be5",
        dark: "#006db3",
      },
    },
    typography: {
      h5: {
        fontWeight: 500,
        fontSize: 26,
        letterSpacing: 0.5,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiTab: {
        defaultProps: {
          disableRipple: true,
        },
      },
    },
    mixins: {
      toolbar: {
        minHeight: 48,
      },
    },
  });

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <ReservationsNavbar onDrawerToggle={handleDrawerToggle} />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <ReservationsContent />
      </Container>
    </Box>
  );
};

export default observer(ReservationsRoot);
