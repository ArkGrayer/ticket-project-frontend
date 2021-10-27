import { Pagination } from "antd";
import { useApi } from "hooks/api";
import { TicketEntity } from "hooks/api/types/ticket/ticket-entity";
import { useLoading } from "hooks/loading";
import { useEffect, useState } from "react";
import { Ticket } from "./components/ticket";

const ListTickets = () => {
	const { listTickets, countTickets } = useApi();
	const { requestState, setErrorState, setLoadingState, setSuccessState } =
		useLoading();

	const [tickets, setTickets] = useState<Array<TicketEntity>>([]);

	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	const [page, setPage] = useState<number>(1);

	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	const [totalTickets, setTotalTickets] = useState<number>(0);

	useEffect(() => {
		const getTickets = async () => {
			try {
				setLoadingState();

				const [listedTickets, countTicketsResult] = await Promise.all([
					listTickets({ page }),
					countTickets(),
				]);
				setTickets(listedTickets);
				setTotalTickets(countTicketsResult);

				setSuccessState();
			} catch (err: any) {
				// eslint-disable-next-line no-console
				console.error(err);

				setErrorState();
			}
		};

		getTickets();
	}, []);

	return (
		<div>
			{requestState === "SUCCESS" && (
				<>
					<div>
						{tickets.map(ticket => (
							<Ticket key={ticket.id} ticket={ticket} />
						))}
					</div>
					<Pagination
						defaultCurrent={page}
						total={totalTickets}
						onChange={p => setPage(p)}
						pageSize={10}
					/>
				</>
			)}
		</div>
	);
};

// eslint-disable-next-line import/no-default-export
export default ListTickets;
