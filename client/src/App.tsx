import { Navigate, Route, Routes } from "react-router-dom";
import { CatsCreation } from "./cats/cats-creation";
import { Navigation } from "./navigation/navigation";
import { nav } from "./navigation/nav";
import { RegisterForm } from "./auth/register-form";
import { LoginForm } from "./auth/login-form";
import { WithAuth } from "./routes/with-auth";
import { AllUsers } from "./all-users";
import { MonacoEditor } from "./monaco-editor";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigation />}>
                <Route element={<WithAuth />}>
                    <Route index element={<CatsCreation />} />
                    <Route path={nav.catsCreation} element={<CatsCreation />} />
                    <Route path={nav.allUsers} element={<AllUsers />} />
                </Route>
                <Route path={nav.editor} element={<MonacoEditor />} />
            </Route>
            <Route path={nav.auth.register} element={<RegisterForm />} />
            <Route path={nav.auth.login} element={<LoginForm />} />
            <Route path={nav.auth.login} element={<LoginForm />} />
            <Route path="*" element={<Navigate to={nav.catsCreation} />} />
        </Routes>
    );
}

export default App;

