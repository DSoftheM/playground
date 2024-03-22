import { ReactNode, useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

type UsePopoverProps = {
    renderContent: () => ReactNode;
};

const Container = styled.div<{ $x: number; $y: number }>`
    position: absolute;
    left: ${(props) => props.$x + "px"};
    top: ${(props) => props.$y + "px"};
`;

export function usePopover(props: UsePopoverProps) {
    const ref = useRef<HTMLElement | null>(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {}, []);

    const renderPopover = () => {
        if (!open) return;
        if (!ref.current) return;

        const coords = ref.current.getBoundingClientRect();
        console.log("coords :>> ", coords);
        const x = coords.right - coords.width * 1.5;
        const y = coords.bottom;

        const portal = createPortal(
            <Container $x={x} $y={y}>
                {props.renderContent()}
            </Container>,
            document.body
        );

        return portal;
    };

    return { ref, renderPopover, toggle: () => setOpen(!open) };
}
