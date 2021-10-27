import { useCallback, useState } from "react";

export const useLoading = () => {
	const [requestState, setRequestState] = useState<
		"DEFAULT" | "ERROR" | "LOADING" | "SUCCESS"
	>("DEFAULT");

	const setErrorState = useCallback(() => {
		setRequestState("ERROR");
	}, []);

	const setLoadingState = useCallback(() => {
		setRequestState("LOADING");
	}, []);

	const setSuccessState = useCallback(() => {
		setRequestState("SUCCESS");
	}, []);

	return {
		requestState,
		setErrorState,
		setLoadingState,
		setSuccessState,
	};
};
