import { initTRPC, TRPCError } from "@trpc/server";
import { z } from "zod";
import Context from "./types";
const t = initTRPC.context<Context>().create();

const router = t.router;
const procedure = t.procedure;
let id = 0;

const db = {
	posts: [
		{
			id: ++id,
			title: "hello",
		},
	],
};
const postRouter = router({
	createPost: procedure
		.input(z.object({ title: z.string() }))
		.mutation(({ input }) => {
			const post = {
				id: ++id,
				...input,
			};
			db.posts.push(post);
			return post;
		}),
	listPosts: procedure.query(() => db.posts),
});

// root router to call
export const appRouter = router({
	// merge predefined routers
	post: postRouter,
	// or individual procedures
	hello: procedure.input(z.string().nullish()).query(({ input, ctx }) => {
		return `hello ${input ?? ctx.user?.name ?? "world"}`;
	}),
	// or inline a router
	admin: router({
		secret: procedure.query(({ ctx }) => {
			if (!ctx.user) {
				throw new TRPCError({ code: "UNAUTHORIZED" });
			}
			if (ctx.user?.name !== "alex") {
				throw new TRPCError({ code: "FORBIDDEN" });
			}
			return {
				secret: "sauce",
			};
		}),
	}),
});

export type AppRouter = typeof appRouter;
