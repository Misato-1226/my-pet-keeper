import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";

export const handleSession = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return { authorized: false, userId: null };
  }
  return { authorized: true, userId: Number(session.user.id) };
};
