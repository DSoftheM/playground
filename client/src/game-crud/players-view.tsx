import { LoadingOutlined } from "@ant-design/icons";
import { useGetAllPlayersQuery } from "./player-creation-api/use-get-all-players-query";
import { Spin, Typography } from "antd";
import { PlayerCardView } from "./player-card-view/player-card-view";
import { usePlayerId } from "../navigation/nav";
import { createPortal } from "react-dom";
import { PlayerModal } from "./player-modal/player-modal";

export function PlayersView() {
    const getPlayersQuery = useGetAllPlayersQuery();
    const { playerId } = usePlayerId();

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
        <>
            <div>{playerId && <>{createPortal(<PlayerModal key="PlayerModal" />, document.body)}</>}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {getPlayersQuery.data?.map((player) => (
                    <PlayerCardView player={player} key={player.id} />
                ))}

                {!getPlayersQuery.data?.length && <Typography.Title type="secondary">Нет игроков</Typography.Title>}
            </div>
        </>
    );
}
