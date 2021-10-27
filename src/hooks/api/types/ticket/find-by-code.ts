import { TicketEntity } from "./ticket-entity";

export interface FindByCodeInput {
	code: string;
}

export type FindByCodeOutput = TicketEntity;
