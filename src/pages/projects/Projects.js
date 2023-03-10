import React from 'react';
import {useSelector} from 'react-redux'
import Project from "../../components/Project/Project";
import styles from './Projects.module.scss'
import {
  selectAllIsAddNewMode,
  selectAllProjectsIds,
} from "../../redux/slices/projectsSlice";
import {Typography} from "antd";
const {Title} = Typography;


const Projects = () => {
  const isAddNewMode = useSelector(selectAllIsAddNewMode);
  const projectsIds = useSelector(selectAllProjectsIds);

  return (
    <div className={styles.container}>
      {isAddNewMode && (
        <Project />
      )}
      {projectsIds.map(id => <Project key={id} id={id} />)}
      {!isAddNewMode && !projectsIds.length  && (
        <Title level={5}>You don't have projects yet. Click + to add new.</Title>
      )}
    </div>
  );
};

export default Projects;
