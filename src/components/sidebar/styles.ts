import styled from "styled-components";

export const Container = styled.nav`
	width: 16vw;
	background: cyan;
	padding: 1.5rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	> ul > li {
		margin-bottom: 2rem;

		&:last-child {
			margin-bottom: 0;
		}
	}
`;

export const NavItem = styled.li<{ isSamePage: boolean }>`
	> a {
		color: ${({ isSamePage }) => (isSamePage ? "green" : "black")};
		font-weight: bold;
		position: relative;

		&:hover {
			color: red;
		}

		&::after {
			content: " ";
			position: absolute;
			width: 200px;
			height: 6px;
			background: yellow;
			left: 0;
			top: 2.3rem;
		}
	}
`;
