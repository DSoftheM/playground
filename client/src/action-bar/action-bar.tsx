import { Button, Card, Typography } from "antd";
import * as S from "./action-bar.styled";
import { ReactNode, useEffect, useRef, useState } from "react";
import { SmallDashOutlined } from "@ant-design/icons";
import { usePopover } from "./use-popover";
import { Paper } from "./paper";

const actions = Array.from({ length: 10 }, (_, i) => `Item ${i}`);

type Action = {
    el: HTMLElement;
    index: number;
};

export function ActionBar() {
    const [intersectionIndex, setIntersectionIndex] = useState<number | null>(null);
    const actionsRef = useRef<Action[]>([]);
    const scopeRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!actionsRef.current) return;
        if (!scopeRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                console.log(entries.map((e) => e.intersectionRatio));
                const lastIntersectingItem = entries.find((e) => e.intersectionRatio < 1);
                const hisIndex = actionsRef.current.find((a) => a.el === lastIntersectingItem?.target)?.index ?? null;
                if (hisIndex === null) {
                    setIntersectionIndex((prev) => (prev ?? -1) + 1);
                } else {
                    setIntersectionIndex(hisIndex);
                }
            },
            { root: scopeRef.current, threshold: [1] }
        );

        actionsRef.current.forEach(({ el }) => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const visibleActions = actions.slice(0, intersectionIndex ?? undefined);
    const invisibleActions = intersectionIndex === null ? [] : actions.slice(intersectionIndex);

    const popover = usePopover({
        renderContent: () => {
            if (!invisibleActions.length) return;
            return (
                <Paper indent={5}>
                    {invisibleActions.map((a) => (
                        <p key={a} style={{ cursor: "pointer" }} onClick={() => alert(a)}>
                            <Typography.Text>{a}</Typography.Text>
                        </p>
                    ))}
                </Paper>
            );
        },
    });

    return (
        <S.Resize ref={scopeRef} style={{ width: 500 }}>
            <p style={{ color: "wheat" }}>intersectionIndex = {intersectionIndex}</p>
            <S.ButtonGroup
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    transform: "translateX(54px)",
                    visibility: "hidden",
                    backgroundColor: "orange",
                }}
            >
                {actions.map((a, i) => (
                    <Button
                        ref={(el) => el && actionsRef.current.push({ el, index: i })}
                        key={a}
                        type={i === intersectionIndex ? "primary" : "dashed"}
                        onClick={() => {}}
                        color="red"
                    >
                        {a}
                    </Button>
                ))}
            </S.ButtonGroup>
            <S.ButtonGroup>
                {visibleActions.map((a, i) => (
                    <Button key={a} type={i === intersectionIndex ? "primary" : "dashed"} color="red" onClick={() => alert(a)}>
                        {a}
                    </Button>
                ))}
                {invisibleActions.length > 0 && (
                    <div>
                        <Button
                            ref={popover.ref}
                            type="primary"
                            icon={<SmallDashOutlined />}
                            size={"middle"}
                            onClick={popover.toggle}
                        />
                    </div>
                )}
                {popover.renderPopover()}
            </S.ButtonGroup>
        </S.Resize>
    );
}
