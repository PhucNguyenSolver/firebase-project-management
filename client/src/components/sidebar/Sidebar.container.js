import React, { useContext } from 'react'
import { AuthContext } from 'context/AuthProvider'
import { useHistory } from 'react-router-dom';
import Sidebar from './Sidebar.view';
import WorkspaceService, { WorkspaceDTO } from 'services/workspace.service.js';
import { AppContext } from 'context/AppProvider';

let service = new WorkspaceService()


export default function SidebarContainer() {
  const history = useHistory()
  const gotoDashboard = () => { history.push('/my') }
  const gotoWorkspace = (id) => { history.push(`/my/${id}`) }

  const { logout, user: { uid } } = useContext(AuthContext);
  const { workspaceList } = useContext(AppContext);

  const createWorkspace = (wsName) => {
    let newOne = new WorkspaceDTO(wsName, uid, [uid], [])
    // alert(JSON.stringify(newOne))
    service.create(newOne)
  }

  const renameWorkspace = (wsId, newName) => {
    // alert(JSON.stringify({ wsId, newName }))
    service.rename(wsId, newName)
  }

  const deleteWorkspace = (wsId) => {
    // alert(wsId)
    service.delete(wsId)
  }


  return (
    <Sidebar
      data={{
        workspaceList
      }}
      controller={{
        onClickDashboard: gotoDashboard,
        onClickWorkspace: gotoWorkspace,
        onLogout: () => logout(),
        createWorkspace, renameWorkspace, deleteWorkspace
      }}
    />
  )
}