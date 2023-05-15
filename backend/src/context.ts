import * as trpcExpress from "@trpc/server/adapters/express";

export const createContext = ({
	req,
	res,
}: trpcExpress.CreateExpressContextOptions) => {
	const getUser = () => {
		if (req.headers.authorization !== "secret") {
			return null;
		}
		return {
			name: "alex",
		};
	};

	return {
		req,
		res,
		user: getUser(),
	};
};

// export  createContext;
