import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import {
    LoginFormPage,
    ProFormCaptcha,
    ProFormCheckbox,
    ProFormText,
} from '@ant-design/pro-components';
import { Tabs, message } from 'antd';
import { useMutation } from '@apollo/client';

import { useNavigate, useSearchParams } from 'react-router-dom';

import { useState } from 'react';

import { LOGIN, LOGINBYPASS, SEND_CODE_MSG } from '@/graphql/auth';
import { AUTH_TOKEN } from '@/utils/constants';

import { useUserContext } from '@/hooks/userHooks';

import { useTitle } from '@/hooks';

import styles from './index.module.less';

interface IValue {
    tel: string;
    code: string;
    password: string;
    autoLogin: boolean;
}

type LoginType = 'phone' | 'account';

const Login = () => {
    const [loginType, setLoginType] = useState<LoginType>('phone');
    const [run] = useMutation(SEND_CODE_MSG);
    const [login] = useMutation(LOGIN);
    const [loginByPass] = useMutation(LOGINBYPASS);
    const [params] = useSearchParams();
    const { store } = useUserContext();
    const nav = useNavigate();
    useTitle('登录');

    const loginHandler = async (values: IValue) => {
        const res =
            loginType === 'phone'
                ? await login({
                      variables: values,
                  })
                : await loginByPass({
                      variables: values,
                  });
        const responseData = loginType === 'phone' ? res.data.login : res.data.loginByPassword;
        if (responseData.code === 200) {
            store.refetchHandler?.();
            if (values.autoLogin) {
                sessionStorage.setItem(AUTH_TOKEN, '');
                localStorage.setItem(AUTH_TOKEN, responseData.data);
            } else {
                localStorage.setItem(AUTH_TOKEN, '');
                sessionStorage.setItem(AUTH_TOKEN, responseData.data);
            }
            message.success(responseData.message);
            nav(params.get('orgUrl') || '/');
            return;
        }
        message.error(responseData.message);
    };

    return (
        <div className={styles.container}>
            <LoginFormPage
                initialValues={{ tel: '13113663587' }}
                onFinish={loginHandler}
                backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
                logo="http://sjkt-water-assets.oss-cn-shanghai.aliyuncs.com/images/henglogo.png"
            >
                <Tabs
                    centered
                    activeKey={loginType}
                    onChange={(activeKey) => setLoginType(activeKey as LoginType)}
                >
                    <Tabs.TabPane key="phone" tab="手机号登录" />
                    <Tabs.TabPane key="account" tab="账号密码登录" />
                </Tabs>

                {loginType === 'phone' && (
                    <>
                        <ProFormText
                            fieldProps={{
                                size: 'large',
                                prefix: <MobileOutlined className="prefixIcon" />,
                            }}
                            name="tel"
                            placeholder="手机号"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入手机号！',
                                },
                                {
                                    pattern: /^1\d{10}$/,
                                    message: '手机号格式错误！',
                                },
                            ]}
                        />
                        <ProFormCaptcha
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined className="prefixIcon" />,
                            }}
                            captchaProps={{
                                size: 'large',
                            }}
                            placeholder="请输入验证码"
                            captchaTextRender={(timing, count) => {
                                if (timing) {
                                    return `${count} ${'获取验证码'}`;
                                }
                                return '获取验证码';
                            }}
                            phoneName="tel"
                            name="code"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入验证码！',
                                },
                            ]}
                            onGetCaptcha={async (tel: string) => {
                                console.log('tel', tel);
                                const res = await run({
                                    variables: {
                                        tel,
                                    },
                                });
                                if (res.data.sendCodeMsg.code === 200) {
                                    message.success(res.data.sendCodeMsg.message);
                                } else {
                                    message.error(res.data.sendCodeMsg.message);
                                }
                            }}
                        />
                    </>
                )}
                {loginType === 'account' && (
                    <>
                        <ProFormText
                            name="tel"
                            fieldProps={{
                                size: 'large',
                                prefix: <UserOutlined className="prefixIcon" />,
                            }}
                            placeholder="手机号:"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入手机号!',
                                },
                            ]}
                        />
                        <ProFormText.Password
                            name="password"
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined className="prefixIcon" />,
                            }}
                            placeholder="密码:"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码！',
                                },
                            ]}
                        />
                    </>
                )}
                <div
                    style={{
                        marginBlockEnd: 24,
                    }}
                >
                    <ProFormCheckbox noStyle name="autoLogin">
                        自动登录
                    </ProFormCheckbox>
                </div>
            </LoginFormPage>
        </div>
    );
};

export default Login;
