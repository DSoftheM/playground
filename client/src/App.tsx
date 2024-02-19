import { Route, Routes } from "react-router-dom";
import { CatsCreation } from "./cats-creation";
import { Navigation } from "./navigation/navigation";
import { nav } from "./navigation/nav";
import { RegisterForm } from "./auth/register-form";
import { PerlinNoise } from "./perlin-noise";
import { LoginForm } from "./auth/login-form";
import { WithAuth } from "./routes/with-auth";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigation />}>
                <Route element={<WithAuth />}>
                    <Route index element={<CatsCreation />} />
                    <Route path={nav.perlin} element={<PerlinNoise />} />
                    <Route path={nav.catsCreation} element={<CatsCreation />} />
                </Route>
            </Route>
            <Route path={nav.auth.register} element={<RegisterForm />} />
            <Route path={nav.auth.login} element={<LoginForm />} />
        </Routes>
    );
}

export default App;

