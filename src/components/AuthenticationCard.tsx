import {
  Container,
  Stack,
  Typography,
  Card,
  CardContent,
  TextField,
  Box,
  Button,
  Link,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";

interface Props {
  welcomeText: string;
  authenticationText: string;
  loading: boolean;
  actionText: string;
  authenticationButtonText: string;
  onAuthenticationButtonClick: (
    username: string,
    password: string
  ) => Promise<any>;
  onActionClick: () => Promise<any>;
}

export default function AuthenticationCard({
  welcomeText,
  authenticationButtonText,
  authenticationText,
  loading,
  onAuthenticationButtonClick,
  actionText,
  onActionClick,
}: Props) {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  return (
    <Container>
      <Stack
        p={10}
        justifyContent="center"
        alignContent={"center"}
        alignItems="center"
        spacing={2}
      >
        <Typography variant="h5" fontWeight={"bold"}>
          {welcomeText}
        </Typography>
        <Typography>{authenticationText}</Typography>
        <Card sx={{ width: 500, borderRadius: 5 }} variant="outlined">
          <CardContent>
            <Stack spacing={4}>
              <TextField
                variant="filled"
                placeholder="User Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                variant="filled"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Stack justifyContent={"right"} alignItems="flex-end" spacing={1}>
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    onActionClick();
                  }}
                >
                  <Typography>{actionText}</Typography>
                </Link>
                <Box display={"flex"} width="100%">
                  <LoadingButton
                    variant="contained"
                    fullWidth
                    loading={loading}
                    onClick={() => {
                      onAuthenticationButtonClick(username, password);
                    }}
                  >
                    <Typography>{authenticationButtonText}</Typography>
                  </LoadingButton>
                </Box>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}
