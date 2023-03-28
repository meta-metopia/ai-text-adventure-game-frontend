import { Message } from "@/services/SessionService";
import { Card, CardContent, Typography, Stack } from "@mui/material";
import React, { useEffect, useRef } from "react";
import styles from "@/styles/Home.module.css";

interface Props {
  message: Message;
  isLastMessage: boolean;
}

export default function SenderMessageBubble(props: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.isLastMessage) {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [props.isLastMessage, ref]);

  return (
    <Stack justifyContent={"flex-end"} alignItems="flex-end" ref={ref}>
      <Card
        sx={{
          maxWidth: "50%",
          borderRadius: 5,
          background: "linear-gradient(90deg, #904887 10.79%, #8B257E 87.08%)",
          color: "white",
        }}
        className={styles.senderChatBubble}
      >
        <CardContent>
          <Typography>{props.message.content.message}</Typography>
        </CardContent>
      </Card>
    </Stack>
  );
}
