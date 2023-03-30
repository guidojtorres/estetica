import {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
  useReducer,
} from "react";
import { IAuthProvider } from "./types";

export default function useComponentVisible(initialIsVisible: boolean) {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const ref = useRef<any>(null);

  const handleClickOutside = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return { ref, isComponentVisible, setIsComponentVisible };
}

export const AuthContext = createContext<IAuthProvider | undefined>(undefined);

export function useAuthProvider(): IAuthProvider {
  const check = localStorage.getItem("auth_token") ? true : false;
  const [isAuthenticated, setIsAuthenticated] = useState(check);
  const login = () => {
    localStorage.setItem("auth_token", "dju91236y1hsa0213");
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    setIsAuthenticated(token === "dju91236y1hsa0213");
  }, []);
  const value: IAuthProvider = { login, logout, isAuthenticated };

  return value;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const useForceUpdate = () => {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  return forceUpdate;
};
