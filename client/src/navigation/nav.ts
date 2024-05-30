import { useParams } from "react-router-dom";

export const nav = {
    main: "/",
    catsCreation: "/catsCreation",
    auth: {
        register: "/register",
        login: "/login",
    },
    allUsers: "/allUsers",
    editor: "/editor",
    profile: "/profile",
    actionBar: "/actionBar",
    tabs: "/tabs",
    cloud: "/cloud",
    maze: "/maze",
    virtualList: "/virtual-list",
    mediaViewer: "/media-viewer",
    todoList: "/todo-list",
    features: {
        useInfiniteQuery: "/use-infinite-query",
        gameCrud: {
            root: "/gameCrud",
            player: {
                get: (id: string) => `/gameCrud/${id}`,
                pattern: `/gameCrud/:playerId`,
            },
        },
    },
} as const;

export const usePlayerId = () => {
    return useParams() as { playerId: string };
};
