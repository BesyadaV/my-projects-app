import React, {useEffect, useRef, memo, useState} from 'react';
import {Input, Form, Avatar, Typography, Modal} from 'antd';
import {useDispatch, batch, useSelector} from "react-redux";
import {QuestionCircleFilled} from '@ant-design/icons';
import {
  addNewModeProject,
  selectProjectById,
  toggleIsAddNewMode,
  updateProject,
  deleteProject
} from '../../redux/slices/projectsSlice';
import defaultProjectIcon from "../../icons/defaultProjectIcon_2x.png";
import {ReactComponent as EditIcon} from "../../icons/EditIcon.svg";
import {ReactComponent as DeleteIcon} from "../../icons/DeleteIcon.svg";
import styles from './Project.module.scss';
import Icon from '@ant-design/icons';

const Project = ({id}) => {
  const formRef = useRef();
  const inputRef = useRef();
  const dispatch = useDispatch()

  const [isEditMode, setIsEditMode] = useState(false);
  const project = useSelector(selectProjectById(id))

  const toggleEditMode = () => {
    setIsEditMode(prev => !prev);
  }

  const handleSubmit = (data) => {
    batch(() => {
      if (id) {
        dispatch(updateProject({...data, id}));
        toggleEditMode();
      } else {
        dispatch(addNewModeProject(data));
        dispatch(toggleIsAddNewMode());
      }
    })
  }

  const handleSubmitForm = (values) => {
    handleSubmit(values);
  }

  const handleBlur = () => {
    formRef.current.submit();
  }

  const handleDelete = () => {
    dispatch(deleteProject({id}))
  }
  const [modal, contextHolder] = Modal.useModal();

  const confirmDelete = () => {
    modal.confirm({
      title: 'Are you sure you want to delete this project?',
      icon: <QuestionCircleFilled />,
      content: 'This action can\'t be undone.',
      okText: 'Yes',
      onOk: handleDelete,
      cancelText: 'No',
      width: 440
    });
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.focus({cursor: 'end',});
    }
  }, [isEditMode]);

  const [form] = Form.useForm();
  return (
    <div className={styles.container}>
      <Avatar size='large' src={defaultProjectIcon} className={styles.projectAvatar} />
      {id && !isEditMode
        ? <div className={styles.nameInputContainer}>
          <Typography.Title
            level={2}
            style={{margin: 0}}
          >
            {project.name}
          </Typography.Title>
          <Icon onClick={toggleEditMode} className={styles.editIcon} component={EditIcon}></Icon>
        </div>
        : (
          <Form
            form={form}
            ref={formRef}
            onFinish={handleSubmitForm}
            initialValues={{name: project?.name || ''}}
          >
            <Form.Item name="name" noStyle={true} rules={[
              {
                validator: (_, value) =>
                  value.trim().length
                    ? Promise.resolve()
                    : Promise.reject(new Error("Please enter the name"))
              }
            ]}>
              <Input ref={inputRef} onBlur={handleBlur} />
            </Form.Item>
          </Form>
        )
      }
      {id && (
        <>
          <Typography.Text
            className={styles.createdAt}
          >
            {project.createdAt}
          </Typography.Text>
          <Icon onClick={confirmDelete} className={styles.deleteIcon} component={DeleteIcon}></Icon>
        </>
      )}
      {contextHolder}
    </div>
  )
};

export default memo(Project);
