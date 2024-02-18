import { useEffect, useRef } from "react";

export function PerlinNoise() {
    const canvas = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {}, []);

    return (
        <div>
            <canvas ref={canvas} width={200} height={200} style={{ backgroundColor: "slateblue" }}></canvas>
        </div>
    );
}
