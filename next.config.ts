import type { NextConfig } from "next";

const nextConfig: NextConfig = {

images: {
    remotePatterns: [
        {
            protocol: 'http',
            hostname: 'localhost',
            port: '3000',
            pathname: '/uploads/avatar/**', // Разрешаем все файлы в этой папке
        },
        ],
},

};

export default nextConfig;
