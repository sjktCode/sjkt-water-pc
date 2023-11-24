import { ProColumns } from '@ant-design/pro-components';

import { Space, Image, Popconfirm } from 'antd';

import { IProduct } from '@/utils/types';

interface IProps {
    onEditHandler: (id: string) => void;
    onCardHandler: (id: string) => void;
    onDeleteHandler: (id: string) => void;
    onStatusChangeHandler: (id: string, status: string) => void;
}

const PRODUCT_STATUS = {
    LIST: 'LIST',
    UN_LIST: 'UN_LIST',
};

export const getColumns: ({
    onEditHandler,
    onCardHandler,
    onDeleteHandler,
    onStatusChangeHandler,
}: IProps) => ProColumns<IProduct, 'text'>[] = ({
    onEditHandler,
    onCardHandler,
    onDeleteHandler,
    onStatusChangeHandler,
}) => [
    {
        dataIndex: 'id',
        title: '#',
        valueType: 'indexBorder',
        search: false,
        align: 'center',
        width: 50,
    },
    {
        title: '封面',
        dataIndex: 'coverUrl',
        search: false,
        align: 'center',
        width: 100,
        render: (_, record: IProduct) => <Image src={record.coverUrl} />,
    },
    {
        title: '商品名',
        dataIndex: 'name',
        copyable: true,
        ellipsis: true,
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: '此项必填',
                },
            ],
        },
    },
    {
        title: '原价',
        search: false,
        dataIndex: 'originalPrice',
        width: 80,
    },
    {
        title: '优惠价',
        search: false,
        dataIndex: 'preferentialPrice',
        width: 80,
    },
    {
        title: '库存总额',
        search: false,
        width: 80,
        align: 'center',
        dataIndex: 'stock',
    },
    {
        title: '当前库存',
        search: false,
        width: 80,
        align: 'center',
        dataIndex: 'curStock',
    },
    {
        title: '每人限购',
        search: false,
        width: 80,
        align: 'center',
        dataIndex: 'limitBuyNumber',
    },
    {
        title: '销量',
        search: false,
        width: 50,
        align: 'center',
        dataIndex: 'buyNumber',
    },
    {
        title: '操作',
        valueType: 'option',
        dataIndex: 'id',
        align: 'center',
        width: 300,
        render: (_text, entity) => (
            <Space>
                {entity.status === PRODUCT_STATUS.UN_LIST ? (
                    <a
                        key="list"
                        style={{
                            color: 'blue',
                        }}
                        onClick={() => onStatusChangeHandler(entity.id, PRODUCT_STATUS.LIST)}
                    >
                        上架
                    </a>
                ) : (
                    <a
                        key="unList"
                        style={{
                            color: 'green',
                        }}
                        onClick={() => onStatusChangeHandler(entity.id, PRODUCT_STATUS.UN_LIST)}
                    >
                        下架
                    </a>
                )}
                <a key="edit" type="link" onClick={() => onEditHandler(entity.id)}>
                    编辑
                </a>
                <a key="card" type="link" onClick={() => onCardHandler(entity.id)}>
                    绑定消费卡
                </a>
                <Popconfirm
                    title="提醒"
                    description="确认要删除吗？"
                    onConfirm={() => onDeleteHandler(entity.id)}
                >
                    <a
                        key="delete"
                        type="link"
                        style={{
                            color: 'red',
                        }}
                    >
                        删除
                    </a>
                </Popconfirm>
            </Space>
        ),
    },
];
