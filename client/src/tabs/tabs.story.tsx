import { useState } from "react";
import { Button, Tabs as AntTabs } from "antd";
import { Tabs } from "./tabs";

function getRandomInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function TabsStory() {
    const [hiddenIndexes, setHiddenIndexes] = useState<number[]>([]);

    return (
        <div>
            <Button
                onClick={() => setHiddenIndexes(Array.from({ length: getRandomInRange(2, 6) }).map(() => getRandomInRange(0, 8)))}
            >
                Изменить количество табов
            </Button>
            <div style={{ overflow: "auto", display: "flex", padding: 15, gap: 12, border: "1px solid #000", width: 200 }}>
                <p>Text</p>
                <p>Text</p>
                <p>Text</p>
                <p>Text</p>
                <p>Text</p>
                <p>Text</p>
                <p>Text</p>
            </div>
            <p style={{ margin: "20px 0" }}>hiddenIndexes = {JSON.stringify(hiddenIndexes)}</p>
            <Tabs
                items={[
                    { key: "0", children: "Content 1", label: "Tab 0" },
                    { key: "1", children: "Content 1", label: "Tab 1" },
                    { key: "2", children: "Content 2", label: "Tab 2" },
                    { key: "3", children: "Content 3", label: "Tab 3" },
                    { key: "4", children: "Content 4", label: "Tab 4" },
                    { key: "5", children: "Content 5", label: "Tab 5" },
                    { key: "6", children: "Content 6", label: "Tab 6" },
                    { key: "7", children: "Content 7", label: "Tab 7" },
                    { key: "8", children: "Content 8", label: "Tab 8" },
                    { key: "9", children: "Content 9", label: "Tab 9" },
                ].filter((_, i) => !hiddenIndexes.includes(i))}
            />
            <hr />
            <AntTabs
                items={[
                    { key: "0", children: "Content 1", label: "Tab 0" },
                    { key: "1", children: "Content 1", label: "Tab 1" },
                    { key: "2", children: "Content 2", label: "Tab 2" },
                    { key: "3", children: "Content 3", label: "Tab 3" },
                    { key: "4", children: "Content 4", label: "Tab 4" },
                    { key: "5", children: "Content 5", label: "Tab 5" },
                    { key: "6", children: "Content 6", label: "Tab 6" },
                    { key: "7", children: "Content 7", label: "Tab 7" },
                    { key: "8", children: "Content 8", label: "Tab 8" },
                    { key: "9", children: "Content 9", label: "Tab 9" },
                ].filter((_, i) => !hiddenIndexes.includes(i))}
            />
        </div>
    );
}
