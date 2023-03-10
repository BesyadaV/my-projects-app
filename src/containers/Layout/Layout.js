import React from 'react';
import {Layout, Space} from 'antd';
import HeaderComponent from "../../components/Header/Header";
import Projects from './../../pages/projects/Projects';
import styles from './Layout.module.scss'

const {Header, Content} = Layout;

const CustomLayout = () => {
  return (
    <Space direction="vertical" className={styles.container}>
      <Layout className={styles.layout}>
        <Header className={styles.header}><HeaderComponent /></Header>
        <Content className={styles.content}><Projects /></Content>
      </Layout>
    </Space>
  );
};

export default CustomLayout;
