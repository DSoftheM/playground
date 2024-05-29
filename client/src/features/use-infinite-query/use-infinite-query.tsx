import { InfiniteData, QueryKey, useInfiniteQuery } from "@tanstack/react-query";
import { Button, Flex, Space, Tabs } from "antd";
import { useState } from "react";
import css from "./use-infinite-query.module.css";
import { UsePaginatedInfiniteQuery } from "./paginated/use-paginated-infinite-query";
import { ReactQueryKey } from "../../react-query";
import { apiProvider } from "../../api-provider";
import { UseListInfiniteQuery } from "./list/use-list-infinite-query";

type Todo = {
    id: string;
    title: string;
};

type Params = {
    skip: number;
    count: number;
};

const useInfiniteTodos = (step: number, page: number) => {
    return useInfiniteQuery<Todo[], Error, InfiniteData<Todo[], Params>, QueryKey, Params>({
        queryKey: [ReactQueryKey.UseInfiniteQuery],
        initialPageParam: {
            skip: 0,
            count: step,
        },

        getNextPageParam: (_lastPage, allPages, lastPageParam, _allPageParams) => {
            const currentPage = allPages[page];
            const isLast = allPages.indexOf(currentPage) === allPages.length - 1;
            if (currentPage?.length < step && isLast) return null;

            return {
                count: lastPageParam.count,
                skip: lastPageParam.skip + lastPageParam.count,
            };
        },

        getPreviousPageParam: (_firstPage, allPages, firstPageParam, _allPageParams) => {
            const currentPage = allPages[page];
            const isFirst = allPages.indexOf(currentPage) === 0;
            if (currentPage?.length < step && isFirst) return null;

            return {
                count: firstPageParam.count,
                skip: firstPageParam.skip - firstPageParam.count,
            };
        },

        queryFn: (context) => {
            return apiProvider.features.jsonPlaceholder.todos({
                count: context.pageParam.count,
                skip: context.pageParam.skip,
            });
        },
    });
};

export function UseInfiniteQuery() {
    const [page, setPage] = useState(0);
    const infiniteQuery = useInfiniteTodos(23, page);

    if (!infiniteQuery.data) return "!data";

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
