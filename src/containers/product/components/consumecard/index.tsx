import { CheckCard } from '@ant-design/pro-components';
import { Modal, Result, Row, Space, Typography } from 'antd';

import { CreditCardOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';

import _ from 'lodash';

import { useEditProductInfo, useProductInfo } from '@/services/product';
import { useLazyCards } from '@/services/card';
import CourseSearch from '@/components/coursesearch';

import { getCardName } from '@/utils/constants';

import { ICard } from '@/utils/types';

import style from './index.module.less';

interface IProps {
    id: string;
    onClose: (isReload?: boolean) => void;
}

/**
 * 消费卡
 */
const ConsumeCard = ({ onClose, id }: IProps) => {
    const [selectedCards, setSelectedCards] = useState<string[]>([]);
    const { data: product, loading: getProductLoading } = useProductInfo(id);
    const { getCards, data: cards, loading: getCardsLoading } = useLazyCards();
    const [edit, editLoading] = useEditProductInfo();

    const newCards = useMemo(
        () => _.unionBy((product?.cards as ICard[]) || [], cards, 'id'),
        [cards, product?.cards],
    );

    useEffect(() => {
        setSelectedCards((product?.cards as ICard[])?.map((item) => item.id) || []);
    }, [product?.cards]);

    const onOkHandler = () => {
        edit(
            {
                cards: selectedCards,
            },
            () => onClose(),
            id,
        );
    };

    const onSelectedHandler = (courseId: string) => {
        getCards(courseId);
    };

    return (
        <Modal title="绑定消费卡" width="900" open onOk={onOkHandler} onCancel={() => onClose()}>
            <Row justify="end">
                <CourseSearch onSelected={onSelectedHandler} />
            </Row>
            <Row justify="center" className={style.content}>
                {newCards.length === 0 && (
                    <Result status="warning" title="请搜索课程并选择对应的消费卡" />
                )}
                <CheckCard.Group
                    multiple
                    loading={getProductLoading || editLoading || getCardsLoading}
                    onChange={(value) => {
                        setSelectedCards(value as string[]);
                    }}
                    value={selectedCards}
                >
                    {newCards.map((item) => (
                        <CheckCard
                            key={item.id}
                            value={item.id}
                            size="default"
                            avatar={<CreditCardOutlined />}
                            title={
                                <>
                                    <Space>
                                        <Typography.Text ellipsis className={style.name}>
                                            {item.course?.name}
                                        </Typography.Text>
                                        {getCardName(item.type)}
                                    </Space>
                                    <div>{item.name}</div>
                                </>
                            }
                            description={
                                <Space>
                                    <span>
                                        次数：
                                        {item.time}
                                    </span>
                                    <span>
                                        有效期：
                                        {item.validityDay}
                                    </span>
                                </Space>
                            }
                        />
                    ))}
                </CheckCard.Group>
            </Row>
        </Modal>
    );
};

export default ConsumeCard;
