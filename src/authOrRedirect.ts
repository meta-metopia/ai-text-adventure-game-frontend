import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { getToken, encode } from "next-auth/jwt";

type Callback = () => Promise<any>;

const secret = process.env.NEXTAUTH_SECRET;

export const signInOrRedirect = async (
  ctx: GetServerSidePropsContext<any, any>,
  cb: Callback
) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return cb();
};
