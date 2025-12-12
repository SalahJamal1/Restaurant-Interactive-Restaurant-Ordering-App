import SignUpFrom from "../_components/signup/SignUpForm";

export const metadata = {
  title: "SignUp",
};

function Page() {
  return (
    <div className="pt-12 flex flex-col items-center justify-center flex-1">
      <span className="block text-base border-y border-[#FF9900] text-[#292E36] tracking-[2px] mb-4">
        SignUp
      </span>
      <h2 className="block text-base  text-[#292E36] tracking-[2px] mb-4">
        Let’s Start Your Dinner With Us
      </h2>
      <SignUpFrom />
    </div>
  );
}

export default Page;
