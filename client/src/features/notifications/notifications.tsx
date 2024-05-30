import { createNanoEvents } from "nanoevents";
import { PropsWithChildren, useEffect, useRef } from "react";
import { useImmer } from "use-immer";
import css from "./notifications.module.css";
import { uuid } from "../../lib/uuid";
import { AnimatePresence, motion } from "framer-motion";
import { zIndex } from "../../z-index";

export type Notification = {
    id: string;
    message: string;
    type?: "neutral" | "success" | "warning" | "danger";
    details?: string;
};

type NotificationViewProps = {
    notification: Notification;
};

const emitter = createNanoEvents();

type PartialField<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export const createNotification = (notification: PartialField<Notification, "id">) => {
    const id = notification.id ? notification.id : uuid();
    emitter.emit("notify", { ...notification, id });
    return id;
};

export const closeNotification = (id: string) => {
    emitter.emit("close notification", id);
};

export const useNotifications = () => {
    const [notifications, updateNotifications] = useImmer<Notification[]>([]);

    const removeNotification = (id: string) => {
        updateNotifications((draft) => {
            const index = draft.findIndex((x) => x.id == id);
            if (index === -1) return;
            draft.splice(index, 1);
        });
    };

    const timers = useRef<Record<string, number>>({});

    useEffect(() => {
        const unsubscribe1 = emitter.on("notify", (notification: Notification) => {
            updateNotifications((draft) => {
                draft.push(notification);
            });

            const timerId = window.setTimeout(() => {
                removeNotification(notification.id);
                delete timers.current[notification.id];
            }, 3_0000);
            timers.current[notification.id] = timerId;
        });

        const unsubscribe2 = emitter.on("close notification", (id) => {
            removeNotification(id);
            window.clearTimeout(timers.current[id]);
            delete timers.current[id];
        });

        return () => {
            unsubscribe1();
            unsubscribe2();
        };
    }, []);

    return { notifications };
};

export function NotificationView(props: NotificationViewProps) {
    const onDetailsClick = () => {
        const blob = new Blob([props.notification.details ?? ""]);

        const url = URL.createObjectURL(blob);
        window.open(url);
    };

    console.log(ArrayBuffer);

    return (
        <motion.div
            style={{ zIndex: zIndex.Notification }}
            key={props.notification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
        >
            <div className={css.notification} data-type={props.notification.type}>
                {props.notification.message}
                {Boolean(props.notification.details) && <p onClick={onDetailsClick}>Подробнее</p>}
            </div>
        </motion.div>
    );
}

export const NotificationsContainer = (props: PropsWithChildren) => {
    return (
        <div className={css.container}>
            <AnimatePresence>{props.children}</AnimatePresence>
        </div>
    );
};
