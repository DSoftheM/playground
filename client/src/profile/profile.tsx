import { Button, Upload, UploadFile } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { apiProvider } from "../api-provider";
import { useState } from "react";
import { QueryKey } from "../query-key";

function useUploadAvatarMutation() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (file: UploadFile) => {
            const formData = new FormData();
            formData.append("file", file.originFileObj as Blob);
            return apiProvider.profile.uploadAvatar(formData);
        },
        onSuccess: () => {
            qc.invalidateQueries(QueryKey.Profile);
        },
    });
}

export function Profile() {
    const [avatar, setAvatar] = useState<UploadFile | null>(null);

    const uploadAvatarMutation = useUploadAvatarMutation();

    return (
        <div>
            <Upload
                customRequest={({ file, onSuccess }) => onSuccess?.("ok")}
                listType="picture-circle"
                onChange={(data) => setAvatar(data.file)}
                maxCount={1}
                hasControlInside={false}
            >
                <Button type="link">Upload</Button>
            </Upload>
            <button onClick={() => avatar && uploadAvatarMutation.mutate(avatar)}>Save</button>
        </div>
    );
}
