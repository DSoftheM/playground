import { Alert } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { EventEmitter } from "events";

type Props = {};

export function Notifications(props: PropsWithChildren) {
    const [showAlert, setShowAlert] = useState(false);
    const timerId = useRef<number | undefined>(undefined);

    useEffect(() => {
        timerId.current = window.setTimeout(() => {
            setShowAlert(false);
        }, 1500);
        return () => {
            clearTimeout(timerId.current);
        };
    }, []);

    const portal = createPortal(
        <AnimatePresence>
            {showAlert && (
                <div style={{ position: "absolute", right: 10, bottom: 0 }}>
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: -10 }}
                        transition={{ ease: "easeInOut", duration: 0.2, type: "tween" }}
                        exit={{ opacity: 0 }}
                    >
                        {props.children}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
    return portal;
}
