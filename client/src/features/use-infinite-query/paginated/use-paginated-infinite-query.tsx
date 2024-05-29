import { InfiniteData, QueryKey, useInfiniteQuery } from "@tanstack/react-query";
import { apiProvider } from "../../../api-provider";
import { Button, Flex } from "antd";
import { useState } from "react";
import { ReactQueryKey } from "../../../react-query";
import css from "./use-paginated-infinite-query.module.css";

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
        queryKey: [ReactQueryKey.UseInfiniteQueryPaginated],
        initialPageParam: {
            skip: 0,
            count: step,
        },

        getNextPageParam: (lastPage, allPages, lastPageParam, _allPageParams) => {
            const currentPage = allPages[page];
            const isLast = currentPage === lastPage;
            if (currentPage?.length < step && isLast) return null;

            return {
                count: lastPageParam.count,
                skip: lastPageParam.skip + lastPageParam.count,
            };
        },

        getPreviousPageParam: (firstPage, allPages, firstPageParam, _allPageParams) => {
            const currentPage = allPages[page];
            const isFirst = currentPage === firstPage;
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

export function UsePaginatedInfiniteQuery() {
    const [page, setPage] = useState(0);
    const infiniteQuery = useInfiniteTodos(23, page);

    if (!infiniteQuery.data) return "!data";

    return (
        <div>
            <Flex>
                <Button
                    onClick={() => {
                        if (!infiniteQuery.data.pages[page - 1]) {
                            infiniteQuery.fetchPreviousPage();
                        }
                        setPage(page - 1);
                    }}
                    disabled={page === 0 || !infiniteQuery.hasPreviousPage || infiniteQuery.isFetchingPreviousPage}
                    loading={infiniteQuery.isFetchingPreviousPage}
                >
                    Пред. страница
                </Button>
                <div className={css.page}>{page}</div>
                <Button
                    onClick={() => {
                        if (!infiniteQuery.data.pages[page + 1]) {
                            infiniteQuery.fetchNextPage();
                        }
                        setPage(page + 1);
                    }}
                    disabled={!infiniteQuery.hasNextPage || infiniteQuery.isFetchingNextPage}
                    loading={infiniteQuery.isFetchingNextPage}
                >
                    След. страница
                </Button>
            </Flex>
            <div>
                {infiniteQuery.data.pages[page]?.map((x) => (
                    <li key={x.id}>
                        {x.id} {x.title}
                    </li>
                ))}
            </div>
        </div>
    );
}
