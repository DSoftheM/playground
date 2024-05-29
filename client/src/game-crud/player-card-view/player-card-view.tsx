import { IPlayer } from "@shared/types/game-crud/player.interface";
import css from "./player-card-view.module.css";
import { Avatar } from "antd";
import { CloseOutlined, LoadingOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useDeletePlayerMutation } from "../player-creation-api/use-delete-player-mutation";
import { Link } from "react-router-dom";
import { nav } from "../../navigation/nav";

type PlayerCardViewProps = {
    player: IPlayer;
    // onClick: () => void
};

export const PlayerCardView = (props: PlayerCardViewProps) => {
    const deleteMutation = useDeletePlayerMutation();

    return (
        <Link to={nav.features.gameCrud.player.get(props.player.id)}>
            <motion.div className={css.card}>
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
