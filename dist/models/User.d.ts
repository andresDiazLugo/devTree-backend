import { Model, Optional } from "sequelize";
interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    handle: string;
    description?: string;
    avatar?: string;
    image_public_id?: string;
}
interface UserCreationAttributes extends Optional<IUser, "id"> {
}
declare class User extends Model<IUser, UserCreationAttributes> implements IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    handle: string;
    description?: string;
    avatar?: string;
    image_public_id?: string;
}
export default User;
export { IUser };
