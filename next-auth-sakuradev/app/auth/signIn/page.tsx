'use client';

import React, { useRef, useState } from 'react';
import TextBox from '@/components/elements/TextBox';
import Button from '@/components/elements/Button';
import { signIn } from 'next-auth/react';

const SignInPage = () => {
  const email = useRef("");
  const passwd = useRef("");
  const [error, setError] = useState("");

  const onSubmit = async () => {
    setError("");
    const result = await signIn("credentials", {
      email: email.current,
      password: passwd.current,
      redirect: true,
      callbackUrl: "/",
    });

    if (result?.error) {
      setError(result.error);
      console.log(result.error);
    }
  }

  return (
    <div className='flex flex-col justify-center items-center gap-1 h-screen bg-gradient-to-br from-cyan-300 to-sky-600'>
      <div className='px-7 py-4 shadow bg-white rounded-md flex flex-col gap-2'>
        <p className='text-red-500'>{error}</p>
        <TextBox id="email" labelText='Email' onChange={(e) => (email.current = e.target.value)} />
        <TextBox id="password" labelText='Password' type={"password"} onChange={(e) => (passwd.current = e.target.value)} />
        <Button onClick={onSubmit}>Login</Button>
      </div>
    </div>
  );
}

export default SignInPage;