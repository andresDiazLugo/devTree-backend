import { Model, Optional } from "sequelize";
interface ILink {
    id: number;
    name: string;
    url: string;
    enabled: boolean;
    order: number;
    userId: number;
}
interface LinkCreationAttributes extends Optional<ILink, "id"> {
}
declare class Link extends Model<ILink, LinkCreationAttributes> implements ILink {
    id: number;
    name: string;
    url: string;
    enabled: boolean;
    order: number;
    userId: number;
}
export default Link;
export { ILink };
