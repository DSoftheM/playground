import { useQuery } from "react-query";
import { apiProvider } from "../api-provider";
import css from "./media-viewer.module.css";
import { getPath } from "../lib/image";
import { Avatar, Button, Checkbox, Typography } from "antd";
import { ButtonGroup } from "../action-bar/action-bar.styled";
import { useImmer } from "use-immer";

const imageUrl = getPath("/static/image/composition.webp");

export function MediaViewer() {
    const streamPdfQuery = useQuery({
        queryKey: ["streamPdfQuery"],
        queryFn: () => apiProvider.features.mediaViewer.getSamplePdf("stream"),
    });
    const linkPdfQuery = useQuery({
        queryKey: ["linkPdfQuery"],
        queryFn: () => apiProvider.features.mediaViewer.getSamplePdf("link"),
    });

    const imageQuery = useQuery({
        queryKey: ["imageQuery"],
        queryFn: () => apiProvider.features.mediaViewer.getBinaryImage(imageUrl),
    });

    const [features, updateFeatures] = useImmer({ popup: false });

    const onDownload = (type: "attachment" | "inline") => {
        window.open(`${imageUrl}?type=${type}`, undefined, [features.popup && "popup"].filter(Boolean).join(""));
    };

    return (
        <>
            <div className={css.inline}>
                <Avatar size={{ xxl: 100 }} src={imageUrl} />
                <Typography.Text>{imageUrl}</Typography.Text>
            </div>
            <Checkbox
                checked={features.popup}
                onChange={(ev) => {
                    updateFeatures((draft) => {
                        draft.popup = ev.target.checked;
                    });
                }}
            >
                Popup
            </Checkbox>
            <ButtonGroup style={{ margin: "20px 0" }}>
                <Button onClick={() => onDownload("attachment")}>Скачать картинку</Button>
                <Button onClick={() => onDownload("inline")}>Открыть в новой вкладке</Button>
                <Button
                    disabled={streamPdfQuery.isLoading}
                    onClick={() => {
                        const url = URL.createObjectURL(new Blob([streamPdfQuery.data], { type: "application/pdf" }));
                        window.open(url);
                    }}
                >
                    URL PDF
                </Button>
            </ButtonGroup>
            <div className={css.root}>
                {/* 
                https://doka.guide/html/area/
                https://doka.guide/html/object/
                https://doka.guide/html/embed/
                */}
                <div className={css.side}>
                    <h1 className={css.title}>Тег embed</h1>
                    <embed className={css.viewer} src={getPath(linkPdfQuery.data ?? "")} type="application/pdf" />
                </div>
                <div className={css.side}>
                    <h1 className={css.title}>Тег object</h1>
                    <object className={css.viewer} data={getPath(linkPdfQuery.data ?? "")} type="application/pdf"></object>
                </div>
            </div>
        </>
    );
}
