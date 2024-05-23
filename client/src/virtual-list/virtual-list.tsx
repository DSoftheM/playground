import { useState, useRef, useEffect } from "react";
import css from "./virtual-list.module.css";

export function VirtualList() {
    const { listRef, visibleIndexes, bottomIntersectionIndex, topIntersectionIndex } = useVirtualTable({
        length: cards.length,
        visibleCount: 10,
    });

    return (
        <>
            <p>topIntersectionIndex = {topIntersectionIndex}</p>
            <p>bottomIntersectionIndex = {bottomIntersectionIndex}</p>
            <div aria-placeholder="true" className={css.test}>
                css.test
            </div>
            <div>wdwd</div>
            <div ref={listRef} style={{ height: 340, background: "lime", overflow: "auto" }}>
                {visibleIndexes.map((index) => (
                    <Card text={cards[index]} />
                ))}
            </div>
        </>
    );
}

const cards = Array.from({ length: 100 }, (_, i) => "card " + i);

type Options = {
    visibleCount: number;
    length: number;
};

const useVirtualTable = (options: Options) => {
    const [visibleIndexes, setVisibleIndexes] = useState<number[]>(Array.from({ length: options.visibleCount }).map((_, i) => i));
    const [bottomIntersectionIndex, setBottomIntersectionIndex] = useState<number | null>(null);
    const [topIntersectionIndex, setTopIntersectionIndex] = useState<number | null>(null);

    const listRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!listRef.current) return;
        const children = Array.from(listRef.current.children);

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries.find((e) => e.intersectionRatio < 1);
                if (!entry) {
                    throw "no entry";
                }

                const index = children.indexOf(entry.target);
                if (!entry.isIntersecting) {
                    setTopIntersectionIndex(index);
                } else {
                    setBottomIntersectionIndex(index);
                }
            },
            { threshold: 0, root: listRef.current }
        );

        children.forEach((child) => {
            observer.observe(child);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    return { visibleIndexes, listRef, bottomIntersectionIndex, topIntersectionIndex };
};

function Card(props: { text: string }) {
    return <div style={{ height: 100, border: "1px solid #000" }}>props.text = {props.text}</div>;
}
