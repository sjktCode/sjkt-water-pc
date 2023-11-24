import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { client } from './utils/apollo.ts';
import './index.css';
import UserInfo from './components/userinfo';
import Layout from './components/layout/index.tsx';
import { routes } from './routes/menus';
import { ROUTE_COMPONENT } from './routes';
import Login from './containers/login/index.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <UserInfo>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Layout />}>
                        {routes.map((item) => {
                            const Component = ROUTE_COMPONENT[item.key];
                            return (
                                <Route path={item.path} key={item.key} element={<Component />} />
                            );
                        })}
                    </Route>
                </Routes>
            </UserInfo>
        </BrowserRouter>
    </ApolloProvider>,
);
