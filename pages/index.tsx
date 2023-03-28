import useSession from "@/hooks/useSession";
import {
  SendMessageResponse,
  Session,
  SessionService,
} from "@/services/SessionService";
import ReceiverMessageBubble from "@/src/components/chat/ReceiverMessageBubble";
import SenderMessageBubble from "@/src/components/chat/SenderMessageBubble";
import PromptPicker from "@/src/components/PromptPicker";
import UserTextInput from "@/src/components/UserTextInput";
import { Constants } from "@/src/constants";
import { requireAuthentication } from "@/src/requireAuthentication";
import styles from "@/styles/Home.module.css";
import {
  Backdrop,
  CircularProgress,
  Container,
  List,
  Stack,
  Typography,
} from "@mui/material";
import { useVirtualizer } from "@tanstack/react-virtual";
import axios from "axios";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useCallback, useMemo, useRef, useState } from "react";
import Head from "next/head";

interface Props {
  prompts: { name: string }[];
  currentSession: Session | null;
  token: string;
}

export default function Home(props: Props) {
  const [loading, setLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [response, setResponse] = useState<SendMessageResponse>();
  const session = useSession(props.token, props.currentSession);

  const onPromptClick = useCallback(async (prompt: string) => {
    setLoading(true);
    try {
      await SessionService.startSession(props.token, prompt);
      await session.refetch();
    } catch (e) {
      alert("Error starting session");
    }
    setLoading(false);
  }, []);

  const onMessageSend = useCallback(async (message: string) => {
    setIsSending(true);
    try {
      const response = await SessionService.sendMessage(props.token, message);
      setResponse(response);
      await session.refetch();
      // scroll to bottom
      // @ts-ignore
    } catch (e) {
      alert("Error sending message");
    }
    setIsSending(false);
  }, []);

  const selections: string[] = useMemo(() => {
    if (response === undefined) {
      if (session.data === null) return [];
      if (session.data.messages.length === 0) return [];
      const lastIndex = session.data.messages.length - 1;
      const lastMessage = session.data.messages[lastIndex];
      return lastMessage.content.selections;
    }
    return response.selections;
  }, [response, session.data]);

  return (
    <div style={{ height: "100%" }}>
      <Head>
        <title>{Constants.appName}</title>
      </Head>
      {!Boolean(session.data) && (
        <div className={styles.bgImageContainer}>
          <Image
            src={"/bg.png"}
            sizes="100vw"
            alt="background"
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      )}
      <Container style={{ height: "100%" }}>
        {!Boolean(session.data) && (
          <PromptPicker
            prompts={props.prompts.map((p) => p.name)}
            onPromptClick={async (prompt) => {
              await onPromptClick(prompt);
            }}
          />
        )}

        {session.data && (
          <List
            style={{
              height: `calc(100vh - ${Constants.appbarHeight}px - ${Constants.userInputHeight}px - 50px)`,
              overflowY: "scroll",
            }}
          >
            {session.data.messages.map((message, index) =>
              message.role === "user" ? (
                <SenderMessageBubble
                  message={message}
                  isLastMessage={index === session.data!.messages.length - 1}
                />
              ) : (
                <ReceiverMessageBubble
                  message={message}
                  isLastMessage={index === session.data!.messages.length - 1}
                />
              )
            )}
          </List>
        )}

        {session.data && (
          <UserTextInput
            loading={isSending}
            selections={selections}
            onSend={async (message) => await onMessageSend(message)}
          />
        )}
      </Container>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={
          loading || session.isLoading || (session.isRefetching && !isSending)
        }
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) =>
  requireAuthentication(context, async (token, user) => {
    const url = process.env.NEXT_PUBLIC_API_ENDPOINT!;
    const resp = await axios.get(url + "/prompt");
    const session = await SessionService.getSessionHistory(token);
    return {
      props: {
        prompts: resp.data,
        currentSession: session === undefined ? null : session,
        token: token,
      },
    };
  });
