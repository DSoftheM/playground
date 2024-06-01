import { InfiniteData, QueryKey, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { apiProvider } from "../../../api-provider";
import { ReactQueryKey } from "../../../react-query";
import { List } from "../../../ui/list";
import { Button } from "antd";

type Todo = {
    id: string;
    title: string;
};

type Params = {
    skip: number;
    count: number;
};

const useInfiniteTodos = (step: number) => {
    return useInfiniteQuery<Todo[], Error, InfiniteData<Todo[], Params>, QueryKey, Params>({
        queryKey: [ReactQueryKey.UseInfiniteQueryList],
        initialPageParam: {
            skip: 0,
            count: step,
        },

        getNextPageParam: (_lastPage, _allPages, lastPageParam, _allPageParams) => {
            if (_lastPage.length < lastPageParam.count) return null;
            return {
                count: lastPageParam.count,
                skip: lastPageParam.skip + lastPageParam.count,
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

export function UseListInfiniteQuery() {
    const infiniteQuery = useInfiniteTodos(23);
    const queryClient = useQueryClient();

    if (!infiniteQuery.data) return "!data";

    return (
        <div>
            <Button onClick={() => queryClient.invalidateQueries({ queryKey: [ReactQueryKey.UseInfiniteQueryList] })}>
                Сбросить список (не работает - нужно сбросить скролл)
            </Button>
            <List
                style={{ height: 200, overflow: "auto" }}
                onScrollEnd={() => {
                    if (!infiniteQuery.isFetching && infiniteQuery.hasNextPage) {
                        infiniteQuery.fetchNextPage();
                    }
                }}
            >
                {infiniteQuery.data.pages.flatMap((page) => {
                    return page.map((x) => {
                        return (
                            <li key={x.id}>
                                {x.id} {x.title}
                            </li>
                        );
                    });
                })}
            </List>
        </div>
    );
}
