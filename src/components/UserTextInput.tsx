import {
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React from "react";

interface Props {
  loading: boolean;
  selections: string[];
}

export default function UserTextInput({ loading, selections }: Props) {
  return (
    <Box position={"absolute"} bottom={100} width="100%" left={0}>
      <Stack
        justifyContent={"center"}
        alignContent="center"
        alignItems={"center"}
        spacing={2}
      >
        <Stack
          direction={"row"}
          spacing={2}
          justifyContent="center"
          alignItems={"center"}
        >
          <Typography variant="caption">Your choice:</Typography>
          {selections.map((selection) => (
            <Chip label={selection} key={selection} color="info" />
          ))}
        </Stack>
        <Paper sx={{ borderRadius: 5 }} elevation={0} variant="outlined">
          <Stack p={3} direction="row" spacing={2}>
            <TextField
              fullWidth
              variant="standard"
              multiline
              rows={2}
              sx={{ width: 500 }}
              helperText="You can also type your response here."
              placeholder="Type your response here"
              disabled={loading}
            />
            {loading && (
              <Box display={"flex"}>
                <CircularProgress />
              </Box>
            )}
            {!loading && (
              <IconButton>
                <SendIcon />
              </IconButton>
            )}
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}
