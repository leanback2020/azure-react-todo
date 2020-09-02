//const createMongoClient = require("../../shared/mongo")

const { MongoClient } = require("mongodb")

const config = {
  url: process.env.MONGODB, // "mongodb+srv://mainUser:Mongo@2020@cluster0-z1att.mongodb.net/ReactTodo?retryWrites=true&w=majority", //process.env.CONNECTIONSTRING,
  dbName: "ReactTodo",
}

async function createConnection() {
  console.log("Create Connection: " + config.url)
  const connection = await MongoClient.connect(config.url, {
    useNewUrlParser: true,
  })
  console.log("Create DB Object")
  const db = connection.db(config.dbName)
  return {
    connection,
    db,
  }
}

module.exports = async (context) => {
  console.log("Get Todo List")
  const { db, connection } = await createConnection()

  const Todos = db.collection("todo")
  const res = await Todos.find({})
  const body = await res.toArray()

  connection.close()

  context.res = {
    status: 200,
    body,
  }
}
