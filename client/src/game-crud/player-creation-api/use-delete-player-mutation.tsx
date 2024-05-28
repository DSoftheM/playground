import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReactQueryKey } from "../../react-query";
import { apiProvider } from "../../api-provider";

export function useDeletePlayerMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (playerId: string) => {
            return apiProvider.features.gameCrud.deletePlayer(playerId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [ReactQueryKey.GetAllPlayers] });
        },
    });
}
