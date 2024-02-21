import { useQuery } from "react-query";
import { apiProvider } from "./api-provider";
import { Table, TableProps } from "antd";
import { IUser } from "@shared/types/auth/user.interface";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useGetAllUsersQuery } from "./use-get-all-users.query";

function Password(props: { text: string }) {
    const [hover, setHover] = useState(false);

    return (
        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ position: "relative" }}>
            <AnimatePresence>
                {hover ? (
                    <div style={{ position: "absolute", left: 0, top: -10 }}>
                        {Array.from(props.text).map((char, i) => (
                            <motion.span
                                key={i}
                                style={{ display: "inline-block" }}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -10, opacity: 0 }}
                                transition={{ duration: 0.2, delay: 0.025 * i }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </div>
                ) : (
                    <div style={{ position: "absolute", left: 0, top: -10 }}>
                        {Array.from({ length: props.text.length }, (_, i) => {
                            return (
                                <motion.span
                                    style={{ display: "inline-block" }}
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.2, delay: 0.025 * i }}
                                >
                                    *
                                </motion.span>
                            );
                        })}
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function AllUsers() {
    const getAllUsersQuery = useGetAllUsersQuery();

    const columns: TableProps<IUser>["columns"] = [
        { key: "id", title: "Id", dataIndex: "id", render: (value) => <p>{value}</p> },
        { key: "login", title: "Login", dataIndex: "login", render: (value) => <p>{value}</p> },
        { key: "password", title: "Password", dataIndex: "password", render: (value) => <Password text={value} /> },
        {},
    ];

    return (
        <div>
            <Table columns={columns} rowKey={(x) => x.id} dataSource={getAllUsersQuery.data ?? []} />
            {getAllUsersQuery.data?.map((u) => (
                <div>{JSON.stringify(u)}</div>
            ))}
        </div>
    );
}
