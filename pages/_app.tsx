import Layout from "@/src/Layout";
import { createTheme, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "../styles/globals.css";

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          color: "rgb(45, 56, 67)",
          borderColor: "rgb(231, 235, 240)",
          borderStyle: "solid",
          borderWidth: "0px 0px thin",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          [`& fieldset`]: {
            borderRadius: 16,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          boxShadow:
            "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
        },
      },
    },
  },
});

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </SessionProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
