import { LoadingOutlined } from "@ant-design/icons";
import { useGetAllPlayersQuery } from "./player-creation-api/use-get-all-players-query";
import { Spin, Typography } from "antd";
import { PlayerCardView } from "./player-card-view/player-card-view";

export function PlayersView() {
    const getPlayersQuery = useGetAllPlayersQuery();

    if (getPlayersQuery.isLoading) return <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />;
    if (getPlayersQuery.isError)
        return (
            <Typography.Text type="danger">
                Произошла ошибка. Попробуйте{" "}
                <Typography.Link underline onClick={() => getPlayersQuery.refetch()}>
                    обновить
                </Typography.Link>
            </Typography.Text>
        );

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {getPlayersQuery.data?.map((player) => (
                <PlayerCardView player={player} key={player.id} />
            ))}
        </div>
    );
}
