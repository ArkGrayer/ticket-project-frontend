import { useAuthContext } from "context/auth";
import { useEffect } from "react";
import { useHistory } from "react-router";

export const RequireLogin: FC<{ children: Array<JSX.Element> | JSX.Element }> =
	({ children }) => {
		const history = useHistory();
		const authContext = useAuthContext();

		useEffect(() => {
			const token = localStorage.getItem("userToken");

			if (!token && !authContext.token) {
				history.push("/login");

				return;
			}

			if (token && !authContext.token) {
				authContext.setToken(token);
			}
		});

		return <> {children} </>;
	};
