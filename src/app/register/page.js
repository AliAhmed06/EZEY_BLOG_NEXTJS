"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession, signOut } from "next-auth/react";
import { toast } from "react-toastify";
import axios from "axios";

const RegisterPage = () => {
  const { data, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const registerHandler = async (e) => {
    e.preventDefault();
    if (username === "" || email === "" || password === "") {
      toast.error("All fields are required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password should contain atleast 6 characters");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/register`,
        {
          headers: {
            "Content-type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ username, email, password }),
        }
      );

      if (res.ok) {
        toast.success("User Registered Successfully");
        setTimeout(() => {
          signIn();
        }, 1500);
        return;
      } else {
        toast.error("Error occured while registering ");        
      }
    } catch (error) {
      toast.error("something went wrong," + error);
    }
    setLoading(false);
  };
  return (
    <div className="md:h-[500px] flex items-center justify-center">
      <div className="w-full md:w-[450px] bg-yellow-500 p-10 text-white">
        <h4 className="font-bold text-center text-xl">Register Here</h4>
        <form className="flex flex-col mt-5 gap-3" onSubmit={registerHandler}>
          <input
            type="text"
            placeholder="Enter Username"
            className="py-2 px-5 rounded-md outline-none border border-gray-400 focus:border-black text-gray-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter Email"
            className="py-2 px-5 rounded-md outline-none border border-gray-400 focus:border-black text-gray-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="py-2 px-5 rounded-md outline-none border border-gray-400 focus:border-black text-gray-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-white h-[40px] rounded-md  hover:bg-gray-100 text-yellow-500 font-bold text-lg flex items-center justify-center">
            {loading ? (
              <img src="/images/loading.gif" alt="" className="h-[25px]" />
            ) : (
              "Register"
            )}
          </button>
          <p className="text-end">
            Already have an account?
            <Link href="/login" className="hover:underline font-semibold">
              {" "}
              Login Now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
