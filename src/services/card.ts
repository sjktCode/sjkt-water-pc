import { message } from 'antd';

import { useQuery, useMutation, useLazyQuery } from '@apollo/client';

import { DeepPartial } from '@ant-design/pro-components';

import { ICard } from '@/utils/types';
import { COMMIT_CARD, DELETE_CARD, GET_CARDS } from '@/graphql/card';

export const useCards = (courseId: string) => {
    const { data, loading, refetch } = useQuery(GET_CARDS, {
        variables: {
            courseId,
        },
    });

    return {
        loading,
        data: data?.getCards.data,
        refetch,
    };
};

export const useLazyCards = () => {
    const [get, { data, loading }] = useLazyQuery(GET_CARDS);

    const getCards = (courseId: string) => {
        get({
            variables: {
                courseId,
            },
        });
    };

    return {
        loading,
        data: data?.getCards.data,
        getCards,
    };
};

export const useEditCardInfo = (): [
    handleEdit: (
        id: string,
        courseId: string,
        params: DeepPartial<ICard>,
        callback: () => void,
    ) => void,
    loading: boolean,
] => {
    const [edit, { loading }] = useMutation(COMMIT_CARD);

    const handleEdit = async (
        id: string,
        courseId: string,
        params: DeepPartial<ICard>,
        callback: () => void,
    ) => {
        const res = await edit({
            variables: {
                id: id === 'new' ? '' : id,
                params,
                courseId,
            },
        });
        if (res.data.commitCardInfo.code === 200) {
            message.success(res.data.commitCardInfo.message);
            callback();
            return;
        }
        message.error(res.data.commitCardInfo.message);
    };

    return [handleEdit, loading];
};

export const useDeleteCard = (): [
    handleEdit: (id: string, callback: () => void) => void,
    loading: boolean,
] => {
    const [del, { loading }] = useMutation(DELETE_CARD);

    const delHandler = async (id: string, callback: () => void) => {
        const res = await del({
            variables: {
                id,
            },
        });
        if (res.data.deleteCard.code === 200) {
            message.success(res.data.deleteCard.message);
            callback();
            return;
        }
        message.error(res.data.deleteCard.message);
    };

    return [delHandler, loading];
};
