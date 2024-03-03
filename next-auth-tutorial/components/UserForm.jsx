'use client';

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UserForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({name: "", email: "", password: ""});
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
        ...prevState,
        [name]: value,
    }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const res = await fetch("/api/users", {
        method: "POST",
        "Content-Type": "application/json",
        body: JSON.stringify({ formData }),
    });

    if (res.ok) {
        router.refresh();
        router.push("/");
        return;
    }
    console.log(res);
    
    const response = await res.json();
    setErrorMessage(response.message);
  }

  return (
    <>
        <form onSubmit={handleSubmit} method="post" className="flex flex-col gap-3 w-1/2">
            <h1>Create New User</h1>
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" onChange={handleChange} value={formData.name} className="m-2 bg-slate-400 rounded border" required />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" onChange={handleChange} value={formData.email} className="m-2 bg-slate-400 rounded border" required />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" onChange={handleChange} value={formData.password} className="m-2 bg-slate-400 rounded border" required />
            <button type="submit" className="bg-blue-300 hover:bg-blue-100">Create User</button>
        </form>
        <p className="text-red-500">{errorMessage}</p>
    </>
  );
}

export default UserForm;