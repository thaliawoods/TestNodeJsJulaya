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
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstname: { type: DataTypes.STRING },
    lastname: { type: DataTypes.STRING },
    countryCode: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: false,
  }
);

// Define AccessToken model
const AccessToken = sequelize.define('AccessToken', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false, 
    references: {
      model: User, 
      key: 'id',
    },
  },
  ttl: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});


// Define Review model
class Review extends Model {}

Review.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
    },
    comment: { type: DataTypes.STRING },
    mark: { type: DataTypes.INTEGER },
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
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
    },
    comment: { type: DataTypes.STRING },
    mark: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "Kiosk",
    tableName: "kiosks",
    timestamps: false,
  }
);

// relationships
User.hasOne(Kiosk, { foreignKey: "userId" });
Kiosk.belongsTo(User);

User.hasMany(Review, { foreignKey: "userId" });
Review.belongsTo(User);

User.hasMany(AccessToken, { foreignKey: "userId" });
AccessToken.belongsTo(User);

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

export { sequelize, User, AccessToken, Review, Kiosk };



