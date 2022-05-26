import { useState } from "react";
import { mintMemberNFT } from "../../frontend_common/contracts/member_nft_api";

interface FinishMintSetting {
  setCheckMintNft: (flg: boolean) => void;
  nftAddress: string;
}

const MintNFT = (props: FinishMintSetting) => {
  const [tokenId, setTokenId] = useState("");

  const _mintNft = async () => {
    setTokenId(await mintMemberNFT(props.nftAddress));
    props.setCheckMintNft(true);
  };

  return (
    <>
      <div className="p-3"></div>
      <div className="p-1 text-center text-20px">
        <button
          className="px-7 py-3 border-double border-white border-2 bg-black rounded text-orange-400  hover:bg-orange-200"
          onClick={() => _mintNft()}
        >
          <a href="#deploy_nft">Mint The NFT</a>
        </button>
        <div className="p-3"></div>
      </div>
    </>
  );
};

export default MintNFT;
