"use client";
import { useSelector } from "react-redux";

function ProfileForm() {
  const { user } = useSelector((store) => store.user);
  return (
    <div>
      <form>
        <label className="block capitalize text-xl tracking-widest mb-2">
          First Name
        </label>
        <input
          type="text"
          className="block w-1/2 mb-4 rounded-full px-4 py-2 outline-none bg-slate-200"
          defaultValue={user?.firstName}
          disabled
        />
        <label className="block capitalize text-xl tracking-widest mb-2">
          last Name
        </label>
        <input
          type="text"
          className="block w-1/2 mb-4 rounded-full px-4 py-2 outline-none bg-slate-200"
          defaultValue={user?.lastName}
          disabled
        />
        <label className="block capitalize text-xl tracking-widest mb-2">
          email
        </label>
        <input
          type="text"
          className="block w-1/2 mb-4 rounded-full px-4 py-2 outline-none bg-slate-200"
          defaultValue={user?.email}
          disabled
        />
      </form>
    </div>
  );
}

export default ProfileForm;
