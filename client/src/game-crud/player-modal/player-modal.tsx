import { motion } from "framer-motion";
import css from "./player-modal.module.css";
import { useOutsideClick } from "../../hooks/use-on-click-outside";
import { useNavigate } from "react-router-dom";
import { nav, usePlayerId } from "../../navigation/nav";
import { usePlayerQuery } from "../player-creation-api/use-player-query";
import { Skeleton, Typography } from "antd";

export function PlayerModal() {
    const navigate = useNavigate();
    const close = () => navigate(nav.features.gameCrud.root);
    const ref = useOutsideClick(close);
    const { playerId } = usePlayerId();
    const playerQuery = usePlayerQuery(playerId);

    const renderContent = () => {
        if (playerQuery.isLoading) return <Skeleton />;

        return (
            <>
                <Typography.Title className={css.title}>lorem dfa werfwe f</Typography.Title>
                <img
                    className={css.avatar}
                    src="https://i0.wp.com/picjumbo.com/wp-content/uploads/camping-on-top-of-the-mountain-during-sunset-free-photo.jpg?w=600&quality=80"
                />
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum praesentium sint dolorum quibusdam, illo
                    voluptas reiciendis vero recusandae explicabo similique. Esse nostrum illum fuga, fugiat temporibus quidem
                    nulla velit autem.psum dolor, sit amet consectetur adipisicing elit. Eum praesentium sint dolorum quibusdam,
                    illo voluptas reiciendis vero recusandae explicabo similique. Esse nostrum illum fuga, fugiat temporibus
                    quidem nulla velit autem.psum dolor, sit amet consectetur adipisicing elit. Eum praesentium sint dolorum
                    quibusdam, illo voluptas reiciendis vero recusandae explicabo similique. Esse nostrum illum fuga, fugiat
                    temporibus quidem nulla velit autem.psum dolor, sit amet consectetur adipisicing elit. Eum praesentium sint
                    dolorum quibusdam, illo voluptas reiciendis vero recusandae explicabo similique. Esse nostrum illum fuga,
                    fugiat temporibus quidem nulla velit autem.psum dolor, sit amet consectetur adipisicing elit. Eum praesentium
                    sint dolorum quibusdam, illo voluptas reiciendis vero recusandae explicabo similique. Esse nostrum illum fuga,
                    fugiat temporibus quidem nulla velit autem.psum dolor, sit amet consectetur adipisicing elit. Eum praesentium
                    sint dolorum quibusdam, illo voluptas reiciendis vero recusandae explicabo similique. Esse nostrum illum fuga,
                    fugiat temporibus quidem nulla velit autem.psum dolor, sit amet consectetur adipisicing elit. Eum praesentium
                    sint dolorum quibusdam, illo voluptas reiciendis vero recusandae explicabo similique. Esse nostrum illum fuga,
                    fugiat temporibus quidem nulla velit autem.psum dolor, sit amet consectetur adipisicing elit. Eum praesentium
                    sint dolorum quibusdam, illo voluptas reiciendis vero recusandae explicabo similique. Esse nostrum illum fuga,
                    fugiat temporibus quidem nulla velit autem.psum dolor, sit amet consectetur adipisicing elit. Eum praesentium
                    sint dolorum quibusdam, illo voluptas reiciendis vero recusandae explicabo similique. Esse nostrum illum fuga,
                    fugiat temporibus quidem nulla velit autem.psum dolor, sit amet consectetur adipisicing elit. Eum praesentium
                    sint dolorum quibusdam, illo voluptas reiciendis vero recusandae explicabo similique. Esse nostrum illum fuga,
                    fugiat temporibus quidem nulla velit autem.
                </p>
            </>
        );
    };

    return (
        <motion.div className={css.root} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div initial={{ scale: 0.3 }} animate={{ scale: 1 }} ref={ref} className={css.modal}>
                {renderContent()}
            </motion.div>
        </motion.div>
    );
}
