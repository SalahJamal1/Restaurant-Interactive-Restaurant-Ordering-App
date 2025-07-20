import LoginFrom from "../_components/login/LoginForm";

export const metadata = {
  title: "Login - RestoNest",
};
function Page() {
  return (
    <div className="py-6 flex flex-col items-center justify-center">
      <span className="block text-base border-y border-[#FF9900] text-[#292E36] tracking-[2px] mb-4">
        LOGIN
      </span>
      <h2 className="block text-base  text-[#292E36] tracking-[2px] mb-8">
        Let’s Start Your Dinner With Us
      </h2>
      <LoginFrom />
    </div>
  );
}

export default Page;
