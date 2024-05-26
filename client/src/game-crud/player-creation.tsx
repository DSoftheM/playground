import { Button, Form, Input, Space, Typography } from "antd";
import { useImmer } from "use-immer";
import { IPlayerCreate } from "@shared/types/game-crud/player-create.interface";
import { useCreatePlayerMutation } from "./player-creation-api/use-create-player-mutation";

export function PlayerCreation() {
    const [player, updatePlayer] = useImmer<IPlayerCreate>({ name: "" });

    const createPlayerMutation = useCreatePlayerMutation();
    const validationMessage = validatePlayer(player);

    return (
        <Form layout="vertical">
            <Form.Item>
                <Typography.Title level={5}>Имя</Typography.Title>
                <Input
                    value={player.name}
                    onChange={(ev) => {
                        updatePlayer((draft) => {
                            draft.name = ev.target.value;
                            createPlayerMutation.reset();
                        });
                    }}
                />
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    onClick={() => createPlayerMutation.mutate(player)}
                    disabled={createPlayerMutation.isLoading || Boolean(validationMessage)}
                    loading={createPlayerMutation.isLoading}
                >
                    Создать
                </Button>
                <div style={{ marginTop: 4 }}>
                    {createPlayerMutation.isSuccess && <Typography.Text type="success">Игрок создан</Typography.Text>}
                </div>
                {validationMessage && <Typography.Text type="danger">{validationMessage}</Typography.Text>}
            </Form.Item>
        </Form>
    );
}

const validatePlayer = (player: IPlayerCreate) => {
    if (!player.name) return "Заполните имя";
    if (player.name.length <= 4) return "Минимальная длина имени 5 символов";
    if (/\s/.test(player.name)) return "Имя игрока должно не содержать пробелы";
};
