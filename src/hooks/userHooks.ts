import { useQuery } from '@apollo/client';

import { useLocation, useNavigate } from 'react-router-dom';

import { GET_USER } from '@/graphql/user';

import { connectFactory, useAppContext } from '../utils/contextFactory';
import { IUser } from '../utils/types';

const KEY = 'userinfo';
const DEFAULT_VALUE = {};
export const useUserContext = () => useAppContext<IUser>(KEY);
export const connect = connectFactory(KEY, DEFAULT_VALUE);
export const useGetUser = () => {
    const { setStore } = useUserContext();
    const nav = useNavigate();
    const location = useLocation();

    const handleCompleted = (data: { getUserInfo: IUser }) => {
        if (data.getUserInfo) {
            const { id, name, tel, desc, avatar } = data.getUserInfo;
            console.log('getUserInfo', 'getUserInfo');
            setStore({
                id,
                name,
                tel,
                desc,
                avatar,
                refetchHandler: refreshQuery,
            });
            // 当前在登录页面，且已经登录了，那就直接跳到首页
            if (location.pathname === '/login') {
                nav('/');
            }
            return;
        }
        console.log('onCompleted', 'onCompleted');
        setStore({ refetchHandler: refreshQuery });
        if (location.pathname !== '/login') {
            nav(`/login?orgUrl=${location.pathname}`);
        }
    };
    const { loading, refetch } = useQuery<{ getUserInfo: IUser }>(GET_USER, {
        onCompleted: (data) => {
            handleCompleted(data);
        },
        onError: () => {
            console.log('onError', 'onError');
            setStore({ refetchHandler: refreshQuery });
            if (location.pathname !== '/login') {
                nav(`/login?orgUrl=${location.pathname}`);
            }
        },
    });
    const refreshQuery = () => {
        refetch().then((data) => {
            handleCompleted(data.data);
        });
    };
    return { loading };
};
