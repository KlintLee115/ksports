/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint:{
        ignoreDuringBuilds:true
    },
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'jqvuripaqkeox1hg.public.blob.vercel-storage.com'
            }
        ]
    }
}

module.exports = nextConfig
