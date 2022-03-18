import { Layout } from "@/components/common";
import React, { useState, useEffect } from "react";
import { TokenInfo } from "@/types/Token";
import { useRouter } from "next/router";
import { getErc20ListFromContract } from "@/contracts/DaoERC20Api";
import AddErc20Modal from "@/pages/dao/[address]/tokensales";

const TOKEN_KIND = ["ERC20", "ERC721"] as const;

const router = useRouter();
const subDAOaddress = router.query.address as string;


const TokenSales = () => {
  const [tokenList, settokenList] = useState<Array<TokenInfo>>();

  const [showAddErc20, setShowAddErc20] = useState(false);
  const [showCheckErc20, setShowCheckErc20] = useState(false);
  const [showAddErc721, setShowAddErc721] = useState(false);
  const [showCheckErc721, setShowCheckErc721] = useState(false);
  const [selectToken, setSelectToken] = useState<TokenInfo>({
    tokenID: 0,
    tokenKind: 0,
    name: "",
    symbol: "",
    address: "",
  });

  function setTokenInfo(tokenInfo: TokenInfo) {
    setSelectToken(tokenInfo);
  }

  useEffect(() => {
    const getTokenList = async () => {
      const response = await getErc20ListFromContract();
      settokenList(response);
    };
    getTokenList();
  }, []);

  return (
    <>
      <div className="p-3 flex justify-center">
        <h1 className="text-3xl">Token List</h1>
        <div className="p-3"></div>
      </div>
      <div className="flex justify-center">
        <button
          className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white 
				      font-bold py-2 px-4 m-5 rounded"
          type="button"
          onClick={() => setShowAddErc20(true)}
        >
          Add ERC20
        </button>
        <AddErc20Modal
          showAddErc20={showAddErc20}
          setShowAddErc20={setShowAddErc20}
        />
        <button
          className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white 
				      font-bold py-2 px-4 m-5 rounded"
          type="button"
          onClick={() => setShowCheckErc20(true)}
        >
          Check ERC20
        </button>
        <CheckErc20Modal
          showCheckErc20={showCheckErc20}
          setShowCheckErc20={setShowCheckErc20}
          selectToken={selectToken}
        />

        <button
          className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white 
				      font-bold py-2 px-4 m-5 rounded"
          type="button"
          onClick={() => setShowAddErc721(true)}
        >
          Add ERC721
        </button>
        <AddErc721Modal
          showAddErc721={showAddErc721}
          setShowAddErc721={setShowAddErc721}
        />
        <button
          className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white 
				      font-bold py-2 px-4 m-5 rounded"
          type="button"
          onClick={() => setShowCheckErc721(true)}
        >
          Check ERC721
        </button>
        <CheckErc721Modal
          showCheckErc721={showCheckErc721}
          setShowCheckErc721={setShowCheckErc721}
          selectToken={selectToken}
        />
      </div>
      <div className="flex justify-center">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2">Token Id</th>
              <th className="border px-4 py-2">Token Kind</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Symbol</th>
              <th className="border px-4 py-2">Address</th>
            </tr>
          </thead>
          <tbody>
            {typeof tokenList !== "undefined"
              ? tokenList.map((token) => {
                  return (
                    <tr
                      className="cursor-pointer px-6 py-2 border-b border-gray-200 w-full rounded-t-lg"
                      key={token.tokenID}
                      style={
                        selectToken !== null &&
                        token.tokenID === selectToken.tokenID
                          ? { background: "#ffe4e1" }
                          : {}
                      }
                      onClick={() => setTokenInfo(token)}
                    >
                      <td className="border px-4 py-2">
                        {String(token.tokenID)}
                      </td>
                      <td className="border px-4 py-2">
                        {TOKEN_KIND[token.tokenKind]}
                      </td>
                      <td className="border px-4 py-2">{token.name}</td>
                      <td className="border px-4 py-2">{token.symbol}</td>
                      <td className="border px-4 py-2">{token.address}</td>
                    </tr>
                  );
                })
              : ""}
          </tbody>
        </table>
      </div>
    </>
  );
};

MasterDaoProposals.Layout = Layout;
export default MasterDaoProposals;
