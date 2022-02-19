/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  env: {
    MEMBER_NFT_CONTRACT_ADDRESS: process.env.MEMBER_NFT_CONTRACT_ADDRESS,
    CHAIN_NODE_ADDRESS: process.env.CHAIN_NODE_ADDRESS,
    SUBDAO_CONTRACT_ADDRESS: process.env.SUBDAO_CONTRACT_ADDRESS
  }
}