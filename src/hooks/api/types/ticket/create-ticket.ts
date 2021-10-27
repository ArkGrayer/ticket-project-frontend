import { TicketTypeEnum } from "enum/ticket-type";
import { TicketEntity } from "./ticket-entity";

export interface CreateTicketInput {
	code?: string;
	name: string;
	description: string;
	type: TicketTypeEnum;
	discountValue: number;
	expirationDate: Date;
}

export type CreateTicketOutput = TicketEntity;
