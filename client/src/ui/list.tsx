import { PropsWithChildren } from "react";

type ListProps = {
    onScrollEnd?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

export function List(props: PropsWithChildren<ListProps>) {
    const { onScrollEnd, onScroll, ...attrs } = props;

    return (
        <div
            {...attrs}
            onScroll={(e) => {
                const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
                if (scrollHeight - scrollTop === clientHeight) {
                    onScrollEnd?.();
                }
                onScroll?.(e);
            }}
        >
            {props.children}
        </div>
    );
}
