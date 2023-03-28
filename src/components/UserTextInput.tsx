import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useCallback } from "react";
import { Constants } from "../constants";

interface Props {
  loading: boolean;
  selections: string[];
  onSend: (message: string) => Promise<void>;
}

export default function UserTextInput({ loading, selections, onSend }: Props) {
  const [message, setMessage] = React.useState("");

  return (
    <Box
      bottom={Constants.userInputBottomDistance}
      width="100%"
      height={Constants.userInputHeight}
      left={0}
    >
      <Stack
        height={"100%"}
        justifyContent="space-between"
        alignContent="center"
        alignItems={"center"}
        spacing={2}
      >
        <Grid
          container
          spacing={2}
          width={Constants.userInputWidth + 200}
          maxHeight={Constants.userInputHeight - Constants.inputAreaHeight}
          style={{ overflow: "scroll" }}
        >
          {selections.map((selection) => (
            <Grid item xs={6}>
              <Card
                sx={{
                  borderRadius: 6,
                  boxShadow:
                    "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
                  borderWidth: 0,
                }}
                variant="outlined"
              >
                <CardActionArea
                  disabled={loading}
                  onClick={async () => {
                    await onSend(selection);
                  }}
                >
                  <CardContent>
                    <Typography>{selection}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Paper sx={{ borderRadius: 5 }} elevation={0} variant="outlined">
          <Stack px={3} py={1} direction="row" spacing={2}>
            <InputBase
              fullWidth
              multiline
              value={message}
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  await onSend(message);
                  setMessage("");
                }
              }}
              onChange={(e) => setMessage(e.target.value)}
              sx={{ width: Constants.userInputWidth }}
              placeholder="Type your response here"
              disabled={loading}
            />
            {loading && (
              <Box display={"flex"}>
                <CircularProgress />
              </Box>
            )}
            {!loading && (
              <IconButton
                onClick={async () => {
                  await onSend(message);
                  setMessage("");
                }}
              >
                <SendIcon />
              </IconButton>
            )}
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}
