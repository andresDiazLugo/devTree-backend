import { sequelize } from "../config/database";
import { DataTypes, Model, Optional } from "sequelize";
// 1. Atributos del modelo
interface ILink {
    id: number;
    name: string;
    url: string;
    enabled: boolean;
    order: number;
    userId: number
}
// 2. Atributos opcionales al crear
interface LinkCreationAttributes extends Optional<ILink, "id"> {}
// 3. Clase que extiende Model
class Link extends Model<ILink, LinkCreationAttributes> implements ILink{
    declare id: number;
    declare name: string;
    declare url: string;
    declare enabled: boolean;
    declare order: number;
    userId: number
}
// 4. Inicializar modelo
Link.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name:{
     type: DataTypes.ENUM("facebook","github","instagram","x","youtube","tiktok","twitch","linkedin"),
     allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
  },
  {
    sequelize,
    modelName: "Link",
  }
);

export default Link;
export { ILink };