import React from 'react';
import Header from './Header';
import Main from '../main/index';
import Subbar from './subbar/index';
import CreateTask from '../task/CreateTask';
import ViewTask from '../task/ViewTask';
import { AppContext } from '../../context/AppProvider';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';

export default function Workspace() {
  const Container = styled.div`
  padding-right: 16px;
  height: 100vh;
  `
  let { workspaceId } = useParams()
  const { workspaceList, visibleTask, setSelectedWorkspace } = React.useContext(AppContext);

  React.useEffect(() => {
    setSelectedWorkspace(workspaceId)
  }, [workspaceId]);

  return (
    <Container>
      <Header />
      <Subbar />
      {(workspaceList.length > 0) && <Main />}
      {visibleTask && <ViewTask />}
      <CreateTask />
    </Container>
  )
}
