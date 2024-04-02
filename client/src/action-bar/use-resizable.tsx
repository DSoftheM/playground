import { PropsWithChildren, useRef, useState } from "react";
import styled from "styled-components";

type Props = {
    // onChange: (width: number) => void
};

// export function useResizable(props: Props) {
//     const ref = useRef<HTMLElement | null>(null);
//     return { ref: resizeRef };
// }

const Root = styled.div`
    display: flex;
    background-color: sienna;
    height: 200px;
`;
const Line = styled.div`
    width: 20px;
    background-color: peachpuff;
    cursor: ew-resize;
`;

export function Resizable(props: PropsWithChildren) {
    const isCapture = useRef(false);
    const [x, setX] = useState(0);

    const ref = useRef<HTMLDivElement | null>(null);

    return (
        <Root
            onMouseUp={() => {
                console.log("Отпустил");
            }}
        >
            <p>x = {x}</p>
            <div style={{ flex: 1 }}>{props.children}</div>
            <Line
                ref={ref}
                style={{ transform: `translateX(${x}px)` }}
                onMouseDown={() => {
                    console.log("Взял");
                    isCapture.current = true;
                }}
                onMouseMove={(e) => {
                    if (!isCapture.current) return;
                    if (!ref.current) return;
                    const x = e.clientX - ref.current.getBoundingClientRect().x;
                    setX(x);
                    console.log("Движение", e);
                }}
            />
        </Root>
    );
}
