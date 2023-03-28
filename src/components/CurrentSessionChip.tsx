import useSession from "@/hooks/useSession";
import { Box, Chip } from "@mui/material";
import React from "react";
import { Constants } from "../constants";

interface Props {
  sessionName?: string | null;
}

export default function CurrentSessionChip({ sessionName }: Props) {
  return (
    <Box>
      <Chip label={`${sessionName}`} color="secondary" />
    </Box>
  );
}
