"use client";
import { useReducer, useState } from "react";
import { signup } from "../_lib/apiResto";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { SET_ERROR } from "../_store/userSlice";

function SignUpFrom() {
  const { errors } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [formData, setData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const onChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const isValid = () => {
    let tempError = {};
    if (!formData.firstName.trim())
      tempError.firstName = "please enter the First Name";
    if (!formData.lastName.trim())
      tempError.lastName = "please enter the Last Name";
    if (!formData.address.trim())
      tempError.address = "please enter the Address";
    if (!formData.email.trim()) tempError.email = "please enter the Email";
    if (!formData.phone.trim()) tempError.phone = "please enter the Phone";
    if (!formData.password.trim())
      tempError.password = "please enter the password";
    Object.entries(tempError).forEach(([key, value]) => {
      dispatch(SET_ERROR({ type: `ERROR_${key.toUpperCase()}`, value }));
    });
    return Object.entries(tempError).length === 0;
  };
  async function handelSubmit(e) {
    e.preventDefault();

    if (!isValid()) return;
    try {
      const res = await signup(formData);
      if (res.data.user) router.push("/login");
    } catch (err) {
      const message = err?.response?.data?.message || err?.message;
      toast.error(message);
    }
  }

  return (
    <form
      method="POST"
      className="grid grid-cols-2 gap-x-14"
      onSubmit={handelSubmit}
    >
      <div className="mb-3">
        <label className="block capitalize text-xl tracking-widest mb-2">
          First Name
        </label>
        <input
          type="text"
          className="block mb-2 rounded-md px-4 py-2 outline-none bg-[#FFF7EA] border-slate-300 border-2 w-[20rem]"
          placeholder="FirstName"
          name="firstName"
          value={formData.firstName}
          onChange={onChange}
        />
        {errors.firstName && (
          <p className="text-red-500 capitalize">{errors.firstName}</p>
        )}
      </div>
      <div className="mb-3">
        <label className="block capitalize text-xl tracking-widest mb-2">
          last Name
        </label>
        <input
          type="text"
          className="block mb-1 rounded-md px-4 py-2 outline-none bg-[#FFF7EA] border-slate-300 border-2 w-[20rem]"
          placeholder="LastName"
          name="lastName"
          value={formData.lastName}
          onChange={onChange}
        />
        {errors.lastName && (
          <p className="text-red-500 capitalize">{errors.lastName}</p>
        )}
      </div>
      <div className="mb-3">
        <label className="block capitalize text-xl tracking-widest mb-2">
          address
        </label>
        <input
          type="text"
          className="block mb-1 rounded-md px-4 py-2 outline-none bg-[#FFF7EA] border-slate-300 border-2 w-[20rem]"
          placeholder="Address"
          // required
          name="address"
          value={formData.address}
          onChange={onChange}
        />
        {errors.address && (
          <p className="text-red-500 capitalize">{errors.address}</p>
        )}
      </div>
      <div className="mb-3">
        <label className="block capitalize text-xl tracking-widest mb-2">
          Phone
        </label>
        <input
          type="Phone"
          className="block mb-3 rounded-md px-4 py-2 outline-none bg-[#FFF7EA] border-slate-300 border-2 w-[20rem]"
          // required
          placeholder="Phone"
          name="phone"
          value={formData.phone}
          onChange={onChange}
        />
        {errors.phone && (
          <p className="text-red-500 capitalize">{errors.phone}</p>
        )}
      </div>
      <div className="mb-3">
        <label className="block capitalize text-xl tracking-widest mb-2">
          email{" "}
        </label>
        <input
          type="email"
          className="block mb-1 rounded-md px-4 py-2 outline-none bg-[#FFF7EA] border-slate-300 border-2 w-[20rem]"
          placeholder="Email"
          // required
          name="email"
          value={formData.email}
          onChange={onChange}
        />
        {errors.email && (
          <p className="text-red-500 capitalize">{errors.email}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block capitalize text-xl tracking-widest mb-2">
          password
        </label>
        <input
          type="password"
          className="block mb-1 rounded-md px-4 py-2 outline-none bg-[#FFF7EA] border-slate-300 border-2 w-[20rem]"
          // required
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={onChange}
        />
        {errors.password && (
          <p className="text-red-500 capitalize">{errors.password}</p>
        )}
      </div>
      <button className="bg-[#FF9900] px-4 py-2 rounded-md text-white font-semibold tracking-widest text-xl col-span-2">
        SignUp
      </button>
    </form>
  );
}

export default SignUpFrom;
