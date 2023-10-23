import { AppBar, Avatar, Grid, IconButton, Toolbar } from "@mui/material";
import { observer } from "mobx-react";
import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";

const ContentAppBar = (props) => {
  const { onDrawerToggle } = props;

  return (
    <AppBar color="primary" position="sticky" elevation={0}>
      <Toolbar>
        <Grid container spacing={1} alignItems="center">
          <Grid sx={{ display: { sm: "none", xs: "block" } }} item>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={onDrawerToggle}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item xs />
          <Grid item>
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton color="inherit" sx={{ p: 0.5 }}>
              <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default observer(ContentAppBar);
