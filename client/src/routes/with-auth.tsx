import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { nav } from "../navigation/nav";
import { useProfileQuery } from "../auth/use-profile-query";
import { createPortal } from "react-dom";
import { Alert } from "antd";
import { AnimatePresence, motion } from "framer-motion";

export function WithAuth() {
    const profileQuery = useProfileQuery();
    const { state } = useLocation();
    const [showAlert, setShowAlert] = useState<boolean>(state?.alreadyLogged ?? false);
    const navigate = useNavigate();

    const timerId = useRef<number | undefined>(undefined);

    useEffect(() => {
        timerId.current = window.setTimeout(() => {
            setShowAlert(false);
        }, 1500);
        return () => {
            clearTimeout(timerId.current);
        };
    }, []);

    if (profileQuery.isLoading) return "Loading...";
    if (!profileQuery.data) {
        navigate(nav.auth.login);
        return null;
    }

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
                        <Alert message="Авторизация прошла успешно!" type="success" showIcon />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );

    return (
        <div>
            <Outlet />
            {portal}
        </div>
    );
}
