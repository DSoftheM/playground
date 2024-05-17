import { ReactNode, useEffect, useRef, useState } from "react";
import css from "./tabs.module.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

type TabItem = {
    key: string;
    label: string;
    children: ReactNode;
};

type Props = {
    items: TabItem[];
};

export const Tabs = (props: Props) => {
    const [selectedKey, setSelectedKey] = useState<string | null>(null);

    const [displayStartScroll, setDisplayStartScroll] = useState(false);
    const [displayEndScroll, setDisplayEndScroll] = useState(false);
    const tabsRef = useRef<HTMLDivElement | null>(null);
    const tabListRef = useRef<HTMLDivElement | null>(null);

    const firstKey = props.items.at(0)?.key ?? "";
    const lastKey = props.items.at(-1)?.key ?? "";

    useEffect(() => {
        const tabListChildren = Array.from(tabListRef.current?.children ?? []);
        const length = tabListChildren.length;

        if (length === 0) return;

        const firstTab = tabListChildren[0];
        const lastTab = tabListChildren[length - 1];
        const observerOptions = {
            root: tabsRef.current,
            threshold: 1,
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
    }, [firstKey, lastKey]);

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
        </div>
    );
};
