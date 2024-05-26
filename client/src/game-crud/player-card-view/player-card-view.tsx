import { IPlayer } from "@shared/types/game-crud/player.interface";
import css from "./player-card-view.module.css";
import { Avatar } from "antd";
import { CloseOutlined, LoadingOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useDeletePlayerMutation } from "../player-creation-api/use-delete-player-mutation";

type PlayerCardViewProps = {
    player: IPlayer;
};

export const PlayerCardView = (props: PlayerCardViewProps) => {
    const deleteMutation = useDeletePlayerMutation();

    return (
        <motion.div className={css.card}>
            <Avatar />
            <p>{props.player.name}</p>

            {deleteMutation.isLoading ? (
                <LoadingOutlined />
            ) : (
                <CloseOutlined onClick={() => deleteMutation.mutate(props.player.id)} />
            )}
        </motion.div>
    );
};
