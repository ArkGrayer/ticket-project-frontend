import { useApi } from "hooks/api";
import { useLoading } from "hooks/loading";
import { useEffect, useState } from "react";
import { Spin } from "antd";

const Home = () => {
	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	const [count, setCount] = useState<number>(0);

	const { countTickets } = useApi();
	const { requestState, setSuccessState, setLoadingState, setErrorState } =
		useLoading();

	useEffect(() => {
		const getCountTickets = async () => {
			try {
				setLoadingState();

				const result = await countTickets();

				setSuccessState();

				// eslint-disable-next-line @typescript-eslint/no-magic-numbers
				if (result <= 0) {
					setErrorState();
				} else {
					setCount(result);
				}
			} catch (err: any) {
				// eslint-disable-next-line no-console
				console.error(err);

				setErrorState();
			}
		};

		getCountTickets();
	}, []);

	return (
		<div>
			{requestState === "SUCCESS" && count}
			{requestState === "LOADING" && <Spin />}
			{requestState === "ERROR" && "Nenhum ticket encontrado"}
		</div>
	);
};

// eslint-disable-next-line import/no-default-export
export default Home;
