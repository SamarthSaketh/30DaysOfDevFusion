const mongoose = require("mongoose");

const mongo_uri = `Your_MongoDB_URI_Here`; // Replace with your actual MongoDB URI
// Ensure you have the correct URI format, e.g., mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority

const clientOptions = {
  dbName: process.env.DB_NAME,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
  },
};

async function connectDB() {
  try {
    await mongoose.connect(mongo_uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.log("DB Connection Failed: ", error);
  }
}

module.exports = connectDB;
