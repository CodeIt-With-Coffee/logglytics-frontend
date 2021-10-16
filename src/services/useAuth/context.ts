import { createContext } from "react";
import { IAuth } from "./types";

const AuthContext = createContext<IAuth>({
  auth: false,
  login: (token: string) => {},
  logout: () => {},
});

export default AuthContext;
