import { PropsWithChildren } from "react";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createNotification } from "./features/notifications/notifications";

const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
    queryCache: new QueryCache({
        onError: (error) => {
            createNotification({ type: "danger", message: error.message, details: String(error) });
        },
    }),
});

export const ReactQueryProvider = (props: PropsWithChildren) => {
    return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>;
};

export enum ReactQueryKey {
    GetAllPlayers = "GetAllPlayers",
    GetPlayer = "GetPlayer",
    UseInfiniteQueryList = "UseInfiniteQueryList",
    UseInfiniteQueryPaginated = "UseInfiniteQueryPaginated",
}
