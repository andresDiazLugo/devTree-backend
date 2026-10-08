import { sequelize } from "../config/database";
import { DataTypes, Model, Optional } from "sequelize";
// 1. Atributos del modelo
interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    handle: string
    description?: string;
    avatar?:string
    image_public_id?:string
}
// 2. Atributos opcionales al crear
interface UserCreationAttributes extends Optional<IUser, "id"> {}
// 3. Clase que extiende Model
class User extends Model<IUser, UserCreationAttributes> implements IUser{
    declare id: number;
    declare name: string;
    declare email: string;
    declare password: string;
    declare handle: string;
    declare description?: string;
    declare avatar?: string
    declare image_public_id?: string
}
// 4. Inicializar modelo
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    handle: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_public_id:{
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: "User",
  }
);

export default User;
export { IUser };