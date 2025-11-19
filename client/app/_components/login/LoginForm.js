"use client";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../account/userSlice";
import { signIn } from "../../_lib/apiAuth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Error from "../../error";
import { useForm } from "react-hook-form";

function LoginForm() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  async function onSubmit(data) {
    try {
      const res = await signIn(data);
      if (res.data) {
        localStorage.setItem("jwt", res.data.access_token);
        dispatch(login(res.data?.user));
        toast.success("Login Successfully");
        router.push("/cart");
      }
    } catch (err) {
      console.log(err);
      if (err.response)
        toast.error(`${err.response.data.message}`.toLocaleUpperCase());
    }
  }

  return (
    <form method="POST" className="w-[25rem]" onSubmit={handleSubmit(onSubmit)}>
      <label className="block capitalize text-xl tracking-widest mb-2">
        email{" "}
      </label>
      <input
        type="email"
        className="block mb-8 rounded-md px-4 py-2 outline-none bg-[#FFF7EA] border-slate-300 border-2 w-[25rem]"
        placeholder="email"
        required
        {...register("email")}
      />
      <label className="block capitalize text-xl tracking-widest mb-2">
        password
      </label>
      <input
        type="password"
        className="mb-8 rounded-md px-4 py-2 outline-none bg-[#FFF7EA] border-slate-300 border-2 w-[25rem]"
        placeholder="*******"
        {...register("password")}
      />
      <button className="bg-[#FF9900] px-4 py-2 rounded-md text-white font-semibold tracking-widest text-xl w-full mb-6">
        Login
      </button>
      <span className="block text-center mb-4">OR</span>
      <p className="text-center">
        Don’t have an account ?
        <Link
          href="/signup"
          className="font-semibold tracking-widest text-base  text-[#FF9900] ml-2"
        >
          SignUp
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
