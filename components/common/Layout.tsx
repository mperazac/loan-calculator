import Head from 'next/head';
import React from 'react';

type LayoutProps = {
	children: React.ReactNode;
};

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => (
	<>
		<Head>
			<title>Calculadora de crédito hipotecario</title>
			<meta name='description' content='Calculadora de crédito hipotecario' />
		</Head>
		<main className='p-8 bg-gray-50'>{children}</main>
	</>
);

export default Layout;
