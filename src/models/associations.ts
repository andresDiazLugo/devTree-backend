import User from "./User";
import Link from "./Link";

User.hasMany(Link, {
  foreignKey: "userId",
  as: "links",
});

Link.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});