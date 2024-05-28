import { useQuery } from "@tanstack/react-query";
import { apiProvider } from "./api-provider";

export const useGetAllUsersQuery = () => {
    return useQuery({
        queryKey: ["getAllUsers"],
        queryFn: apiProvider.getAllUsers,
    });
};
