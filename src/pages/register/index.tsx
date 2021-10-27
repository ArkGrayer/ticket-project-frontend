import { Form, Input, Button, Checkbox } from "antd";
import { RuleRender } from "antd/lib/form";
import { useAuthContext } from "context/auth";
import { useApi } from "hooks/api";
import { useLoading } from "hooks/loading";
import { useCallback } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { Container, FormContainer } from "./styles";

const Register = () => {
	const history = useHistory();
	const { register } = useApi();
	const { requestState, setErrorState, setLoadingState, setSuccessState } =
		useLoading();

	const authContext = useAuthContext();

	const validateConfirmPassword: RuleRender = ({ getFieldValue }) => ({
		validator: (_, value) => {
			if (!value || getFieldValue("password") === value) {
				return Promise.resolve();
			}

			return Promise.reject("Senha não corresponde a senha digitada");
		},
	});

	const onFinish = useCallback(async (values: any) => {
		try {
			setLoadingState();

			const { authCode } = await register(values);

			if (values.remember) {
				localStorage.setItem("userToken", authCode);
			}

			authContext.setToken(authCode);

			setSuccessState();

			history.push("/");

			toast.success("Registrado com sucesso");
		} catch (err: any) {
			setErrorState();

			toast.error("Falha ao se registrar");
			// eslint-disable-next-line no-console
			console.error(err);
		}
	}, []);

	const onFinishFailed = useCallback((error: any) => {
		setErrorState();

		toast.error("Falha ao se registrar");
		// eslint-disable-next-line no-console
		console.error(error);
	}, []);

	return (
		<Container>
			<FormContainer>
				<Form
					name="register"
					labelCol={{ span: 12 }}
					wrapperCol={{ span: 16 }}
					initialValues={{ remember: false }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					style={{ paddingRight: "3rem" }}
				>
					<Form.Item
						label="Email"
						name="email"
						rules={[
							{ required: true, message: "Email é um campo obrigatório" },
							{ type: "email", message: "Email precisa ser válido" },
						]}
					>
						<Input placeholder="Digite seu email" type="email" />
					</Form.Item>

					<Form.Item
						label="Senha"
						name="password"
						rules={[
							{ required: true, message: "Senha é um campo obrigatório" },
						]}
					>
						<Input.Password placeholder="Digite sua senha" />
					</Form.Item>

					<Form.Item
						label="Confirmar senha"
						name="confirmPassword"
						rules={[
							{ required: true, message: "Confirme sua senha" },
							validateConfirmPassword,
						]}
						dependencies={["password"]}
					>
						<Input.Password placeholder="Confirme sua senha" />
					</Form.Item>

					<Form.Item
						name="remember"
						valuePropName="checked"
						wrapperCol={{ offset: 8, span: 16 }}
					>
						<Checkbox>Lembrar de mim</Checkbox>
					</Form.Item>

					<Form.Item
						wrapperCol={{ offset: 8, span: 16 }}
						style={{ marginBottom: 0 }}
					>
						<Button
							type="primary"
							htmlType="submit"
							style={{ marginTop: "8rem", borderRadius: "5px" }}
							disabled={requestState === "LOADING"}
						>
							Registrar-se
						</Button>
					</Form.Item>
				</Form>
			</FormContainer>
		</Container>
	);
};

// eslint-disable-next-line import/no-default-export
export default Register;
