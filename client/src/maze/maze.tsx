import { useRef } from "react";
import css from "./maze.module.css";

export function Maze() {
    const ref = useRef<HTMLCanvasElement | null>(null);

    return <canvas className={css.canvas} ref={ref}></canvas>;
}
