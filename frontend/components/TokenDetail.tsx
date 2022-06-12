import { TokenInfoWithName, TokenKind } from "@/dao4.frontend.common/types/Token";
import Link from "next/link";
import { useState } from "react";
import Erc20Detail from "./Erc20Detail";
import Erc721Detail from "./Erc721Detail";

interface TokenDetailParameter {
  _selectToken: TokenInfoWithName;
}

const TokenDetail = (props: TokenDetailParameter) => {

  return (
    <>
      <div className="bg-black flex flex-col min-h-screen">
        <div className="p-3"></div>
        {props._selectToken.tokenKind == TokenKind.ERC20 &&(
          <Erc20Detail selectToken={props._selectToken}></Erc20Detail>
        )}
        {props._selectToken.tokenKind == TokenKind.ERC721 &&(
          <Erc721Detail selectToken={props._selectToken}></Erc721Detail>
        )}
      </div>
    </>
  );
};

export default TokenDetail;
