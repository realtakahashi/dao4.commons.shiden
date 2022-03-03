import Link from "next/link";

function Header() {
  return (
    <>
      <nav className="flex justify-center flex-wrap bg-blue-900 p-4">
        <div className="w-1/5">
          <p className="flex justify-start text-blue-300 text-3xl">Master DAO</p>
        </div>
        <div className="w-4/5 flex justify-start p-1">
          <ul>
            <li>
              <Link href="/">
                <a className="m-5 text-white underline">Home</a>
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link href="/">
                <a className="m-5 text-white underline">Members</a>
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link href="/">
                <a className="m-5 text-white underline">Proposals</a>
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link href="/">
                <a className="m-5 text-white underline">Donate2(specific DAO)</a>
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link href="/">
                <a className="m-5 text-white underline">Donate2(Master DAO)</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;
