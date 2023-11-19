import express, { Application } from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import morgan from "morgan";
import { appRouter } from "./routers";
import { createContext } from "./lib/trpc";

const createApp = (): Application => {
  const app = express();

  app.use(cors());
  app.use(cookieParser());
  app.use(compression());
  app.use(morgan("dev"));

  app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext: createContext,
    })
  );

  return app;
};

const app = createApp();

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}/trpc`);
});
