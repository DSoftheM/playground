import { Button, Flex, Form, Input, Typography } from "antd";
import { useState } from "react";
import { useLoginMutation } from "./use-login-mutation";
import { useProfileQuery } from "./use-profile-query";
import { Navigate } from "react-router-dom";
import { nav } from "../navigation/nav";

export function LoginForm() {
    const [login, setLogin] = useState("1");
    const [password, setPassword] = useState("1");
    const loginMutation = useLoginMutation();
    const profileQuery = useProfileQuery();

    if (profileQuery.data) {
        return <Navigate to={nav.main} state={{ alreadyLogged: true }} />;
    }

    return (
        <Flex align="center" justify="center" style={{ height: "100vh" }}>
            <Form layout="vertical" style={{ flexBasis: "400px", margin: "0 10px" }}>
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
                        disabled={loginMutation.isLoading || profileQuery.isRefetching}
                        onClick={() => loginMutation.mutate({ login, password })}
                    >
                        Войти
                    </Button>
                </Form.Item>
                {loginMutation.isError && <Typography.Text type="danger">{loginMutation.error.response?.data}</Typography.Text>}
            </Form>
        </Flex>
    );
}
