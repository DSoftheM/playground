import { CheckOutlined, CloseOutlined, CloseSquareOutlined } from "@ant-design/icons";
import { List, Typography } from "antd";
import { ICatView } from "@shared/types/cats/cat-view.interface";

type Props = {
    item: ICatView;
    onDelete: () => void;
};

export function CatListItem(props: Props) {
    const { item } = props;
    const activeIcon = item.isActive ? <CheckOutlined color="red" /> : <CloseOutlined />;

    return (
        <List.Item extra={[<CloseSquareOutlined onClick={props.onDelete} />]}>
            <div>Активный: {activeIcon}</div>
            <div>Имя - {item.firstName}</div>
            <div>Фамилия - {item.lastName}</div>
            <div>Хозяин кошечки - {item.master.login}</div>
        </List.Item>
    );
}
