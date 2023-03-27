import {
  Box,
  Card,
  CardActionArea,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Constants } from "../constants";
import styles from "@/styles/Home.module.css";

interface PromptProps {
  prompts: string[];
}

export default function PromptPicker(props: PromptProps) {
  return (
    <Stack justifyContent={"center"} height="100%">
      <Grid container spacing={4} px={10} mb={10}>
        <Grid item xs={12}>
          <Typography
            variant="h3"
            fontWeight={"bold"}
            className={styles.rainbowText}
          >
            {Constants.welcomeMessage}
          </Typography>

          <Divider sx={{ pt: 2 }}>
            <Typography>Pick a prompt to start</Typography>
          </Divider>
        </Grid>
        {props.prompts.map((prompt) => (
          <Grid item xs={6}>
            <Card
              sx={{
                height: Constants.promptCardHeight,
                borderRadius: Constants.promptCardRadius,
              }}
              variant="outlined"
            >
              <CardActionArea sx={{ height: "100%" }}>
                <Stack
                  justifyContent={"center"}
                  alignItems={"center"}
                  height="100%"
                >
                  <Box display={"flex"}>
                    <Typography>{prompt}</Typography>
                  </Box>
                </Stack>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
