import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Container } from "@mui/material";
import PromptPicker from "@/src/components/PromptPicker";
import UserTextInput from "@/src/components/UserTextInput";
import { GetServerSideProps } from "next";
import axios from "axios";

interface Props {
  prompts: { name: string }[];
}

export default function Home({ prompts }: Props) {
  return (
    <div style={{ height: "100%" }}>
      <div
        style={{
          zIndex: -1,
          position: "fixed",
          width: "100%",
          height: "100%",
          top: -10,
        }}
      >
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
      <Container style={{ height: "100%" }}>
        <PromptPicker prompts={prompts.map((p) => p.name)} />
        <UserTextInput
          loading={false}
          selections={["abcdef", "befgc", "cdeaq"]}
        />
      </Container>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const url = process.env.NEXT_PUBLIC_API_ENDPOINT!;
  const resp = await axios.get(url + "/prompt");
  return {
    props: {
      prompts: resp.data,
    },
  };
};
