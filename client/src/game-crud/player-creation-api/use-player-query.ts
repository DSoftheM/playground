import { useQuery } from "@tanstack/react-query";
import { ReactQueryKey } from "../../react-query";
import { apiProvider } from "../../api-provider";
import { IPlayer } from "@shared/types/game-crud/player.interface";

export const usePlayerQuery = (id: string) => {
    return useQuery<IPlayer>({
        queryKey: [ReactQueryKey.GetPlayer],
        queryFn: async () => {
            return apiProvider.features.gameCrud.getPlayer(id).catch((err) => {
                console.error(err);
                throw new Error("Не удалось загрузить информацию об игроке");
            });
        },
    });
};
