/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint:{
        ignoreDuringBuilds:true
    },
    images:{
        remotePatterns:[
           
            {
                protocol:'https',
                hostname:"klintstorage.blob.core.windows.net",
            }
        ]
    }
}

module.exports = nextConfig
