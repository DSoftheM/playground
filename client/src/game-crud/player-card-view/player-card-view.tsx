import { IPlayer } from "@shared/types/game-crud/player.interface";
import css from "./player-card-view.module.css";
import { Avatar } from "antd";
import { CloseOutlined, LoadingOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useDeletePlayerMutation } from "../player-creation-api/use-delete-player-mutation";
import { Link } from "react-router-dom";
import { nav, usePlayerId } from "../../navigation/nav";

type PlayerCardViewProps = {
    player: IPlayer;
    // onClick: () => void
};

export const PlayerCardView = (props: PlayerCardViewProps) => {
    const deleteMutation = useDeletePlayerMutation();
    const { playerId } = usePlayerId();

    return (
        <Link to={nav.features.gameCrud.player.get(props.player.id)}>
            <motion.div className={css.card} data-selected={playerId === props.player.id}>
                <Avatar />
                <p>{props.player.name}</p>

                {deleteMutation.isPending ? (
                    <LoadingOutlined />
                ) : (
                    <CloseOutlined onClick={() => deleteMutation.mutate(props.player.id)} />
                )}
            </motion.div>
        </Link>
    );
};
