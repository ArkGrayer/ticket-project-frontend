import { createContext, useCallback, useContext, useState } from "react";

interface AuthContextType {
	token?: string;
	setToken: (token: string) => void;
	logout: () => void;
}

const DEFAULT_VALUE: AuthContextType = {} as any;

const AuthContext = createContext<AuthContextType>(DEFAULT_VALUE);

export const AuthProvider: FC<{ children: Array<JSX.Element> }> = ({
	children,
}) => {
	const [token, setToken] = useState<string>();

	const logout = useCallback(() => {
		localStorage.removeItem("userToken");

		setToken(undefined);
	}, []);

	return (
		<AuthContext.Provider
			value={{
				...DEFAULT_VALUE,
				token,
				setToken,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => {
	const context = useContext<AuthContextType>(AuthContext);

	return context;
};
