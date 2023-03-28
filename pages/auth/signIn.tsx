import { signInOrRedirect } from "@/src/authOrRedirect";
import AuthenticationCard from "@/src/components/AuthenticationCard";
import { Constants } from "@/src/constants";
import styles from "@/styles/Home.module.css";
import { GetServerSideProps } from "next";
import { signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onClick = useCallback(async (username: string, password: string) => {
    setLoading(true);
    try {
      await signIn("credentials", {
        redirect: false,
        username: username,
        password: password,
      });
      await router.replace("/");
    } catch (e) {
      alert("Invalid username or password");
    }
    setLoading(false);
  }, []);

  return (
    <div>
      <Head>
        <title>{Constants.appName}</title>
      </Head>
      <div className={styles.bgImageContainer}>
        <Image
          src={"/login-bg.jpg"}
          sizes="100vw"
          alt="background"
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <AuthenticationCard
        welcomeText={`Welcome to ${Constants.appName}!`}
        authenticationText="Login to your account"
        loading={loading}
        actionText="Sign up"
        authenticationButtonText="Sign In"
        onAuthenticationButtonClick={(username, password) =>
          onClick(username, password)
        }
        onActionClick={() => router.push("/signup")}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) =>
  signInOrRedirect(context, async () => ({ props: {} }));
