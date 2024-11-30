import { createContext, Dispatch, useEffect, useReducer } from "react";

// Define types for the state and actions
type Role = {
  isActive: boolean;
  _id: string;
  name: string;
  permissions: string[];
  limits: any[];
};

type Subscription = {
  status: string;
  autoRenew: boolean;
};

type User = {
  _id: string;
  username: string;
  email: string;
  apiKey: string;
  balance: number;
  role: Role;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  lastLoginAt: string;
  payment: any[];
  subscription: Subscription;
  phone?: string; // Optional field for phone number
};

type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" };

const INITIAL_STATE: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  loading: false,
  error: null,
};

export const AuthContext = createContext<{
  user: User | null;
  loading: boolean;
  error: string | null;
  dispatch: Dispatch<AuthAction>;
}>({
  ...INITIAL_STATE,
  dispatch: () => null,
});

const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
