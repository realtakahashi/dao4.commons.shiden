import {
    controlTokenSale,
  getMintedAmount,
  getPrice,
  getSalesAmount,
  getSalesStatus,
  mint,
} from "@/dao4.frontend.common/contracts/DaoErc20_api";
import { MintInfo, TokenInfoWithName } from "@/dao4.frontend.common/types/Token";
import { useEffect, useState } from "react";

interface Erc721DetailParameter{
    selectToken: TokenInfoWithName;
}

const Erc721Detail = (props:Erc721DetailParameter) => {
  const [saleStatus, setSaleStatus] = useState(false);
  const [salesAmount, setSalesAmount] = useState("");
  const [changeStatus, setChangeStatus] = useState(false);
  const [price, setPrice] = useState("");

  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChangeStatus(Boolean(event.target.value));
  };

  const _onSubmitStatus = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await controlTokenSale(changeStatus,props.selectToken.tokenAddress);
  };

  const _getSalesStatus = async () => {
    setSaleStatus(await getSalesStatus(props.selectToken.tokenAddress));
  };
  
  const _getSalesAmount = async () => {
    const ret = await getSalesAmount(props.selectToken.tokenAddress);
    setSalesAmount(ret);
  };
  
  const _getPrice =async () => {
    setPrice(await getPrice(props.selectToken.tokenAddress));
  }

  useEffect(() => {
    _getSalesStatus();
    _getSalesAmount();
    _getPrice();
  }, []);

  return (
    <>
      <div className="bg-black flex flex-col min-h-screen">
        <div className="flex flex-col justify-center m-5 leading-none tracking-tight">
          <div className="text-orange-300 text-30px">Token Status</div>
          <table>
            <tr>
              <th className="text-white">Name/Symbol</th>
              <td>
                {props.selectToken.tokenName} / {props.selectToken.tokenSymbol}
              </td>
            </tr>
            <tr>
              <th>Sales Status</th>
              <td>{saleStatus}</td>
            </tr>
            <tr>
              <th>Price</th>
              <td>{price}</td>
            </tr>
            <tr>
              <th>Sales Amount</th>
              <td>{salesAmount}</td>
            </tr>
          </table>
          <form className="" onSubmit={_onSubmitStatus}>
            <div className=" p-2 flex flex-col">
              <div>Change Sales Status...</div>
              <table className="text-20px text-orange-400">
                <tr>
                  <th className=" flex justify-end px-4 py-2">Status:</th>
                  <td className=" px-4 py-2">
                    <select
                      className="py-2 px-4"
                      name="proposalKind"
                      onChange={onChangeSelect}
                    >
                      <option value="1">On Sale</option>
                      <option value="0">Not On Sale</option>
                    </select>
                  </td>
                </tr>
              </table>
            </div>
            <button
              className="px-7 py-3 border-double border-white border-2 bg-black rounded text-20px text-orange-400  hover:bg-orange-200"
              onClick={() => _onSubmitStatus}
            >
              Change Status
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Erc721Detail;
