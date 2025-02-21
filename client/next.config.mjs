/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dclaevazetcjjkrzczpc.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "gwzjoptlprrjtsetfqwh.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/image/**",
      },
    ],
  },
};

export default nextConfig;
