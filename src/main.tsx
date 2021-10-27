import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import "styles/global.css";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthProvider } from "context/auth";
import { RequireLogin } from "wrapper/require-login";
import { AlreadyLogged } from "wrapper/already-logged";
import { DefaultLayout } from "layouts/default";
import { BlankLayout } from "layouts/blank";

const lazyLoading = (path: string) =>
	lazy(() => import(`./pages/${path}/index.tsx`));

const createComponentRequireLogin = (path: string) => () => {
	const Component = lazyLoading(path);

	return (
		<RequireLogin>
			<DefaultLayout>
				<Component />
			</DefaultLayout>
		</RequireLogin>
	);
};

const createComponentAlreadyLogged = (path: string) => () => {
	const Component = lazyLoading(path);

	return (
		<AlreadyLogged>
			<BlankLayout>
				<Component />
			</BlankLayout>
		</AlreadyLogged>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			<ToastContainer />
			<BrowserRouter>
				<Switch>
					<Suspense fallback={<div>Loading</div>}>
						<Route
							path="/"
							exact
							component={createComponentRequireLogin("home")}
						/>
						<Route
							path="/create-ticket"
							exact
							component={createComponentRequireLogin("create-ticket")}
						/>
						<Route
							path="/test-tickets"
							exact
							component={createComponentRequireLogin("test-tickets")}
						/>
						<Route
							path="/listar-tickets"
							exact
							component={createComponentRequireLogin("list-tickets")}
						/>
						<Route
							path="/register"
							exact
							component={createComponentAlreadyLogged("register")}
						/>
						<Route
							path="/login"
							exact
							component={createComponentAlreadyLogged("login")}
						/>
					</Suspense>
				</Switch>
			</BrowserRouter>
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById("root"),
);
