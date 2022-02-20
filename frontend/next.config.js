/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  env: {
    MEMBER_NFT_CONTRACT_ADDRESS: process.env.MEMBER_NFT_CONTRACT_ADDRESS,
    SUBDAO_CONTRACT_ADDRESS: process.env.SUBDAO_CONTRACT_ADDRESS,
    MASTERDAO_CONTRACT_ADDRESS: process.env.MASTERDAO_CONTRACT_ADDRESS
  }
}