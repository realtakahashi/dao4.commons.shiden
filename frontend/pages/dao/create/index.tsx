import type { InferGetStaticPropsType, NextPage } from "next";
import { Layout } from "@/components/common";
import Link from "next/link";

const topLinks = [
  { path: "/dao/create/member_nft", label: "Deploy MemberNFT" },
  { path: "/dao/create/subdao", label: "Deploy SubDAO" },  
  { path: '/dao/create/CheckMintedNFT', label: "Check MemberNFT Address" },
];

const CreateDAO = () => {
  return (
    <>
      {topLinks.map((link) => {
        return (
          <div            
            key={link.path}
          >
            <a
              className="button-dao-default block p-4 m-3"
              href={link.path}
              
            >
              {link.label}
            </a>
          </div>
        );
      })}

    </>
  );
};

CreateDAO.Layout = Layout;
export default CreateDAO;
