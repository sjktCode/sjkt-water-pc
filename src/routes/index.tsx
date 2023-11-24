import Home from '@/containers/home';

import Page404 from '@/containers/page404';
import Me from '@/containers/me';

import Organization from '@/containers/organization';

import NoOrganization from '@/containers/noorganization';

import Student from '@/containers/student';

import Course from '@/containers/course';

import Product from '@/containers/product';

import Teacher from '@/containers/teacher';

import { ROUTE_KEY } from './menus';

export const ROUTE_COMPONENT = {
    [ROUTE_KEY.HOME]: Home,
    [ROUTE_KEY.ME]: Me,
    [ROUTE_KEY.ORGANIZATION]: Organization,
    [ROUTE_KEY.COURSE]: Course,
    [ROUTE_KEY.NO_ORGANIZATION]: NoOrganization,
    [ROUTE_KEY.STUDENT]: Student,
    [ROUTE_KEY.PRODUCT]: Product,
    [ROUTE_KEY.TEACHER]: Teacher,
    [ROUTE_KEY.PAGE_404]: Page404,
};
