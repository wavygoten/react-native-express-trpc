import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { trpc } from "./utils/trpc";
import React, { useState } from "react";
import { Home } from "./components";

export default function App() {
	const [queryClient] = useState(() => new QueryClient());
	const [trpcClient] = useState(
		() =>
			trpc.createClient({
				links: [
					// loggerLink(),
					httpBatchLink({
						url: `${process.env.URL}`,
						// You can pass any HTTP headers you wish here
						// async headers() {
						//   return {
						//     authorization: getAuthCookie(),
						//   };
						// },
					}),
				],
			})
		// console.log(qu)
	);
	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<Home />
				<StatusBar style="auto" />
			</QueryClientProvider>
		</trpc.Provider>
	);
}
