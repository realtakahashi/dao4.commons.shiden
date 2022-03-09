import type { InferGetStaticPropsType, NextPage } from "next";
import { Layout } from "@/components/common";
import Link from "next/link";

const topLinks = [
  { path: "/dao/create/subdao", label: "Deploy SubDAO" },
  { path: "/dao/create/member_nft", label: "Deploy MemberNFT" },
  { path: '/dao/create/CheckMintedNFT', label: "Check MemberNFT Address" },
];

const CreateDAO = () => {
  return (
    <>
      <div>
        {topLinks.map((link) => {
          return (
            <a
              className="button-dao-default p-4 m-10"
              href={link.path}
              key={link.path}
            >
              {link.label}
            </a>
          );
        })}
      </div>
    </>
  );
};

CreateDAO.Layout = Layout;
export default CreateDAO;
