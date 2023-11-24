import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components';

import { Button } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import { useRef, useState } from 'react';

import { IProduct } from '@/utils/types';

import { DEFAULT_PAGE_SIZE } from '@/utils/constants';

import { useDeleteProduct, useEditProductInfo, useProducts } from '@/services/product';

import EditProduct from './components/editproduct';
import { getColumns } from './constants';
import ConsumeCard from './components/consumecard';

/**
 * 当前门店下开设的课程
 */
const Product = () => {
    const actionRef = useRef<ActionType>();
    const [curId, setCurId] = useState('');
    const { refetch, loading } = useProducts();
    const [delHandler, delLoading] = useDeleteProduct();
    const [edit, editLoading] = useEditProductInfo();
    const [showInfo, setShowInfo] = useState(false);
    const [showCard, setShowCard] = useState(false);

    const onClickAddHandler = (id?: string) => {
        if (id) {
            setCurId(id);
        } else {
            setCurId('');
        }
        setShowInfo(true);
    };

    const closeAndRefetchHandler = (isReload?: boolean) => {
        setShowInfo(false);
        if (isReload) {
            actionRef.current?.reload();
        }
    };

    const onCardHandler = (id: string) => {
        setCurId(id);
        setShowCard(true);
    };

    const onDeleteHandler = (id: string) => {
        delHandler(id, () => actionRef.current?.reload());
    };

    const onStatusChangeHandler = (id: string, status: string) => {
        edit(
            {
                status,
            },
            () => actionRef.current?.reload(),
            id,
        );
    };

    return (
        <PageContainer header={{ title: '当前门店下的商品' }}>
            <ProTable<IProduct>
                rowKey="id"
                form={{
                    ignoreRules: false,
                }}
                loading={delLoading || editLoading || loading}
                actionRef={actionRef}
                columns={getColumns({
                    onEditHandler: onClickAddHandler,
                    onCardHandler,
                    onDeleteHandler,
                    onStatusChangeHandler,
                })}
                pagination={{
                    pageSize: DEFAULT_PAGE_SIZE,
                }}
                toolBarRender={() => [
                    <Button
                        key="add"
                        onClick={() => onClickAddHandler()}
                        type="primary"
                        icon={<PlusOutlined />}
                    >
                        新建
                    </Button>,
                ]}
                request={refetch}
            />
            {showInfo && <EditProduct onClose={closeAndRefetchHandler} id={curId} />}
            {showCard && <ConsumeCard onClose={() => setShowCard(false)} id={curId} />}
        </PageContainer>
    );
};

export default Product;
