import { useMutation, useQuery } from '@apollo/client';

import { message } from 'antd';

import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { COMMIT_ORG, GET_ORG, GET_ORGS, GET_SAMPLE_ORGS } from '@/graphql/organization';
import { TBaseOrganization, TOrganizationQuery, TOrganizationsQuery } from '@/utils/types';

export const useOrganizations = (pageNum = 1, pageSize = DEFAULT_PAGE_SIZE, isSample = false) => {
    const { loading, data, refetch } = useQuery<TOrganizationsQuery>(
        isSample ? GET_SAMPLE_ORGS : GET_ORGS,
        {
            variables: {
                page: {
                    pageNum,
                    pageSize,
                },
            },
        },
    );

    return {
        loading,
        refetch,
        page: data?.getOrganizations.page,
        data: data?.getOrganizations.data,
    };
};

export const useOrganization = (id: string) => {
    const { loading, data, refetch } = useQuery<TOrganizationQuery>(GET_ORG, {
        variables: {
            id,
        },
    });

    return {
        loading,
        refetch,
        data: data?.getOrganizationInfo.data,
    };
};

export const useEditInfo = (): [
    handleEdit: (id: string, params: TBaseOrganization) => Promise<void>,
    loading: boolean,
] => {
    const [edit, { loading }] = useMutation(COMMIT_ORG);

    const handleEdit = async (id: string, params: TBaseOrganization) => {
        console.log('useEditInfo', params);
        const res = await edit({
            variables: {
                id,
                params,
            },
        });
        message.info(res.data.commitOrganization.message);
    };

    return [handleEdit, loading];
};
