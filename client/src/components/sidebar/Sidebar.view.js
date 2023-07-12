import React, { useState } from 'react'
import { Menu, Dropdown, Collapse, Typography, Button, Input, Modal } from 'antd';
import { AppstoreTwoTone, EditTwoTone } from '@ant-design/icons';
import './sidebar.scss';

const { Panel } = Collapse;

export default function Sidebar({ data, controller }) {
  const { workspaceList } = data
  const { onClickDashboard, onClickWorkspace, onLogout, createWorkspace, renameWorkspace, deleteWorkspace } = controller

  const [modalCreateActive, setModalCreateActive] = useState(false);
  const [modalEdit, setModalEdit] = useState({ visible: false, data: {} });
  const [modalDelete, setModalDelete] = useState({ visible: false, data: {} });

  const onClickEdit = (id) => setModalEdit({
    visible: true,
    workspaceId: id,
  })

  const onClickDelete = (id) => setModalDelete({
    visible: true,
    workspaceId: id,
  })

  return (
    <div className="sidebar" style={{
      padding: '10px',
      backgroundColor: 'gray'
    }}>
      <ul>
        <li onClick={onClickDashboard} className="active-border">
          <AppstoreTwoTone className="icon" />
          <Typography.Link >DashBoard</Typography.Link>
        </li>
        <li>
          <Collapse accordion={true} >
            <Panel header="Workspace" >
              {workspaceList?.map(item => (
                <PanelButton
                  id={item.id}
                  data={{
                    id: item.id,
                    name: item.name,
                    selected: true, // TODO
                    onClickText: onClickWorkspace,
                    onClickEdit,
                    onClickDelete,
                  }}
                />)
              )}
              <Button type="dashed" onClick={() => setModalCreateActive(true)} >+  Create workspace</Button>
            </Panel>
          </Collapse>
        </li>
      </ul>

      <Button type="primary" onClick={() => onLogout()}>Log out</Button>

      <ModalCreate
        visible={modalCreateActive}
        onBlur={() => setModalCreateActive(false)}
        onSubmit={(value) => createWorkspace(value)}
      />

      <ModalRename
        visible={modalEdit?.visible}
        onBlur={() => setModalEdit({})}
        onSubmit={(newName) => renameWorkspace(modalEdit.workspaceId.toString(), newName)}
      />

      <ModalDeleteWS
        visible={modalDelete?.visible}
        onBlur={() => setModalDelete({})}
        onSubmit={() => deleteWorkspace(modalDelete.workspaceId.toString())}
      />
    </div>
  )
}

function PanelButton({ data }) {
  let { id, name, selected, onClickText, onClickEdit, onClickDelete } = data
  return (
    <Typography.Link
      style={{ width: "100%" }}
      className={selected ? "active-border" : ""}
      key={id}
      onClick={() => onClickText(id)}
    > {name}
      <Dropdown overlay={(
        <Menu>
          <Menu.Item key="0" value='edit'
            onClick={() => onClickEdit(id)}>
            Edit name
          </Menu.Item>
          <Menu.Item key="1" value='delete'
            onClick={() => onClickDelete(id)}>
            Delete
          </Menu.Item>
        </Menu>
      )} trigger={['click', 'hover']}>
        <a className="ant-dropdown-link" href='/' onClick={e => e.preventDefault()}>
          <EditTwoTone />
        </a>
      </Dropdown>
    </Typography.Link>
  )
}

function ModalCreate({ visible, onBlur, onSubmit }) {
  const [input, setInput] = useState("")
  const onOk = () => {
    if (input === '') {
      alert("Should not be empty") // TODO: show toast
      return
    }
    onSubmit(input)
    setInput('')
    onBlur()
  }
  const onCancel = () => {
    setInput('')
    onBlur()
  }

  return <>
    <Modal title="Create new workspace" visible={visible} onOk={onOk} onCancel={onCancel}>
      <Input placeholder="Enter workspace name" value={input} onChange={(e) => setInput(e.target.value)} />
    </Modal>
  </>
}

function ModalRename({ visible, onBlur, onSubmit }) {
  const [input, setInput] = useState('')
  let title = 'Change workspace name'
  let onOk = () => {
    if (!input) throw new Error('workspace name should not be empty')
    onSubmit(input)
    onBlur()
  }

  return <Modal title={title} visible={visible} onOk={onOk} onCancel={onBlur}>
    <Input placeholder="Enter new workspace name"
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  </Modal>
}

function ModalDeleteWS({ visible, onBlur, onSubmit }) {
  let title = 'Delete workspace'
  let onOk = () => {
    onSubmit()
    onBlur()
  }
  return <Modal title={title} visible={visible} onOk={onOk} onCancel={onBlur}>
    <strong><p>
      Do you want to delete this workspace?
    </p></strong>
  </Modal>
}