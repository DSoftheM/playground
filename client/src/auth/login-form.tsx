import { Button, Form, Input, Typography } from "antd";
import { useState } from "react";
import { useLoginMutation } from "./use-login-mutation";
import { useProfileQuery } from "./use-profile-query";
import { Navigate } from "react-router-dom";
import { nav } from "../navigation/nav";
import { motion } from "framer-motion";

export function LoginForm() {
    const [login, setLogin] = useState("1");
    const [password, setPassword] = useState("1");
    const loginMutation = useLoginMutation();
    const profileQuery = useProfileQuery();

    if (profileQuery.data) {
        return <Navigate to={nav.main} state={{ alreadyLogged: true }} />;
    }

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
                    disabled={loginMutation.isLoading || profileQuery.isRefetching}
                    onClick={() => loginMutation.mutate({ login, password })}
                >
                    Войти
                </Button>
            </Form.Item>
            {loginMutation.isError && <Typography.Text type="danger">{loginMutation.error.response?.data}</Typography.Text>}
        </Form>
    );
}
