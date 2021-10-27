import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { Button } from "antd";
import { useAuthContext } from "context/auth";
import { Container, NavItem } from "./styles";

export const SideBar = () => {
	const location = useLocation();
	const authContext = useAuthContext();

	const isSamePage = (path: string) => {
		return location.pathname === path;
	};

	return (
		<Container>
			<ul>
				<NavItem isSamePage={isSamePage("/")}>
					<Link to="/">Home</Link>
				</NavItem>
				<NavItem isSamePage={isSamePage("/create-ticket")}>
					<Link to="/create-ticket">Criar Ticket</Link>
				</NavItem>
				<NavItem isSamePage={isSamePage("/test-tickets")}>
					<Link to="/test-tickets">Testar Ticket</Link>
				</NavItem>
				<NavItem isSamePage={isSamePage("/listar-ticket")}>
					<Link to="listar-tickets">Listar Tickets</Link>
				</NavItem>
			</ul>
			<Button type="primary" onClick={authContext.logout}>
				Logout
			</Button>
		</Container>
	);
};
