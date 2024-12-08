import { User } from "./models/user.js";

const forceDatabaseRefresh = false;

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import routes from "./routes/index.js";
import { sequelize } from "./models/index.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Serves static files in the entire client's dist folder
app.use(express.static("../client/dist"));

app.use(express.json());
app.use(routes);

sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});

const seedUsers = async () => {
  await User.bulkCreate(
    [
      { username: "JollyGuru", password: "password" },
      { username: "SunnyScribe", password: "password" },
      { username: "RadiantComet", password: "password" },
    ],
    { individualHooks: true }
  );
};

seedUsers();
