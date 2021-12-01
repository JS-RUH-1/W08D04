import { createContext } from "react";

export const LogContext = createContext({
  logged: false,
  setLogged: () => {},
});