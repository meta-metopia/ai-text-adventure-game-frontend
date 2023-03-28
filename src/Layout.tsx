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
import { useRouter } from "next/router";
import { signOut, useSession as useAuthSession } from "next-auth/react";
import { useCallback, useMemo } from "react";
import { SessionService } from "@/services/SessionService";
import useSession from "@/hooks/useSession";
import CurrentSessionChip from "./components/CurrentSessionChip";

export default function Layout(props: any) {
  const router = useRouter();
  const authSession = useAuthSession();
  //@ts-ignore
  const session = useSession(authSession.data?.accessToken!, null);

  const deleteSession = useCallback(async () => {
    try {
      let confirm = window.confirm(
        "Are you sure you want to delete this game? This action cannot be undone."
      );
      if (!confirm) return;
      //@ts-ignore
      await SessionService.deleteSession(authSession.data!.accessToken!);
      await session.refetch();
    } catch (e) {
      alert("Error deleting session");
    }
  }, [authSession]);

  const drawerButtons = useMemo(() => {
    const drawerButtons: { name: string; icon: any; onClick?: () => void }[] = [
      {
        name: "Delete Game",
        icon: <DeleteIcon fontSize="medium" />,
        onClick: deleteSession,
      },
      {
        name: "Settings",
        icon: <SettingsIcon fontSize="medium" />,
      },
    ];

    if (!session.data) {
      return [drawerButtons[1]];
    }

    return drawerButtons;
  }, [authSession, session]);

  const mainContent = (
    <main
      style={{
        marginTop: `${Constants.appbarHeight}px`,
        height: `calc(100vh - ${Constants.appbarHeight}px)`,
      }}
    >
      {props.children}
    </main>
  );

  if (router.pathname.startsWith("/auth")) {
    return <>{mainContent}</>;
  }

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
          <Stack direction={"row"} spacing={2} sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div">
              {Constants.appName}
            </Typography>
            {session.data && (
              <CurrentSessionChip sessionName={session.data.prompt} />
            )}
          </Stack>
          <Button color="inherit" onClick={() => signOut()}>
            Sign Out
          </Button>
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
                  size="medium"
                  sx={{ display: "flex" }}
                  onClick={button.onClick}
                >
                  {button.icon}
                </IconButton>
              </Tooltip>
            </Box>
          ))}
        </Stack>
      </Drawer>
      {mainContent}
    </Box>
  );
}
