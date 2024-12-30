import { Role } from "~/generated/graphql";

export interface User {
  _id: string;
  username: string;
  email: string;
  _email: string;
  nickname: string;
  position: string;
  roles: Array<Role>;
  thumbnail: string;
}
