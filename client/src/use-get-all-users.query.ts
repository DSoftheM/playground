import { useQuery } from "react-query";
import { apiProvider } from "./api-provider";

export const useGetAllUsersQuery = () => {
    return useQuery({
        queryKey: "getAllUsers",
        queryFn: apiProvider.getAllUsers,
    });
};
