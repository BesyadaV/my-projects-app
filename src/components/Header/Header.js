import React from 'react';
import { useDispatch } from 'react-redux'
import {Avatar, Typography, Space, Button,} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import logo from './../../icons/ThunkableBeaver.png'
import {toggleIsAddNewMode} from '../../redux/slices/projectsSlice';
import styles from './Header.module.scss';

const {Title} = Typography;
const Header = () => {
  const dispatch = useDispatch()

  const handleAdd = () => {
    dispatch(toggleIsAddNewMode());
  }

  return (
    <>
      <Space
        direction="vertical"
        size="small"
      >
        <Avatar src={logo} />
        <Title level={5}>MY PROJECTS</Title>
      </Space>
      <Button
        shape="circle"
        icon={<PlusOutlined className={styles.addIcon} />}
        className={styles.addButton}
        onClick={handleAdd}
      />
    </>
  );
};

export default Header;
