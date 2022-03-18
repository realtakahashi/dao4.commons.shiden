import { useState } from "react";
import { AddErc20Input}  from "@/types/Token";
import { registerErc20 } from "@/contracts/DaoERC20Api"


interface AddErc20Propos {
    showAddErc20: boolean;
    setShowAddErc20: (flg: boolean) => void;
    subDaoAddress: string
  }
  
const AddErc20Modal = (props: AddErc20Propos) => {
    const [formValue, setFormValue] = useState<AddErc20Input>({
      name: "",
      symbol: "",
      price: "",
      amount: "",
    });
  
    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormValue({
        ...formValue,
        [event.target.name]: event.target.value,
      });
    };
  
    const onSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
      console.log("#### Submit 1");
      event.preventDefault();
      await registerErc20(formValue,props.subDaoAddress);
      props.setShowAddErc20(false);
    };
  
    if (props.showAddErc20) {
      return (
        <div id="overlay">
          <div id="content">
            <div className="flex justify-center">
              <form className="" onSubmit={onSubmitForm}>
                <h1 className="text-3xl">Add a ERC20</h1>
                <div className="p-3"></div>
                <table className="table-auto">
                  <thead></thead>
                  <tbody>
                    <tr>
                      <th className="border px-4 py-2">Name</th>
                      <td className="border px-4 py-2">
                        <input
                          className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
                          leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                          name="name"
                          type="text"
                          onChange={onChangeInput}
                        ></input>
                      </td>
                    </tr>
                    <tr>
                      <th className="border px-4 py-2">Symbol</th>
                      <td className="border px-4 py-2">
                        <input
                          className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
                          leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                          name="symbol"
                          type="text"
                          onChange={onChangeInput}
                        ></input>
                      </td>
                    </tr>
                    <tr>
                      <th className="border px-4 py-2">Sub DAO Address</th>
                      <td className="border px-4 py-2">
                        <label
                          className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
                          leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        >{props.subDaoAddress}</label>
                      </td>
                    </tr>
                    <tr>
                      <th className="border px-4 py-2">Price</th>
                      <td className="border px-4 py-2">
                        <input
                          className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
                          leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                          name="price"
                          type="text"
                          onChange={onChangeInput}
                        ></input>
                      </td>
                    </tr>
                    <tr>
                      <th className="border px-4 py-2">Amount</th>
                      <td className="border px-4 py-2">
                        <input
                          className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
                          leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                          name="amount"
                          type="text"
                          onChange={onChangeInput}
                        ></input>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex items-center justify-end mt-4">
                  <button
                    className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 
                      active:bg-gray-200 disabled:opacity-50 mr-4"
                    onClick={() => onSubmitForm}
                  >
                    Ok
                  </button>
                  <button
                    className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 
                      active:bg-gray-200 disabled:opacity-50"
                    onClick={() => props.setShowAddErc20(false)}
                  >
                    Chancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

export default AddErc20Modal;
  