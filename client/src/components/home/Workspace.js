import React from 'react';
import Header from './Header';
import Main from '../main/index';
import Subbar from './subbar/index';
import CreateTask from '../task/CreateTask';
import ViewTask from '../task/ViewTask';
import { AppContext } from '../../context/AppProvider';
import { useParams } from 'react-router-dom';
import { HScrollView, VStack } from 'components/layout/AppLayout';


export default function Workspace() {
  let { workspaceId } = useParams()
  const { workspaceList, visibleTask, setSelectedWorkspace } = React.useContext(AppContext);

  React.useEffect(() => {
    setSelectedWorkspace(workspaceId)
  }, [workspaceId]);

  return <VStack
    left={<>
      <Header />
      <Subbar />
    </>}
    right={
      <HScrollView>
        <div>
          {(workspaceList.length > 0) && <Main />}
          {visibleTask && <ViewTask />}
          <CreateTask />
        </div>
      </HScrollView>
    }
  />
}

