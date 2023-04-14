import type { InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";

const NewIndex = () => {
  return (
    <>
      <div className="bg-black flex flex-col min-w-fit text-center">
        <h1
          className="Tiltle font-extrabold text-80px bg-clip-text 
            text-transparent bg-gradient-to-r from-yellow-300 to-red-500"
        >
          {" "}
          Welcome to DAO4Commons{" "}
        </h1>
        <p className="p-7"></p>
        <p className="text-yellow-100  text-40px leading-10 py-2">
          This dApp is for use a DAO for real life time.{" "}
        </p>
        <p className="text-yellow-100  text-40px leading-10 py-2">
          You don't have to treat DAO as something special.{" "}
        </p>
        <p className="p-4"></p>
        <p className="text-white  text-30px leading-10">
          "I want to clean the area where I live",{" "}
        </p>
        <p className="text-white  text-30px leading-10">
          "I want to create a place where children can play",
        </p>
        <p className="text-white  text-30px leading-10">
          "I want to increase the related population in the area where I live",{" "}
        </p>
        <p className="text-white  text-30px leading-10">
          "I want to take action against global warming", etc.{" "}
        </p>
        <p className="p-4"></p>
        <p className="text-yellow-200  text-40px leading-10">
          No more lamenting lack of tools when you want to get started.
        </p>

        <p className="p-10"></p>
        <p className="text-yellow-300  text-40px font-extrabold leading-10">
          Let's Start your Activities With DAO.{" "}
        </p>

        <p className="p-10"></p>
        <p className="text-yellow-400  text-40px  leading-10">
          How to Create DAO{" "}
        </p>
        <p className="p-2"></p>
        <p className="text-white  text-20px leading-10">
          1. Deploy a NFT for as proof of DAO member.
        </p>
        <p className="text-white  text-20px leading-10">
          2. Enter the required information to deploy the DAO.
        </p>
        <p className="text-white  text-20px leading-10">
          3. Register DAO information in Master DAO and register yourself as an
          owner.
        </p>
        <p className="text-white  text-17px leading-10">
          # To become a member of DAO, you need to deposit a certain amount and
          Mint this NFT.
        </p>

        <p className="p-10"></p>
        <p className="text-yellow-500  text-40px  leading-10">
          How to be DAO Member{" "}
        </p>
        <p className="p-2"></p>
        <p className="text-white  text-20px leading-10">
          1. You will need to contact the DAO owner or DAO member for approval.
        </p>
        <p className="text-white  text-20px leading-10">
          2. Ask the DAO owner or DAO member for the NFT address for the member
          and mint it.
        </p>
        <p className="text-white  text-20px leading-10">
          3. If the member has been approved in the DAO and the NFT has been
          minted, you are good to go.
        </p>

        <p className="p-10"></p>
        <p className="text-yellow-600  text-40px  leading-10">
          How to submit a Proposal{" "}
        </p>
        <p className="p-2"></p>
        <p className="text-white  text-20px leading-10">
          1. SubDAO has the ability for DAO members to submit proposals.
        </p>
        <p className="text-white  text-20px leading-10">
          2. You can propose a proposal by logging in to the target SubDAO and
          clicking "Add a Proposal".
        </p>
        <p className="text-white  text-20px leading-10">
          3. What is stored on the blockchain is "github url", "voting results",
          etc.{" "}
        </p>
        <p className="text-white  text-20px leading-10">
          4. It is a premise that the progress of the discussion will be carried
          out on github.
        </p>

        <p className="p-10"></p>
        <p className="text-yellow-700  text-40px  leading-10">
          How to vote a Proposal{" "}
        </p>
        <p className="p-2"></p>
        <p className="text-white  text-20px leading-10">
          1. When the discussion is exhausted, the authorized person changes the
          Proposal status to "voting".
        </p>
        <p className="text-white  text-20px leading-10">
          2. All DAO members have equal voting rights and can vote.
        </p>
        <p className="text-white  text-20px leading-10">
          3. At the end of the election period, the authorized person will
          change the status of Proposal to "Finished Voting".
        </p>
        <p className="text-white  text-20px leading-10">
          4. When the status moves to "Finished Voting", the dApp will aggregate
          the voting results.
        </p>
        <p className="text-white  text-20px leading-10">
          5. If Proposal is passed, the status will be "running", and if
          rejected, the status will be "rejected".
        </p>

        <p className="p-10"></p>
        <p className="text-yellow-800  text-40px  leading-10">
          How to get a basic income as a DAO{" "}
        </p>
        <p className="p-2"></p>
        <p className="text-white  text-20px leading-10">
          1. Master DAO needs to recognize your DAO activities as valuable.
        </p>
        <p className="text-white  text-20px leading-10">
          2. If the Master DAO is recognized as valuable to your DAO, your DAO
          will be able to receive Basic Income.
        </p>

        <p className="p-10"></p>
        <p className="text-yellow-900  text-40px  leading-10">
          How to create a token sale{" "}
        </p>
        <p className="p-2"></p>
        <p className="text-white  text-20px leading-10">
          1. If you are a member of DAO, implement the proposal.
        </p>
        <p className="text-white  text-20px leading-10">
          2. If the proposal is approved by vote, DAO tokens can be issued and
          the tokens can be sold.
        </p>
        <p className="text-white  text-20px leading-10">
          # Note: This feature is incomplete. Currently being implemented.
        </p>

        <p className="p-10"></p>
        <p className="text-orange-100  text-40px  leading-10">
          How to relate other DAO{" "}
        </p>
        <p className="p-2"></p>
        <p className="text-white  text-20px leading-10">
          1. There is a function that allows you to submit proposals in
          collaboration with other DAOs.
        </p>
        <p className="text-white  text-20px leading-10">
          2. It is envisioned that it will be used to create support programs
          common to all humankind.
        </p>
        <p className="text-white  text-20px leading-10">
          3. Such as natural disasters, and relief
          support for ordinary citizens in times of war.
        </p>
        <p className="p-10"></p>
        <p className="text-orange-200  text-40px  leading-10">
          How to Reconstruct Information on the Internet{" "}
        </p>
        <p className="p-2"></p>
        <p className="text-white  text-20px leading-10">......</p>

        <p className="p-12"></p>
        <Link href="/">
          <a className="text-orange-300  text-50px font-extrabold leading-10 underline">
            →→→→ Starting to Create Sub DAO →→→→{" "}
          </a>
        </Link>
        <p className="p-7"></p>
      </div>
    </>
  );
};

export default NewIndex;
