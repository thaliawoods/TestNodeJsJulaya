import { Sequelize, DataTypes, Model } from "sequelize";

// Initialize Sequelize
const sequelize = new Sequelize("testnodedb", "thaliawoods", "xoxo", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  logging: false, // Set to true to see SQL logs
});

// Define User model
class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,},
    firstname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    countryCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE, 
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE, 
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: false,
  }
);

// Define AccessToken model
class AccessToken extends Model {}

AccessToken.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true, 
    },
    ttl: {
      type: DataTypes.INTEGER, 
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "AccessToken",
    tableName: "accessTokens",
    timestamps: false,
  }
);

// Define Review model
class Review extends Model {}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true, 
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mark: {
      type: DataTypes.INTEGER, 
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Review",
    tableName: "reviews",
    timestamps: false,
  }
);

// Define Kiosk model
class Kiosk extends Model {}

Kiosk.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: true,
      autoIncrement: true, 
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mark: {
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Kiosk",
    tableName: "kiosks", 
    timestamps: false,
  }
);

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

export { sequelize, User, AccessToken, Review, Kiosk };
