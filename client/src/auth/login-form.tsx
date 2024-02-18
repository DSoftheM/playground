import { Button, Form, Input, Typography } from "antd";
import { useEffect, useState } from "react";
import { useLoginMutation } from "./use-login-mutation";
import { apiProvider } from "../api-provider";

export function LoginForm() {
    const [login, setLogin] = useState("1");
    const [password, setPassword] = useState("1");
    const loginMutation = useLoginMutation();

    useEffect(() => {
        apiProvider.auth.settings
            .get()
            .then((profile) => {
                console.log("profile :>> ", profile);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <Form layout="vertical" onValuesChange={console.log}>
            <Typography.Title>Вход в систему</Typography.Title>
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
                    disabled={loginMutation.isLoading}
                    onClick={() => loginMutation.mutate({ login, password })}
                >
                    Войти
                </Button>
            </Form.Item>
            {loginMutation.isError && <Typography.Text type="danger">{loginMutation.error.response?.data}</Typography.Text>}
        </Form>
    );
}