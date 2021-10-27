import {
	Form,
	Input,
	Button,
	Checkbox,
	Radio,
	DatePicker,
	InputNumber,
} from "antd";
import { TicketTypeEnum } from "enum/ticket-type";
import { useApi } from "hooks/api";
import { useLoading } from "hooks/loading";
import { useCallback } from "react";
import { toast } from "react-toastify";

const CreateTicket = () => {
	const { createTicket } = useApi();

	const { requestState, setErrorState, setLoadingState, setSuccessState } =
		useLoading();

	const onFinish = useCallback(async (value: any) => {
		try {
			setLoadingState();

			await createTicket(value);

			toast.success("Cupom criado com sucesso");
		} catch (err: any) {
			// eslint-disable-next-line no-console
			console.error(err);

			setErrorState();

			toast.error("Erro ao criar cupom");
		}
	}, []);

	const onFinishFailed = useCallback((error: any) => {
		// eslint-disable-next-line no-console
		console.error(error);

		setErrorState();

		toast.error("Erro ao criar cupom");
	}, []);

	return (
		<div>
			<div>
				<Form
					name="createTicket"
					initialValues={{ type: TicketTypeEnum.PERCENTAGE }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
				>
					<Form.Item name="code" label="Código">
						<Input placeholder="Digite um código" />
					</Form.Item>
					<Form.Item
						name="name"
						label="Nome"
						rules={[
							{
								required: true,
								message: "Nome do cupom é um campo obrigatório",
							},
						]}
					>
						<Input placeholder="Digite o nome do ticket" />
					</Form.Item>

					<Form.Item
						name="description"
						label="Descrição"
						rules={[
							{
								required: true,
								message: "Descrição do cupom é um campo obrigatório",
							},
						]}
					>
						<Input.TextArea placeholder="Descreva seu cupom" />
					</Form.Item>

					<Form.Item
						name="type"
						label="Tipo de desconto"
						rules={[
							{
								required: true,
								message: "Tipo de desconto é um campo obrigatório",
							},
						]}
					>
						<Radio.Group buttonStyle="solid">
							<Radio.Button value={TicketTypeEnum.PERCENTAGE}>
								Porcentagem
							</Radio.Button>
							<Radio.Button value={TicketTypeEnum.RAW}>
								Valor Bruto
							</Radio.Button>
						</Radio.Group>
					</Form.Item>

					<Form.Item
						name="discountValue"
						label="Valor do desconto"
						rules={[
							{
								required: true,
								message: "Valor do desconto é um campo obrigatório",
							},
						]}
					>
						<InputNumber min={1} />
					</Form.Item>

					<Form.Item
						name="expirationDate"
						label="Validade"
						rules={[
							{
								required: true,
								message: "Validade do cupom é um campo obrigatório",
							},
						]}
					>
						<DatePicker />
					</Form.Item>

					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							disabled={requestState === "LOADING"}
						>
							Criar Cupom
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

// eslint-disable-next-line import/no-default-export
export default CreateTicket;
