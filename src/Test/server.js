import { setupServer } from "msw/node";
import { Handlers } from "./Handlers";

const server = setupServer(...Handlers);

export * from "msw";
export { server };
