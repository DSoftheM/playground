import { RefObject, useEffect } from "react";

type Options = {
    itemsRef: RefObject<HTMLDivElement>;
    containerRef: RefObject<HTMLDivElement>;
    firstKey: string;
    lastKey: string;
};

export const useTabsDebug = ({ itemsRef, containerRef, firstKey, lastKey }: Options) => {
    useEffect(() => {
        const tabListChildren = Array.from(itemsRef.current?.children ?? []);
        const length = tabListChildren.length;

        if (length === 0 || !containerRef.current) return;

        const first = tabListChildren[0] as HTMLElement;
        const last = tabListChildren[length - 1] as HTMLElement;

        first.style.background = "#5975ff";
        last.style.background = "#5975ff";
        containerRef.current.style.background = "#e7bd8c";

        return () => {
            if (!containerRef.current) return;
            first.style.background = "";
            last.style.background = "";
            containerRef.current.style.background = "";
        };
    }, [firstKey, lastKey]);
};
