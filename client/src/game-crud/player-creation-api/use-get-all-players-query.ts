import { useQuery } from "@tanstack/react-query";
import { ReactQueryKey } from "../../react-query";
import { apiProvider } from "../../api-provider";
import { closeNotification, createNotification } from "../../features/notifications/notifications";
import { IPlayer } from "@shared/types/game-crud/player.interface";
import { useRef } from "react";

export const useGetAllPlayersQuery = () => {
    const notificationId = useRef<string | null>(null);

    const close = () => {
        if (notificationId.current) closeNotification(notificationId.current);
        notificationId.current = null;
    };

    const q = useQuery<IPlayer[]>({
        queryKey: [ReactQueryKey.GetAllPlayers],
        queryFn: () => {
            return apiProvider.features.gameCrud
                .getAllPlayers()
                .then((data) => {
                    close();
                    return data;
                })
                .catch((err) => {
                    close();
                    createNotification({ message: "Не удалось загрузить список игроков", type: "danger" });
                    throw err;
                });
        },
        behavior: {
            onFetch(context) {
                notificationId.current = createNotification({ message: "Обновление списка...", type: "neutral" });
            },
        },
    });

    return q;
};
