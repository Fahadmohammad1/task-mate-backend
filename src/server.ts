import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";
import { Server } from "http";

process.on("uncaughtException", (error) => {
  console.error(error);
  process.exit(1);
});

let server: Server;

async function run() {
  try {
    await mongoose.connect(config.database_url as string);
    console.info("DB connected");

    server = app.listen(config.port, () => {
      console.info(`listening on port ${config.port}`);
    });
  } catch (error) {
    console.error("Failed to connect", error);
  }

  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        console.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
run();
