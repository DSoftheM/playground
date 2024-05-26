import { Tabs } from "antd";
import { PlayerCreation } from "./player-creation";
import { PlayersView } from "./players-view";

export function GameCrud() {
    return (
        <>
            <Tabs
                items={[
                    { key: "1", label: "Создать игрока", children: <PlayerCreation /> },
                    { key: "2", label: "Список игроков", children: <PlayersView /> },
                ]}
            />
        </>
    );
}
