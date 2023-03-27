import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Constants } from "./constants";
import { Drawer, List, Stack, Tooltip } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";

const drawerButtons: { name: string; icon: any }[] = [
  {
    name: "New Game",
    icon: <PlayCircleOutlineIcon fontSize="large" />,
  },
  {
    name: "Delete Game",
    icon: <DeleteIcon fontSize="large" />,
  },
  {
    name: "Settings",
    icon: <SettingsIcon fontSize="large" />,
  },
];

export default function Layout(props: any) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ width: `calc(100vw - ${Constants.drawerWidth}px)` }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {Constants.appName}
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: `${Constants.drawerWidth}px`,
          },
        }}
        open
      >
        <Stack
          justifyContent={"center"}
          alignContent="center"
          alignItems={"center"}
          spacing={2}
        >
          {drawerButtons.map((button) => (
            <Box>
              <Tooltip title={button.name}>
                <IconButton
                  key={button.name}
                  color="primary"
                  size="large"
                  sx={{ display: "flex" }}
                >
                  {button.icon}
                </IconButton>
              </Tooltip>
            </Box>
          ))}
        </Stack>
      </Drawer>
      <main
        style={{
          marginTop: `${Constants.appbarHeight}px`,
          height: `calc(100vh - ${Constants.appbarHeight}px)`,
        }}
      >
        {props.children}
      </main>
    </Box>
  );
}
