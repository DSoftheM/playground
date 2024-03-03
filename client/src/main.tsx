import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { createGlobalStyle } from "styled-components";
import { ConfigProvider } from "antd";

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } } });

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
    }

    body {
        overflow: hidden;
    }
`;

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <GlobalStyle />
            <ConfigProvider theme={{ components: { Menu: {} } }}>
                <App />
            </ConfigProvider>
        </QueryClientProvider>
    </BrowserRouter>
);

