"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession, signOut } from "next-auth/react";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { data, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const loginHandler = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      toast.error("All fields are required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password should contain atleast 6 characters");
      return;
    }

    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error === null) {
        router.push("/");
      } else {
        toast.error("something went wrong" + res);
      }
    } catch (error) {
      toast.error("something went wrong," + error);
    }
    setLoading(false);
  };
  return (
    <div className="md:h-[500px] flex items-center justify-center">
      <div className="w-full md:w-[450px] bg-yellow-500 p-10 text-white">
        <h4 className="font-bold text-center text-xl">Login Here</h4>
        <form className="flex flex-col mt-5 gap-3" onSubmit={loginHandler}>
          <input
            type="text"
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
              "Login"
            )}
          </button>
          <p className="text-end">
            Don&apos;t have an account?
            <Link href="/register" className="hover:underline font-semibold">
              Register Now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
