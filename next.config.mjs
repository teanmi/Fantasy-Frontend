/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXTAUTH_URL: "http://localhost:3001",
        NEXTAUTH_SECRET: "40dd023d0b5ad3580370171c355d226fe1738fbc5b4d833d065864c3af0cf337"
    },
};

export default nextConfig;
