import { TicketEntity } from "./ticket-entity";

export interface ListTicketsInput {
	page?: number;
}

export type ListTicketsOutput = Array<TicketEntity>;
