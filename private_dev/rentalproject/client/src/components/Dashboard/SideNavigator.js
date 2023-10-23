import * as React from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import PermMediaOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActual";
import PublicIcon from "@mui/icons-material/Public";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import TimerIcon from "@mui/icons-material/Timer";
import SettingsIcon from "@mui/icons-material/Settings";
import PhonelinkSetupIcon from "@mui/icons-material/PhonelinkSetup";
import LogoLight from "../../images/LogoLight.png";
import {
  ArticleOutlined,
  CalendarMonthOutlined,
  LogoutOutlined,
  PersonOutlined,
  SettingsOutlined,
  SpokeOutlined,
  TimeToLeaveOutlined,
} from "@mui/icons-material";
import stateStorage from "../../StateStorage";
import { observer } from "mobx-react";

const SideNavigator = (props) => {
  const item = {
    py: "2px",
    px: 3,
    color: "rgba(255, 255, 255, 0.7)",
    "&:hover, &:focus": {
      bgcolor: "rgba(255, 255, 255, 0.08)",
    },
  };

  const itemCategory = {
    boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
    py: 1.5,
    px: 3,
  };

  const { ...other } = props;

  const [activeItem, setActiveItem] = React.useState("Cars");

  const activateCars = () => {
    stateStorage.updateOverviewTab(false);
    stateStorage.updateCarsTab(true);
    stateStorage.updateMaintainanceTab(false);
    stateStorage.updateClientsTab(false);
    stateStorage.updateReservationsTab(false);
    stateStorage.updateInvoicesTab(false);
    stateStorage.updateSettingsTab(false);
    stateStorage.updateLogoutTab(false);
  };

  const activateClients = () => {
    stateStorage.updateOverviewTab(false);
    stateStorage.updateCarsTab(false);
    stateStorage.updateMaintainanceTab(false);
    stateStorage.updateClientsTab(true);
    stateStorage.updateReservationsTab(false);
    stateStorage.updateInvoicesTab(false);
    stateStorage.updateSettingsTab(false);
    stateStorage.updateLogoutTab(false);
  };

  const activateReservations = () => {
    stateStorage.updateOverviewTab(false);
    stateStorage.updateCarsTab(false);
    stateStorage.updateMaintainanceTab(false);
    stateStorage.updateClientsTab(false);
    stateStorage.updateReservationsTab(true);
    stateStorage.updateInvoicesTab(false);
    stateStorage.updateSettingsTab(false);
    stateStorage.updateLogoutTab(false);
  };

  const activateInvoices = () => {
    stateStorage.updateOverviewTab(false);
    stateStorage.updateCarsTab(false);
    stateStorage.updateMaintainanceTab(false);
    stateStorage.updateClientsTab(false);
    stateStorage.updateReservationsTab(false);
    stateStorage.updateInvoicesTab(true);
    stateStorage.updateSettingsTab(false);
    stateStorage.updateLogoutTab(false);
  };

  const activateSettings = () => {
    stateStorage.updateOverviewTab(false);
    stateStorage.updateCarsTab(false);
    stateStorage.updateMaintainanceTab(false);
    stateStorage.updateClientsTab(false);
    stateStorage.updateReservationsTab(false);
    stateStorage.updateInvoicesTab(false);
    stateStorage.updateSettingsTab(true);
    stateStorage.updateLogoutTab(false);
  };

  const activateLogout = () => {
    stateStorage.updateOverviewTab(false);
    stateStorage.updateCarsTab(false);
    stateStorage.updateMaintainanceTab(false);
    stateStorage.updateClientsTab(false);
    stateStorage.updateReservationsTab(false);
    stateStorage.updateInvoicesTab(false);
    stateStorage.updateSettingsTab(false);
    stateStorage.updateLogoutTab(true);
  };

  const handleItemClick = (item) => {
    const { onClick } = item;
    if (onClick) {
      onClick();
    }
    setActiveItem(item.id);
  };

  const categories = [
    {
      id: "Business",
      children: [
        {
          id: "Cars",
          icon: <TimeToLeaveOutlined />,
          onClick: activateCars,
        },
        {
          id: "Clients",
          icon: <PersonOutlined />,
          onClick: activateClients,
        },
        {
          id: "Reservations",
          icon: <CalendarMonthOutlined />,
          onClick: activateReservations,
        },
        {
          id: "Invoices",
          icon: <ArticleOutlined />,
          onClick: activateInvoices,
        },
      ],
    },
    {
      id: "App",
      children: [
        {
          id: "Settings",
          icon: <SettingsOutlined />,
          onClick: activateSettings,
        },
        {
          id: "Logout",
          icon: <LogoutOutlined />,
          onClick: activateLogout,
        },
      ],
    },
  ];

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          sx={{
            ...item,
            ...itemCategory,
            fontSize: 22,
            color: "#fff",
            textAlign: "center",
          }}
        >
          Aviero
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory }}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: "#101F33" }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: "#fff" }}>{id}</ListItemText>
            </ListItem>
            {children.map((child) => (
              <ListItem disablePadding key={child.id}>
                <ListItemButton
                  selected={activeItem === child.id}
                  onClick={() => handleItemClick(child)}
                  sx={item}
                >
                  <ListItemIcon>{child.icon}</ListItemIcon>
                  <ListItemText>{child.id}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
};

export default observer(SideNavigator);
