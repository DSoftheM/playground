import { useQuery } from "@tanstack/react-query";
import { apiProvider } from "../api-provider";
import { QueryKey } from "../query-key";

export function useProfileQuery() {
    return useQuery({
        queryKey: [QueryKey.Profile],
        queryFn: () => apiProvider.auth.settings.get(),
        staleTime: Infinity,
        gcTime: Infinity,
    });
}
