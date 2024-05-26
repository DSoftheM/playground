import { Button, Form, Input } from "antd";
import { useImmer } from "use-immer";
import { IPlayerCreate } from "@shared/types/game-crud/player-create.interface";
import { useCreatePlayerMutation } from "./player-creation-api/use-create-player-mutation";

export function PlayerCreation() {
    const [player, updatePlayer] = useImmer<IPlayerCreate>({ name: "" });

    const createPlayerMutation = useCreatePlayerMutation();

    return (
        <Form>
            <Form.Item>
                <Input
                    value={player.name}
                    onChange={(ev) => {
                        updatePlayer((draft) => {
                            draft.name = ev.target.value;
                        });
                    }}
                />
            </Form.Item>
            <Form.Item>
                <Button onClick={() => createPlayerMutation.mutate(player)}>Создать</Button>
            </Form.Item>
        </Form>
    );
}
