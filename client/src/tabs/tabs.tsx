import { ReactNode, useEffect, useRef, useState } from "react";
import css from "./tabs.module.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export function Tabs() {
    return (
        <div style={{ width: 300, overflow: "auto" }}>
            <_Tabs
                items={[
                    { key: "1", children: "Content 1", label: "Tab 1" },
                    { key: "2", children: "Content 2", label: "Tab 2" },
                    { key: "3", children: "Content 3", label: "Tab 3" },
                    { key: "4", children: "Content 4", label: "Tab 4" },
                    { key: "5", children: "Content 5", label: "Tab 5" },
                    { key: "6", children: "Content 6", label: "Tab 6" },
                    { key: "7", children: "Content 7", label: "Tab 7" },
                    { key: "8", children: "Content 8", label: "Tab 8" },
                    { key: "9", children: "Content 9", label: "Tab 9" },
                ]}
            />
        </div>
    );
}

type TabItem = {
    key: string;
    label: string;
    children: ReactNode;
};

type Props = {
    items: TabItem[];
};

const _Tabs = (props: Props) => {
    const [selectedKey, setSelectedKey] = useState<string | null>(null);

    const [displayStartScroll, setDisplayStartScroll] = useState(false);
    const [displayEndScroll, setDisplayEndScroll] = useState(false);
    const tabsRef = useRef<HTMLDivElement | null>(null);
    const tabListRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const tabListChildren = Array.from(tabListRef.current?.children ?? []);
        const length = tabListChildren.length;

        if (length === 0) return;

        const firstTab = tabListChildren[0];
        const lastTab = tabListChildren[length - 1];
        const observerOptions = {
            root: tabsRef.current,
            threshold: 0.99,
        };

        const firstObserver = new IntersectionObserver((entries) => {
            setDisplayStartScroll(!entries[0].isIntersecting);
        }, observerOptions);
        firstObserver.observe(firstTab);

        const lastObserver = new IntersectionObserver((entries) => {
            setDisplayEndScroll(!entries[0].isIntersecting);
        }, observerOptions);
        lastObserver.observe(lastTab);

        return () => {
            firstObserver.disconnect();
            lastObserver.disconnect();
        };
    }, []);

    const renderContent = () => {
        if (!selectedKey) return;

        return props.items.find((item) => item.key === selectedKey)?.children;
    };

    return (
        <div>
            <div ref={tabsRef} className={css.root}>
                <div className={css.wrapper}>
                    {displayStartScroll && <LeftOutlined className={css.arrow} data-direction="left" />}
                    {displayEndScroll && <RightOutlined className={css.arrow} data-direction="right" />}

                    <div className={css.tabsRoot} ref={tabListRef}>
                        {props.items.map((item) => (
                            <div
                                key={item.key}
                                data-selected={selectedKey === item.key}
                                className={css.tab}
                                onClick={() => setSelectedKey(item.key)}
                            >
                                {item.label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div>{renderContent()}</div>
            {/* <div style={{ display: "flex", overflow: "hidden" }}>
                <div style={{ whiteSpace: "nowrap" }}>Lorem ipsum dolor </div>
                <div style={{ whiteSpace: "nowrap" }}>Lorem ipsum dolor </div>
                <div style={{ whiteSpace: "nowrap" }}>Lorem ipsum dolor </div>
                <div style={{ whiteSpace: "nowrap" }}>Lorem ipsum dolor </div>
            </div> */}
        </div>
    );
};
