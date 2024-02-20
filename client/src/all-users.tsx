import { useQuery } from "react-query";
import { apiProvider } from "./api-provider";

type Props = {};

export function AllUsers(props: Props) {
    const getAllUsersQuery = useQuery({
        queryKey: "getAllUsers",
        queryFn: apiProvider.getAllUsers,
    });

    return (
        <div>
            {getAllUsersQuery.data?.map((u) => (
                <div>{JSON.stringify(u)}</div>
            ))}
        </div>
    );
}
