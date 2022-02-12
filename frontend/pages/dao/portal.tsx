
import Layout from '../../components/common/Layout/Layout';

const DaoPortal = () => {
  return (
    <>
      <div>
        <div className="w-full max-w-sm">
          <div className="md:flex md:items-center mb-6">
            <h1>DAO Info</h1>
          </div>
          <div className="md:flex md:items-center mb-6">
            <label className="block text-gray-500 md:text-right mb-1 md:mb-0 pr-4">
              Members
            </label>
          </div>
          <p className='text-sm'>
            funatsu:0xppppbbbbbbbb
          </p>
          <p className='text-sm'>
            takahashi:0xyuuuuuuuuuuuu
          </p>
          <div className="md:flex md:items-center mb-6 mt-5">
            <button className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 mr-5 rounded" type="button">
              Add Member
            </button>
            <button className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
              Delete Member
            </button>
          </div>

          <div className="md:flex md:items-center mb-6">
            <label className="block text-gray-500 md:text-right mb-1 md:mb-0 pr-4">
              Members
            </label>
          </div>
          <p className='text-sm'>
            CVVB token:200000000000
          </p>
          <p className='text-sm'>
            NBV token:3000000000
          </p>
          <div className="md:flex md:items-center mb-6 mt-5">
            <button className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 mr-5 rounded" type="button">
              Deploy
            </button>
            <button className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
              Mint
            </button>
          </div>
          <div className="md:flex md:items-center mb-6">
            <label className="block text-gray-500 md:text-right mb-1 md:mb-0 pr-4">
              Members
            </label>
          </div>
          <p className='text-sm'>
            BBBBBB:1000
          </p>
          <p className='text-sm'>
            VVVV1000
          </p>
          <div className="md:flex md:items-center mb-6 mt-5">
            <button className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 mr-5 rounded" type="button">
              Deploy
            </button>
            <button className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
              Mint
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

DaoPortal.Layout = Layout
export default DaoPortal