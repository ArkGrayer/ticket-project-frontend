import { Form, Input, Button, Checkbox } from "antd";
import { useAuthContext } from "context/auth";
import { useApi } from "hooks/api";
import { useLoading } from "hooks/loading";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { useCallback } from "react";
import { Container, FormContainer } from "./styles";

const Login = () => {
	const history = useHistory();
	const { login } = useApi();
	const { requestState, setErrorState, setLoadingState, setSuccessState } =
		useLoading();
	const authContext = useAuthContext();

	const onFinish = useCallback(async (values: any) => {
		try {
			setLoadingState();

			const { authCode } = await login(values);

			if (values.remember) {
				localStorage.setItem("userToken", authCode);
			}

			authContext.setToken(authCode);

			setSuccessState();
			history.push("/");

			toast.success("Logado com sucesso");
		} catch (err: any) {
			setErrorState();

			toast.error("Falha ao logar");

			// eslint-disable-next-line no-console
			console.error(err);
		}
	}, []);

	const onFinishFailed = useCallback((error: any) => {
		setErrorState();

		toast.error("Falha ao logar");
		// eslint-disable-next-line no-console
		console.error(error);
	}, []);

	return (
		<Container>
			<FormContainer>
				{requestState === "ERROR" && <p>Email ou senha incorretos</p>}
				<Form
					name="login"
					labelCol={{ span: 12 }}
					wrapperCol={{ span: 16 }}
					initialValues={{ remember: false }}
					style={{ paddingRight: "3rem" }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
				>
					<Form.Item
						label="Email"
						name="email"
						rules={[
							{ required: true, message: "E-mail é um campo obrigatório" },
						]}
					>
						<Input placeholder="Digite seu Email" type="email" />
					</Form.Item>

					<Form.Item
						label="Senha"
						name="password"
						rules={[
							{ required: true, message: "Senha é um campo obrigatório" },
						]}
					>
						<Input placeholder="Digite sua senha" type="password" />
					</Form.Item>

					<Form.Item
						name="remember"
						valuePropName="checked"
						wrapperCol={{ offset: 8, span: 16 }}
					>
						<Checkbox> Lembrar de mim </Checkbox>
					</Form.Item>

					<Button
						type="primary"
						htmlType="submit"
						style={{ marginTop: "8rem", borderRadius: "5px" }}
						disabled={requestState === "LOADING"}
					>
						Entrar
					</Button>
				</Form>
			</FormContainer>
		</Container>
	);
};

// eslint-disable-next-line import/no-default-export
export default Login;
