export interface IPropChild {
    children: React.ReactNode;
}

export interface IValue {
    label: string;
    value: string;
}

export interface IUser {
    id: string;
    tel: string;
    name: string;
    desc: string;
    avatar: string;
    currentOrg?: string;
    refetchHandler?: () => void;
}

export interface IPage {
    pageNum: number;
    pageSize: number;
    total: number;
}

export interface IMedia {
    id: string;
    url: string;
    remark: string;
}

/**
 * 门店
 */
export interface IOrganization {
    id: string;
    orgFrontImg?: IMedia[];
    orgRoomImg?: IMedia[];
    orgOtherImg?: IMedia[];
    name: string;
    logo: string;
    tags?: string;
    description?: string;
    address?: string;
    tel?: string;
    longitude?: string;
    latitude?: string;
    identityCardBackImg: string;
    identityCardFrontImg: string;
    businessLicense: string;
}

export type TBaseOrganization = Partial<IOrganization>;

export type TOrganizationsQuery = {
    [key: string]: { __typename?: 'Query'; data: IOrganization[]; page: IPage };
};

export type TOrganizationQuery = { [key: string]: { __typename?: 'Query'; data: IOrganization } };

export interface IStudent {
    name: string;
    id: string;
    tel: string;
    avatar: string;
    account: string;
}

export type TStudentQuery = {
    [key: string]: { __typename?: 'Query'; data: IStudent[]; page: IPage };
};

export interface ICourse {
    id: string;
    name: string; // 标题
    desc?: string;
    group?: string; // 适龄人群
    baseAbility?: string;
    limitNumber: number; // 限制人数
    duration: number; // 持续时长
    reserveInfo?: string;
    refundInfo?: string;
    otherInfo?: string;
    reducibleTime: IWeekCourse[];
    teachers: ITeacher[];
}
export type TCoursesQuery = {
    [key: string]: { __typename?: 'Query'; data: ICourse[]; page: IPage };
};

export type TCourseQuery = { [key: string]: { __typename?: 'Query'; data: ICourse; page: IPage } };

export type TBaseCourse = Partial<ICourse>;

export interface IOrderTime {
    startTime: string;
    endTime: string;
    key: number;
}

export type TWeek =
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday'
    | 'sunday';

export interface IWeekCourse {
    week: TWeek;
    orderTime: IOrderTime[];
}

export interface ICard {
    id: string;
    name: string;
    type: string;
    time: number;
    validityDay: number;
    course?: ICourse;
}

export type TCardsQuery = { [key: string]: { __typename?: 'Query'; data: ICard[]; page: IPage } };

/**
 * 商品类型
 */
export interface IProduct {
    id: string;
    type: string;
    limitBuyNumber: number;
    name: string;
    coverUrl?: string;
    bannerUrl?: string;
    desc: string;
    originalPrice: number;
    stock: number;
    preferentialPrice: number;
    status: string;
    cards: ICard[] | string[];
}

export interface IProductType {
    key: string;
    title: string;
}

export type TProductsQuery = {
    [key: string]: { __typename?: 'Query'; data: IProduct[]; page: IPage };
};

export type TProductQuery = { [key: string]: { __typename?: 'Query'; data: IProduct } };

export type TProductTypeQuery = { [key: string]: { __typename?: 'Query'; data: IProductType[] } };

export type TBaseProduct = Partial<IProduct>;

export interface ITeacher {
    id: string;
    name: string;
    photoUrl: string;
    teacherTime: number;
    education: string;
    seniority: string;
    experience: string;
    carryPrize: string;
    tags: string;
}

export type TBaseTeacher = Partial<ITeacher>;

export type TTeachersQuery = {
    [key: string]: { __typename?: 'Query'; data: ITeacher[]; page: IPage };
};

export type TTeacherQuery = { [key: string]: { __typename?: 'Query'; data: ITeacher } };

export interface IScheduleRecord {
    id: string;
    status: string;
    student: IStudent;
}

export interface ISchedule {
    id: string;
    schoolDay: string;
    startTime: string;
    endTime: string;
    limitNumber: number; // 限制上课人数
    course: ICourse;
    org: IOrganization;
    scheduleRecords: IScheduleRecord[];
}

export type TSchedulesQuery = { [key: string]: { __typename?: 'Query'; data: ISchedule[] } };
