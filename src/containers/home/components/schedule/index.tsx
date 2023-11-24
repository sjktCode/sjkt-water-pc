import { Avatar, Descriptions, Result, Space, Spin, Steps, Tooltip } from 'antd';

import { useSchedules } from '@/services/dashboard';
import { SCHEDULE_STATUS } from '@/utils/constants';

import style from './index.module.less';

interface IProps {
    day: string;
}

/**
 * 某一天的课程表
 */
const Schedule = ({ day }: IProps) => {
    const { data, loading } = useSchedules(day);

    if (data?.length === 0) {
        return <Result status="warning" title="当前没有排课，快去排课吧" />;
    }

    return (
        <Spin spinning={loading} className={style.container}>
            <Steps
                direction="vertical"
                items={data?.map((item) => ({
                    title: `${item.startTime}-${item.endTime} ${item.course.name}`,
                    description: (
                        <Descriptions bordered size="small">
                            <Descriptions.Item span={3} label="讲师">
                                <Space>
                                    {item.course.teachers.map((teacher) => (
                                        <Space key={teacher.id}>
                                            <Avatar
                                                shape="square"
                                                size="small"
                                                src={teacher.photoUrl}
                                            />
                                            {teacher.name}
                                        </Space>
                                    ))}
                                </Space>
                            </Descriptions.Item>
                            <Descriptions.Item
                                span={3}
                                label={`学员(${item.scheduleRecords.length})`}
                                labelStyle={{
                                    width: 80,
                                }}
                            >
                                {item.scheduleRecords.length === 0 && '暂无学员预约'}
                                <Avatar.Group
                                    maxCount={10}
                                    maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
                                >
                                    {item.scheduleRecords.map((sr) => (
                                        <Tooltip
                                            key={sr.id}
                                            title={
                                                sr.student.name +
                                                (sr.status === SCHEDULE_STATUS.CANCEL
                                                    ? '：已取消'
                                                    : '')
                                            }
                                        >
                                            <Avatar key={sr.student.id} src={sr.student.avatar} />
                                        </Tooltip>
                                    ))}
                                </Avatar.Group>
                            </Descriptions.Item>
                        </Descriptions>
                    ),
                }))}
            />
        </Spin>
    );
};

export default Schedule;
