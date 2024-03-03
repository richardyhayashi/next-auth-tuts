import { getServerSession } from "next-auth";
import { options } from "@/context/options";
import { redirect } from "next/navigation";

const MemberPage = async () => {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/member");
  }

  return (
    <div>
        <h1>Member Page</h1>
        <p>Member Server Session</p>
        <p>{session?.user.email}</p>
        <p>{session?.user.role}</p>
    </div>
  )
}

export default MemberPage;