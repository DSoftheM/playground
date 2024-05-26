import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { ConfigProvider } from "antd";
import { ReactQueryProvider } from "./react-query.tsx";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
    }

    body {
        overflow: hidden;
        font-family: Segoe UI;
    }

`;

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <ReactQueryProvider>
            <GlobalStyle />
            <ConfigProvider theme={{ components: { Menu: {} } }}>
                <App />
            </ConfigProvider>
        </ReactQueryProvider>
    </BrowserRouter>
);
