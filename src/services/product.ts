import { useMutation, useQuery } from '@apollo/client';

import { message } from 'antd';

import { useMemo } from 'react';

import { TBaseProduct, TProductQuery, TProductTypeQuery, TProductsQuery } from '@/utils/types';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import {
    COMMIT_PRODUCT,
    DELETE_PRODUCT,
    GET_PRODUCT,
    GET_PRODUCTS,
    GET_PRODUCT_TYPES,
} from '@/graphql/product';

export const useProducts = (pageNum = 1, pageSize = DEFAULT_PAGE_SIZE) => {
    const { loading, data, refetch } = useQuery<TProductsQuery>(GET_PRODUCTS, {
        skip: true,
        variables: {
            page: {
                pageNum,
                pageSize,
            },
        },
    });

    const refetchHandler = async (params: {
        name?: string;
        pageSize?: number;
        current?: number;
    }) => {
        const { data: res, errors } = await refetch({
            name: params.name,
            page: {
                pageNum: params.current || 1,
                pageSize: params.pageSize || DEFAULT_PAGE_SIZE,
            },
        });

        if (errors) {
            return {
                success: false,
            };
        }
        return {
            total: res?.getProducts.page.total,
            data: res?.getProducts.data,
            success: true,
        };
    };

    return {
        loading,
        refetch: refetchHandler,
        page: data?.getProducts.page,
        data: data?.getProducts.data,
    };
};

export const useEditProductInfo = (): [
    handleEdit: (params: TBaseProduct, callback: (isReload: boolean) => void, id?: string) => void,
    loading: boolean,
] => {
    const [edit, { loading }] = useMutation(COMMIT_PRODUCT);

    const handleEdit = async (
        params: TBaseProduct,
        callback: (isReload: boolean) => void,
        id?: string,
    ) => {
        const res = await edit({
            variables: {
                id,
                params,
            },
        });
        if (res.data.commitProductInfo.code === 200) {
            message.success(res.data.commitProductInfo.message);
            callback(true);
            return;
        }
        message.error(res.data.commitProductInfo.message);
    };

    return [handleEdit, loading];
};

export const useProductInfo = (id?: string) => {
    console.log('useProductInfo', 'useProductInfo');
    const { data, loading, refetch } = useQuery<TProductQuery>(GET_PRODUCT, {
        skip: !id,
        variables: {
            id,
        },
    });

    const newData = useMemo(
        () => ({
            ...data?.getProductInfo.data,
            coverUrl: [{ url: data?.getProductInfo.data.coverUrl }],
            bannerUrl: [{ url: data?.getProductInfo.data.bannerUrl }],
        }),
        [data],
    );

    return { data: data?.getProductInfo.data ? newData : undefined, loading, refetch };
};

export const useDeleteProduct = (): [
    handleEdit: (id: string, callback: () => void) => void,
    loading: boolean,
] => {
    const [del, { loading }] = useMutation(DELETE_PRODUCT);

    const delHandler = async (id: string, callback: () => void) => {
        const res = await del({
            variables: {
                id,
            },
        });
        if (res.data.deleteProduct.code === 200) {
            message.success(res.data.deleteProduct.message);
            callback();
            return;
        }
        message.error(res.data.deleteProduct.message);
    };

    return [delHandler, loading];
};

/**
 * 获取商品分类数据
 * @returns
 */
export const useProductTypes = () => {
    const { data, loading } = useQuery<TProductTypeQuery>(GET_PRODUCT_TYPES);

    return {
        data: data?.getProductTypes.data || [],
        loading,
    };
};
