import { Button, Card, Typography } from "antd";
import * as S from "./action-bar.styled";
import { ReactNode, useEffect, useRef, useState } from "react";
import { SmallDashOutlined } from "@ant-design/icons";
import { usePopover } from "./use-popover";
import { Paper } from "./paper";

const actions = Array.from({ length: 10 }, (_, i) => `Item ${i}`);

export function ActionBar() {
    const [intersectionIndex, setIntersectionIndex] = useState<number | null>(null);
    const actionsRef = useRef<HTMLDivElement | null>(null);
    const scopeRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!actionsRef.current) return;
        if (!scopeRef.current) return;

        const buttons = Array.from(actionsRef.current.children);
        buttons.forEach((btn, btnIndex) => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        const { isIntersecting } = entry;
                        console.log(isIntersecting);
                        if (!isIntersecting) {
                            setIntersectionIndex(btnIndex);
                        } else {
                            // console.log(intersectionIndex, btnIndex);
                            if ((intersectionIndex ?? -1) < btnIndex) {
                                setIntersectionIndex(btnIndex + 1);
                            }
                        }
                    });
                },
                { root: scopeRef.current, threshold: 1 }
            );
            observer.observe(btn);
        });
    }, []);

    const visibleActions = actions.slice(0, intersectionIndex ?? undefined);
    const invisibleActions = intersectionIndex === null ? [] : actions.slice(intersectionIndex);

    const popover = usePopover({
        renderContent: () => {
            if (!invisibleActions.length) return;
            return (
                <Paper indent={5}>
                    {invisibleActions.map((a) => (
                        <p style={{ cursor: "pointer" }} onClick={() => alert(a)}>
                            <Typography.Text>{a}</Typography.Text>
                        </p>
                    ))}
                </Paper>
            );
        },
    });

    return (
        <S.Resize ref={scopeRef}>
            <p>intersectionIndex = {intersectionIndex}</p>
            <S.ButtonGroup
                ref={actionsRef}
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
                    <Button key={a} type={i === intersectionIndex ? "primary" : "dashed"} onClick={() => {}} color="red">
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
                            // style={{ width: 32 }}
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
