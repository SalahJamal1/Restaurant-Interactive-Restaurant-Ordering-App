"use client";
import { useState } from "react";
import { signup } from "../_lib/apiResto";
import { useRouter } from "next/navigation";

function SignUpFrom() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();
  async function handelSubmit(e) {
    e.preventDefault();

    if (!email && !password && !firstName && !lastName && !address && !phone)
      return;
    const res = await signup({
      firstName,
      lastName,
      address,
      phone,
      email,
      password,
    });
    if (res.user) router.push("/login");
  }
  return (
    <form
      method="POST"
      className="grid grid-cols-2 gap-x-14"
      onSubmit={handelSubmit}
    >
      <div>
        <label className="block capitalize text-xl tracking-widest mb-2">
          First Name
        </label>
        <input
          type="text"
          className="block mb-4 rounded-md px-4 py-2 outline-none bg-[#FFF7EA] border-slate-300 border-2 w-[20rem]"
          placeholder="FirstName"
          value={firstName}
          onChange={(e) => setfirstName(e.target.value)}
        />
      </div>
      <div>
        <label className="block capitalize text-xl tracking-widest mb-2">
          last Name
        </label>
        <input
          type="text"
          className="block mb-4 rounded-md px-4 py-2 outline-none bg-[#FFF7EA] border-slate-300 border-2 w-[20rem]"
          placeholder="LastName"
          value={lastName}
          onChange={(e) => setlastName(e.target.value)}
        />
      </div>
      <div>
        <label className="block capitalize text-xl tracking-widest mb-2">
          address
        </label>
        <input
          type="text"
          className="block mb-4 rounded-md px-4 py-2 outline-none bg-[#FFF7EA] border-slate-300 border-2 w-[20rem]"
          placeholder="Address"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div>
        <label className="block capitalize text-xl tracking-widest mb-2">
          Phone
        </label>
        <input
          type="Phone"
          className="block mb-4 rounded-md px-4 py-2 outline-none bg-[#FFF7EA] border-slate-300 border-2 w-[20rem]"
          required
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div>
        <label className="block capitalize text-xl tracking-widest mb-2">
          email{" "}
        </label>
        <input
          type="email"
          className="block mb-4 rounded-md px-4 py-2 outline-none bg-[#FFF7EA] border-slate-300 border-2 w-[20rem]"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block capitalize text-xl tracking-widest mb-2">
          password
        </label>
        <input
          type="password"
          className="block mb-4 rounded-md px-4 py-2 outline-none bg-[#FFF7EA] border-slate-300 border-2 w-[20rem]"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="bg-[#FF9900] px-4 py-2 rounded-md text-white font-semibold tracking-widest text-xl col-span-2">
        SignUp
      </button>
    </form>
  );
}

export default SignUpFrom;
