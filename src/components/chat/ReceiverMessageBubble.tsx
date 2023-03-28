import { Message } from "@/services/SessionService";
import { Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import styles from "@/styles/Home.module.css";

interface Props {
  message: Message;
  isLastMessage: boolean;
}

export default function ReceiverMessageBubble(props: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.isLastMessage) {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [props.isLastMessage, ref]);

  return (
    <Card
      sx={{ maxWidth: "50%", borderRadius: 5, my: 2 }}
      variant="outlined"
      className={styles.receiverChatBubble}
      ref={ref}
    >
      <CardContent>
        <Typography>{props.message.content.message}</Typography>
      </CardContent>
    </Card>
  );
}
