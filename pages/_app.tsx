import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/common/Layout';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<Layout>
			<QueryClientProvider client={queryClient}>
				<Component {...pageProps} />
			</QueryClientProvider>
		</Layout>
	);
}

export default MyApp;
