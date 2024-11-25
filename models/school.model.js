import { DataTypes } from "sequelize";
import sequelize from "../database/connect.js";

const School = sequelize.define("schools", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false, },
  latitude: { type: DataTypes.FLOAT, allowNull: false, unique: true },
  longitude: { type: DataTypes.FLOAT, allowNull: false, unique: true },
}, { timestamps: false });

export default School;
