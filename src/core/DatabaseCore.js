import mongoose from "mongoose";
/**
 * Database and its related classes provide a simple SQL database interface for
 * the server. The Database is the basic class you use to connect your `Node.js`
 * application to an RDBMS. There is a different adapter class for each brand of
 * RDBMS.
 *
 * This component is intended to lower level database operations. If you want to
 * interact with databases using higher level of abstraction use connected
 * Models.
 *
 * @example Using models
 * const User = db.get("user");
 *
 * User.create({ … })
 *  .then((user) => console.log("Created", user)) ;
 *  .catch((err) => console.log("Error", err)) ;
 *
 *
 * @example Using raw queries
 * db.connection.query( … )
 *  .then((data) => console.log("Executed", data)) ;
 *  .catch((err) => console.log("Error", err)) ;
 *
 * @class   {Database}
 * @export  {Database}
 * @access  public
 */

export default class Database {
  /**
   * Imported models.
   *
   * @type    {Object}
   * @access  private
   */
  models = {};

  /**
   * Connection to database.
   *
   * @type    {Sequelize}
   * @access  public
   */
  connection = null;

  /**
   * Creates a connection to a database.
   *
   * @param   {Object}    config              Configuration object
   * @param   {string}    config.host         Database host
   * @param   {string}    config.port         Database port
   * @param   {string}    config.username     Database username
   * @param   {string}    config.password     Database password
   * @param   {string}    config.database     Database name
   */
  constructor(config = {}) {
    this.config = config;
    this.mongoose = mongoose;
  }

  /**
   * Connects to a database and loads all the models.
   *
   * @return  {Promise}
   * @access  private
   */
  connect() {
    return new Promise((resolve, reject) => {
      try {
        const { database, username, password, host, port } = this.config;
        this.mongoose.connect(`mongodb://${host}:${port}/${database}`, { useNewUrlParser: true } );
        this.connection = mongoose.connection;
        resolve(mongoose)
      } catch (err) {
        reject(err)
      }
    });
  }


  /**
   * Loads a model and saved it for further usage.
   *
   * @param   {string}  resource
   * @return  {void}
   * @access  public
   */
  load(resource) {
    this.models[resource.modelName] = this.mongoose.model(resource.modelName, resource.schema)
  }

  /**
   * Just a helper so we don't have to get models with `database.models.Model`
   * each time. Additionally, check if the model exists.
   *
   * @example
   *  const Users = db.get("users");
   *  const Bets  = db.get("bets");
   *
   * @param   {string}        name
   * @return  {Sequelize}
   * @access  public
   */
  get(name) {
    if (!(name in this.models)) {
      // @todo create custom error class
      throw new Error(`Model "${name}" not defined`);
    }

    return this.models[name];
  }
}
