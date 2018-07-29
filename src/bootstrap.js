import {resolve} from "path";
import config from "config";
import load from "call-dir";
import App from "./core/AppCore";
import Database from "./core/DatabaseCore";

export default function(...customOptions) {
  const app = new App(config.get("server"));
  const database = new Database(config.get("database"));

  load(resolve(__dirname, "./models"), (src) => {
    database.load(require(src).default(database.mongoose));
  });

  load(resolve(__dirname, "./routes"), (src) => {
    require(src).default(app, database.mongoose);
  });

  database.connect()
  .then(mongoose => {
    app.run()
  })
  .catch(err => console.log(err))

}
