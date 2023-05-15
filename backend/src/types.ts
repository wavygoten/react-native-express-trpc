import { inferAsyncReturnType } from "@trpc/server";
import { createContext } from "./context";

type Context = inferAsyncReturnType<typeof createContext>;
export default Context;
