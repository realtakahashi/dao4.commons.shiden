import Header from './Header';
import Footer from './Footer';
import { FC } from 'react';

const Layout: FC = ({ children }) => {
  return (
    <>
      <Header />
      <main className="">{children}</main>
      <Footer />
    </>
  );
}

export default Layout