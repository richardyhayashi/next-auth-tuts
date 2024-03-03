'use client';

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const MemberPage = () => {
  const {data: session} = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client-member");
    },
  });

  return (
    <div>
        <h1>Member Client Page</h1>
        <p>Member Client Session</p>
        <p>{session?.user.email}</p>
        <p>{session?.user.role}</p>
    </div>
  )
}

export default MemberPage