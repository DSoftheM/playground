import { Navigate, Route, Routes } from "react-router-dom";
import { CatsCreation } from "./cats/cats-creation";
import { Navigation } from "./navigation/navigation";
import { nav } from "./navigation/nav";
import { RegisterForm } from "./auth/register-form";
import { LoginForm } from "./auth/login-form";
import { WithAuth } from "./routes/with-auth";
import { AllUsers } from "./all-users";
import { MonacoEditor } from "./editor/monaco-editor";
import { Profile } from "./profile/profile";
import { ActionBar } from "./action-bar/action-bar";
import { Cloud } from "./cloud/cloud";
import { Maze } from "./maze/maze";
import { TabsStory } from "./tabs/tabs.story";
import { VirtualList } from "./virtual-list/virtual-list";
import { MediaViewer } from "./media-viewer/media-viewer";
import { GameCrud } from "./game-crud/game-crud";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigation />}>
                <Route element={<WithAuth />}>
                    <Route index element={<CatsCreation />} />
                    <Route path={nav.catsCreation} element={<CatsCreation />} />
                    <Route path={nav.allUsers} element={<AllUsers />} />
                    <Route path={nav.profile} element={<Profile />} />
                    <Route path={nav.actionBar} element={<ActionBar />} />
                    <Route path={nav.tabs} element={<TabsStory />} />
                    <Route path={nav.cloud} element={<Cloud />} />
                    <Route path={nav.maze} element={<Maze />} />
                    <Route path={nav.virtualList} element={<VirtualList />} />
                    <Route path={nav.mediaViewer} element={<MediaViewer />} />
                    <Route path={nav.gameCrud} element={<GameCrud />} />
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
