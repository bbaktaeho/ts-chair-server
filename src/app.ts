import config from "./config";
import * as express from "express";
import Logger from "./loaders/logger";
import loding from "./loaders";

async function startServer() {
  const app = express();

  await loding({ expressApp: app });

  app.listen(config.port, (err: Error) => {
    if (err) {
      Logger.error(err);
      process.exit(1);
      return;
    }
    Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️ 
      ################################################
    `);
  });
}

startServer();
