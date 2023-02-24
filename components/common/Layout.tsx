import Head from 'next/head';
import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => (
  <>
    <Head>
      <title>Cálculadora de crédito hipotecario</title>
      <meta name='description' content='Cálculadora de crédito hipotecario' />
    </Head>
    <main className={`p-8`}>{children}</main>
  </>
);

export default Layout;
