import { MenuDataItem, ProLayout } from '@ant-design/pro-components';
import { Link, useNavigate, useOutlet } from 'react-router-dom';

import { LogoutOutlined, ShopOutlined, UserOutlined } from '@ant-design/icons';

import { Space, Tooltip } from 'antd';

import { useUserContext } from '@/hooks/userHooks';

import { ROUTE_KEY, routes } from '@/routes/menus';

import { AUTH_TOKEN } from '@/utils/constants';

import { useGoTo, useIsOrgRoute } from '@/hooks';

import OrgSelect from '../orgselect';

import style from './index.module.less';

const menuItemRender = (item: MenuDataItem, dom: React.ReactNode) => (
    <Link to={item.path || '/'}>{dom}</Link>
);

/**
 * 外层框架
 */
const Layout = () => {
    const outlet = useOutlet();
    const { store } = useUserContext();
    const isOrg = useIsOrgRoute();
    const { go } = useGoTo();
    const nav = useNavigate();

    const logoutHandler = () => {
        sessionStorage.setItem(AUTH_TOKEN, '');
        localStorage.setItem(AUTH_TOKEN, '');
        nav('/login');
    };

    const goToOrganization = () => {
        go(ROUTE_KEY.ORGANIZATION);
    };

    return (
        <ProLayout
            layout="mix"
            siderWidth={150}
            avatarProps={{
                src: store.avatar || null,
                title: store.name,
                size: 'small',
                icon: <UserOutlined />,
                onClick: () => go(ROUTE_KEY.ME),
            }}
            links={[
                <Space size={20} onClick={logoutHandler}>
                    <LogoutOutlined />
                    退出
                </Space>,
            ]}
            title={false}
            logo={
                <img
                    src="https://sjkt-water-assets.oss-cn-shanghai.aliyuncs.com/images/henglogo.png"
                    alt="logo"
                />
            }
            className={style.container}
            onMenuHeaderClick={() => nav('/')}
            route={{
                path: '/',
                routes,
            }}
            actionsRender={() => [
                !isOrg && <OrgSelect />,
                <Tooltip title="门店管理">
                    <ShopOutlined onClick={goToOrganization} />
                </Tooltip>,
            ]}
            menuItemRender={menuItemRender}
        >
            <div key={store.currentOrg}>{outlet}</div>
        </ProLayout>
    );
};

export default Layout;
