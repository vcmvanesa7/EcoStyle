import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  return <h1>Welcome {session?.user.username}</h1>;
}
