import axios from "axios";
import { useAuthContext } from "context/auth";
import { useCallback } from "react";
import { CountTicketOutput } from "./types/ticket/count-tickets";
import { FindByCodeInput, FindByCodeOutput } from "./types/ticket/find-by-code";
import {
	ListTicketsInput,
	ListTicketsOutput,
} from "./types/ticket/list-tickets";
import { RegisterInput, RegisterOutput } from "./types/user/register";
import { LoginInput, LoginOutput } from "./types/user/login";
import {
	CreateTicketInput,
	CreateTicketOutput,
} from "./types/ticket/create-ticket";

export const useApi = () => {
	const authContext = useAuthContext();

	const instance = axios.create({
		baseURL: "https://andrei-ticket-project.herokuapp.com",
	});

	const register = (params: RegisterInput) =>
		instance
			.post<RegisterOutput>("/user/register", params)
			.then(result => result.data);

	const countTickets = () =>
		instance
			.get<CountTicketOutput>("/ticket/count-tickets", {
				headers: { authorization: `Bearer ${authContext.token}` },
			})
			.then(result => result.data);

	const listTickets = ({ page }: ListTicketsInput) =>
		instance
			.get<ListTicketsOutput>(
				`/ticket/list-tickets-by-page?${page ? `page=${page}` : ""}`,
				{
					headers: { authorization: `Bearer ${authContext.token}` },
				},
			)
			.then(result => result.data);

	const findByCode = ({ code }: FindByCodeInput) =>
		instance
			.get<FindByCodeOutput>(`ticket/find-by-code?code=${code}`, {
				headers: { authorization: `Bearer ${authContext.token}` },
			})
			.then(result => result.data);

	const login = (params: LoginInput) =>
		instance
			.post<LoginOutput>("user/login", params)
			.then(result => result.data);

	const createTicket = (params: CreateTicketInput) =>
		instance
			.post<CreateTicketOutput>("/ticket/create", params, {
				headers: { authorization: `Bearer ${authContext.token}` },
			})
			.then(result => result.data);

	return {
		register,
		countTickets,
		listTickets,
		findByCode,
		login,
		createTicket,
	};
};
