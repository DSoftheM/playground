import { Alert, Button, Form, Input, Typography } from "antd";
import { useState } from "react";
import { useRegisterMutation } from "./use-register-mutation";
import { Navigate } from "react-router-dom";
import { nav } from "../navigation/nav";
import { useProfileQuery } from "./use-profile-query";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

export function RegisterForm() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const registerMutation = useRegisterMutation();
    const profileQuery = useProfileQuery();

    if (profileQuery.data) {
        return <Navigate to={nav.main} state={{ alreadyLogged: true }} />;
    }

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
