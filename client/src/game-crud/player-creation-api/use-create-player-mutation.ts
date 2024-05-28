import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiProvider } from "../../api-provider";
import { IPlayerCreate } from "@shared/types/game-crud/player-create.interface";
import { ReactQueryKey } from "../../react-query";

export const useCreatePlayerMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (player: IPlayerCreate) => apiProvider.features.gameCrud.createPlayer(player),
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: [ReactQueryKey.GetAllPlayers] });
        },
    });
};
