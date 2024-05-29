import { Tabs } from "antd";
import { UsePaginatedInfiniteQuery } from "./paginated/use-paginated-infinite-query";
import { UseListInfiniteQuery } from "./list/use-list-infinite-query";

export type Todo = {
    id: string;
    title: string;
};

export function UseInfiniteQuery() {
    return (
        <div>
            <Tabs
                items={[
                    { key: "1", children: <UsePaginatedInfiniteQuery />, label: "Paginated" },
                    { key: "2", children: <UseListInfiniteQuery />, label: "List" },
                ]}
            />
        </div>
    );
}
