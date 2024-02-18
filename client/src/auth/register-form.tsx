import { Button, Form, Input, Typography } from "antd";
import { useState } from "react";
import { useRegisterMutation } from "./use-register-mutation";

type Props = {};

export function RegisterForm(props: Props) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const registerMutation = useRegisterMutation();

    return (
        <Form layout="vertical" onValuesChange={console.log}>
            <Typography.Title>Регистрация</Typography.Title>
            <Form.Item label="Логин">
                <Input name="login" value={login} onChange={(e) => setLogin(e.target.value)} />
            </Form.Item>
            <Form.Item label="Пароль">
                <Input name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    disabled={registerMutation.isLoading}
                    onClick={() => registerMutation.mutate({ login, password })}
                >
                    Зарегистрироваться
                </Button>
            </Form.Item>
            {registerMutation.isError && <Typography.Text type="danger">{registerMutation.error.response?.data}</Typography.Text>}
            {registerMutation.isSuccess && <Typography.Text type="success">Успешная регистрация</Typography.Text>}
        </Form>
    );
}
