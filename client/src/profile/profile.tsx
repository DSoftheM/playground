import { Button, Upload, UploadFile } from "antd";
import { useMutation } from "react-query";
import { apiProvider } from "../api-provider";
import { useState } from "react";

function useUploadAvatarMutation() {
    return useMutation({
        mutationFn: (file: UploadFile) => {
            const formData = new FormData();
            formData.append("file", file.originFileObj as Blob);
            return apiProvider.profile.uploadAvatar(formData);
        },
    });
}

export function Profile() {
    const [avatar, setAvatar] = useState<UploadFile | null>(null);

    const uploadAvatarMutation = useUploadAvatarMutation();

    return (
        <div>
            <Upload listType="picture-circle" onChange={(data) => setAvatar(data.file)} maxCount={1} hasControlInside={false}>
                <Button type="link">Upload</Button>
            </Upload>
            <button onClick={() => avatar && uploadAvatarMutation.mutate(avatar)}>Save</button>
        </div>
    );
}
