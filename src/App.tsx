import React from 'react';
import { Layout, Typography } from 'antd';
import TaskList from './components/TaskList';
import './App.css';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

/**
 * Main application component
 */
const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#001529', padding: '0 50px' }}>
        <Title level={3} style={{ color: 'white', margin: '14px 0' }}>
          Kaiburr Task Management System
        </Title>
      </Header>

      <Content style={{ padding: '24px 50px', background: '#f0f2f5' }}>
        <TaskList />
      </Content>

      <Footer style={{ textAlign: 'center', background: '#f0f2f5' }}>
        Kaiburr Assessment - Task 3 | Created by Mahesh
      </Footer>
    </Layout>
  );
};

export default App;
