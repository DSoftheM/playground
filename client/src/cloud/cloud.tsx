import { useEffect, useState } from "react";
import { cloudText } from "./cloud-text";
import { sortWords } from "./cloud.lib";
import css from "./cloud.module.css";
import { Button } from "antd";

export function Cloud() {
    // const sortedWords = sortWords(cloudText);
    const [words, setWords] = useState<string[]>([]);

    useEffect(() => {
        fetch("https://fish-text.ru/get?format=json&number=500")
            .then((res) => res.json())
            .then((res) => {
                setWords(sortWords(res.text));
            });
    }, []);

    console.log(1);

    return (
        <div>
            <Button
                onClick={() => {
                    fetch("https://fish-text.ru/get?format=json&number=500")
                        .then((res) => res.json())
                        .then((res) => {
                            setWords(sortWords(res.text));
                        });
                }}
            >
                Случайный текст
            </Button>
            <div className={css.root}>
                {words.map((word, i) => {
                    const middle = words.length / 2;
                    const coefficient = 1 - Math.abs((middle - i) / middle);
                    return (
                        <div
                            key={word}
                            className={css.word}
                            style={{
                                // opacity: coefficient + 0.2,
                                fontSize: coefficient * 32 + 4,
                                ...getStyle(coefficient),
                            }}
                        >
                            {word}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

const getStyle = (coefficient: number) => {
    if (coefficient > 0.98) return { backgroundColor: "lime" };
    if (coefficient < 0.1) return { backgroundColor: "red", fontSize: 12, opacity: 0.8, color: "white" };
    return undefined;
};
