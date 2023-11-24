import {
    GiftOutlined,
    HomeOutlined,
    IdcardOutlined,
    PicRightOutlined,
    ShopOutlined,
    TeamOutlined,
} from '@ant-design/icons';

interface IRoute {
    path: string;
    name: string;
    icon?: React.ReactNode;
    hideInMenu?: boolean;
}

export const ROUTE_KEY = {
    HOME: 'home',
    ME: 'me',
    ORGANIZATION: 'organization',
    NO_ORGANIZATION: 'noOrganization',
    COURSE: 'course',
    STUDENT: 'student',
    PRODUCT: 'product',
    TEACHER: 'teacher',
    PAGE_404: 'p404',
};

export const ROUTE_CONFIG: Record<string, IRoute> = {
    [ROUTE_KEY.HOME]: {
        path: '/',
        name: '首页',
        hideInMenu: true,
        icon: <HomeOutlined />,
    },
    [ROUTE_KEY.ME]: {
        path: 'my',
        name: '个人信息',
        hideInMenu: true,
        icon: <HomeOutlined />,
    },
    [ROUTE_KEY.ORGANIZATION]: {
        path: 'org',
        name: '门店管理',
        hideInMenu: true,
        icon: <ShopOutlined />,
    },
    [ROUTE_KEY.COURSE]: {
        path: 'course',
        name: '课程管理',
        icon: <PicRightOutlined />,
    },
    [ROUTE_KEY.NO_ORGANIZATION]: {
        path: 'noOrg',
        name: '选择门店提示',
        hideInMenu: true,
    },
    [ROUTE_KEY.STUDENT]: {
        path: 'student',
        name: '学员管理',
        icon: <TeamOutlined />,
    },
    [ROUTE_KEY.PRODUCT]: {
        path: 'product',
        name: '商品管理',
        icon: <GiftOutlined />,
    },
    [ROUTE_KEY.TEACHER]: {
        path: 'teacher',
        name: '教师管理',
        icon: <IdcardOutlined />,
    },
    [ROUTE_KEY.PAGE_404]: {
        path: '*',
        hideInMenu: true,
        name: '404',
    },
};

export const routes = Object.keys(ROUTE_CONFIG).map((key) => ({ ...ROUTE_CONFIG[key], key }));

export const getRouteByKey = (key: string) => ROUTE_CONFIG[key];
