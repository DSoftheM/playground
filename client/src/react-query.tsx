import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } } });

export const ReactQueryProvider = (props: PropsWithChildren) => {
    return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>;
};

export enum ReactQueryKey {
    GetAllPlayers = "GetAllPlayers",
}
