import { PageContainer } from '@ant-design/pro-components';

import { Button, Calendar, Card, Col, DatePicker, Result, Row, message } from 'antd';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { useOrganization } from '@/services/organization';
import { useUserContext } from '@/hooks/userHooks';
import { DAY_FORMAT } from '@/utils/constants';
import { useAutoCreateSchedule } from '@/services/dashboard';

import style from './index.module.less';
import Schedule from './components/schedule';

const { RangePicker } = DatePicker;

/**
 *
 */
const Home = () => {
    const [range, setRange] = useState<[string, string]>(['', '']);
    const { store } = useUserContext();
    const { data: organization } = useOrganization(store.currentOrg || '');
    const [run, loading] = useAutoCreateSchedule();
    const [day, setDay] = useState<string>(dayjs().format(DAY_FORMAT));
    if (!store.currentOrg) {
        return (
            <Result
                status="warning"
                title="请选择门店"
                subTitle="所有的管理行为都是基于您选择的门店进行筛选的"
            />
        );
    }
    if (!organization) {
        return null;
    }

    const startScheduleHandler = () => {
        if (!range[0]) {
            message.error('请选择时间区间');
            return;
        }
        run(...range);
    };

    const onRangeChangeHandler = (days: [Dayjs | null, Dayjs | null] | null) => {
        if (!days || !days[0] || !days[1]) {
            return;
        }
        setRange([days[0].format(DAY_FORMAT), days[1].format(DAY_FORMAT)]);
    };
    return (
        <div className={style.container}>
            <PageContainer
                content={organization?.address}
                header={{
                    title: organization?.name,
                }}
            >
                <Row gutter={20}>
                    <Col flex="auto">
                        <Card
                            title={`${day} 的课程`}
                            className={style.container}
                            extra={
                                <span>
                                    <RangePicker onChange={(days) => onRangeChangeHandler(days)} />
                                    <Button
                                        loading={loading}
                                        type="link"
                                        onClick={startScheduleHandler}
                                    >
                                        开始排课
                                    </Button>
                                </span>
                            }
                        >
                            <Schedule day={day} />
                        </Card>
                    </Col>
                    <Col flex="300px">
                        <Calendar
                            fullscreen={false}
                            onChange={(d) => setDay(d.format(DAY_FORMAT))}
                        />
                    </Col>
                </Row>
            </PageContainer>
        </div>
    );
};

export default Home;
