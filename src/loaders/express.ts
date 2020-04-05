import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as hpp from "hpp";
import * as helmet from "helmet";
import * as dotenv from "dotenv";
import * as morgan from "morgan";
import routes from "../api";
import config from "../config";

dotenv.config();

interface IError extends Error {
  status: number;
}

// express loader
export default ({ app }: { app: express.Application }) => {
  const prod: boolean = process.env.NODE_ENV === "production";

  app.set("port", prod ? process.env.PORT : 3065);
  app.enable("trust proxy");

  if (prod) {
    app.use(hpp());
    app.use(helmet());
    app.use(morgan("combined"));
    // app.use(cors({

    // }))
  } else {
    app.use(morgan("dev"));
    app.use(
      cors({
        origin: true,
        credentials: true,
      })
    );
  }
  app.use("/", express.static("uploads"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Load API routes
  app.use(config.api.prefix, routes());

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error("Not Found") as IError;
    err["status"] = 404;
    next(err);
  });

  /// error handlers
  app.use(
    (
      err: IError,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      /**
       * Handle 401 thrown by express-jwt library
       */
      if (err.name === "UnauthorizedError") {
        return res.status(err.status).send({ message: err.message }).end();
      }
      return next(err);
    }
  );
  app.use(
    (
      err: IError,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      res.status(err.status || 500);
      res.json({
        errors: {
          message: err.message,
        },
      });
    }
  );
};
