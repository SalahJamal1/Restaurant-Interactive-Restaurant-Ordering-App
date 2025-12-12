import { Josefin_Sans } from "next/font/google";
import "@/app/_styles/globals.css";
import { Toaster } from "react-hot-toast";
import Script from "next/script";

import AppLayout from "./_ui/AppLayout";

const josefin = Josefin_Sans({
  weight: "variable",
  subsets: ["latin"],
  display: "swap",
});

function Layout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className}text-slate-200`}
        suppressHydrationWarning
      >
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerStyle={{}}
          toastOptions={{
            duration: 5000,
            removeDelay: 1000,
            style: {
              display: "flex",
              alignItems: "center",
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "green",
                secondary: "black",
              },
            },
            error: {
              duration: 3000,
              iconTheme: {
                primary: "red",
                secondary: "black",
              },
            },
          }}
        />
        <Script
          src="https://test-network.mtf.gateway.mastercard.com/static/checkout/checkout.min.js"
          strategy="beforeInteractive"
        />
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}

export default Layout;
