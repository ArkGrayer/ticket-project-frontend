import { useAuthContext } from "context/auth";
import { useEffect } from "react";
import { useHistory } from "react-router";

export const AlreadyLogged: FC<{ children: Array<JSX.Element> | JSX.Element }> =
	({ children }) => {
		const history = useHistory();
		const authContext = useAuthContext();

		useEffect(() => {
			if (authContext.token) {
				history.push("/");

				return;
			}

			const token = localStorage.getItem("userToken");

			if (token) {
				authContext.setToken(token);
				history.push("/");
			}
		});

		return <> {children} </>;
	};
