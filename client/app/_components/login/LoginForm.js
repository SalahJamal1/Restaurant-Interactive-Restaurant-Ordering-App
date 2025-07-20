"use client";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../account/userSlice";
import { signIn } from "../../_lib/apiResto";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Error from "../../error";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  async function handelSubmit(e) {
    e.preventDefault();

    if (!email && !password) return;
    try {
      const res = await signIn({ email, password });
      if (res.data) {
        localStorage.setItem("jwt", res.data.token);
        dispatch(login(res.data?.user));
        toast.success("Login Successfully");
        router.push("/cart");
      }
    } catch (err) {
      console.log(err);
      if (err.response)
        toast.error(`${err.response.data.message}`.toLocaleUpperCase());
      else setError("Failed to receive response 404");
    }
  }
  if (error)
    return (
      <Error
        error={error}
        reset={() => {
          setEmail("");
          setPassword("");
          setError("");
          router.refresh();
        }}
      />
    );
  return (
    <form method="POST" className="w-[25rem]" onSubmit={handelSubmit}>
      <label className="block capitalize text-xl tracking-widest mb-2">
        email{" "}
      </label>
      <input
        type="email"
        className="block mb-8 rounded-md px-4 py-2 outline-none bg-[#FFF7EA] border-slate-300 border-2 w-[25rem]"
        placeholder="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="block capitalize text-xl tracking-widest mb-2">
        password
      </label>
      <input
        type="password"
        className="mb-8 rounded-md px-4 py-2 outline-none bg-[#FFF7EA] border-slate-300 border-2 w-[25rem]"
        required
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
