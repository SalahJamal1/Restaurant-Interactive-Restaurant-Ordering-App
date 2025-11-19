"use client";
import { signup } from "../../_lib/apiAuth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

function SignUpForm() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  async function onSubmit(data) {
    try {
      const res = await signup(data);
      if (res.data.user) router.push("/login");
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.message || err?.message;
      toast.error(message);
    }
  }

  return (
    <form
      method="POST"
      className="grid grid-cols-2 gap-x-14 gap-y-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label className="block capitalize text-xl tracking-widest mb-2">
          First Name
        </label>
        <input
          type="text"
          className="block  rounded-md px-4 py-2 outline-none bg-[#FFF7EA] border-slate-300 border-2 w-[20rem]"
          placeholder="FirstName"
          {...register("firstName")}
          required
        />
      </div>
      <div>
        <label className="block capitalize text-xl tracking-widest mb-2">
          last Name
        </label>
        <input
          type="text"
          className="block  rounded-md px-4 py-2 outline-none bg-[#FFF7EA] border-slate-300 border-2 w-[20rem]"
          placeholder="LastName"
          {...register("lastName")}
          required
        />
      </div>
      <div>
        <label className="block capitalize text-xl tracking-widest mb-2">
          address
        </label>
        <input
          type="text"
          className="block rounded-md px-4 py-2 outline-none bg-[#FFF7EA] border-slate-300 border-2 w-[20rem]"
          placeholder="Address"
          {...register("address")}
          required
        />
      </div>
      <div>
        <label className="block capitalize text-xl tracking-widest mb-2">
          Phone
        </label>
        <input
          type="Phone"
          className="block rounded-md px-4 py-2 outline-none bg-[#FFF7EA] border-slate-300 border-2 w-[20rem]"
          placeholder="Phone"
          required
          {...register("phone")}
        />
      </div>
      <div>
        <label className="block capitalize text-xl tracking-widest mb-2">
          email{" "}
        </label>
        <input
          type="email"
          className="block rounded-md px-4 py-2 outline-none bg-[#FFF7EA] border-slate-300 border-2 w-[20rem]"
          placeholder="Email"
          required
          {...register("email")}
        />
      </div>
      <div>
        <label className="block capitalize text-xl tracking-widest mb-2">
          password
        </label>
        <input
          type="password"
          className="block rounded-md px-4 py-2 outline-none bg-[#FFF7EA] border-slate-300 border-2 w-[20rem]"
          required
          {...register("password")}
          placeholder="********"
        />
      </div>
      <div>
        <label className="block capitalize text-xl tracking-widest mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          className="block rounded-md px-4 py-2 outline-none bg-[#FFF7EA] border-slate-300 border-2 w-[20rem]"
          placeholder="********"
          required
          {...register("confirmPassword")}
        />
      </div>
      <button className="bg-[#FF9900] px-4 py-2 rounded-md text-white font-semibold tracking-widest text-xl self-end">
        SignUp
      </button>
    </form>
  );
}

export default SignUpForm;
