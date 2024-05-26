import { useQuery } from "react-query";
import { ReactQueryKey } from "../../react-query";
import { apiProvider } from "../../api-provider";
import { closeNotification, createNotification } from "../../features/notifications/notifications";
import { IPlayer } from "@shared/types/game-crud/player.interface";
import { useRef } from "react";

export const useGetAllPlayersQuery = () => {
    const notificationId = useRef<string | null>(null);

    const q = useQuery<IPlayer[]>({
        queryKey: [ReactQueryKey.GetAllPlayers],
        queryFn: () => {
            return apiProvider.features.gameCrud.getAllPlayers();
        },
        behavior: {
            onFetch(context) {
                notificationId.current = createNotification({ message: "Обновление списка...", type: "neutral" });
            },
        },
        onSuccess() {
            if (notificationId.current) closeNotification(notificationId.current);
            notificationId.current = null;
        },
        onError(err) {
            console.log(err);
            createNotification({ message: "Не удалось загрузить список игроков", type: "danger" });
        },
    });

    return q;
};
