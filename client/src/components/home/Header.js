import React, { useState, useContext } from 'react';
import { AuthContext } from 'context/AuthProvider';
import { AppContext } from 'context/AppProvider';
import { Avatar, Tooltip, Button, Modal, Dropdown, Menu } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { editDocumentById, deleteDocumentById } from '../../firebase/service';
import AddMemberModal from '../modal/AddMemberModal';

import './header.scss';

export default function HeaderContainer() {

  const { user } = useContext(AuthContext);
  const { selectWorkspace, memberList, tasks } = useContext(AppContext);
  const [modalDeleteMember, setModalDelete] = useState()
  const [modalAddMember, setModalAddMember] = useState()

  const serviceDeleteMember = (deletePerson) => {
    tasks.forEach(task => {
      if (task.createdBy == deletePerson) {
        deleteDocumentById('task', task.id);
      }
      if (task.memberIdList.includes(deletePerson)) {
        editDocumentById('task', task.id, {
          memberIdList: [...task.memberIdList.filter(value => value !== deletePerson)]
        })
      }
    })
    editDocumentById('workspace', selectWorkspace.id, {
      memberIdList: [...selectWorkspace.memberIdList.filter(it => it !== deletePerson)]
    });
  }

  function checkUserCanDeleteMember(memberId) {
    let userIsOwner = user?.uid && user.uid === selectWorkspace?.createdById[0]
    return userIsOwner && user.uid != memberId
  }

  const onClickDeleteMember = (memberId) => {
    setModalDelete({
      visible: true,
      victim: memberId,
    })
  }

  const onConfirmDeleteMember = (memberId) => {
    serviceDeleteMember(memberId)
  }


  return (
    <div className="header">
      <div className="header-left">
        <h1>{selectWorkspace.name}</h1>
      </div>
      <div className="header-center">
        <Avatar.Group maxCount={4} size="large" maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
          {memberList.map((member) => (
              <Tooltip key={member.uid} title={member.name} placement="top">
                <Avatar key={member.uid} src={member.avaURL} />
              </Tooltip>
            )
          )}
        </Avatar.Group>
        <Dropdown overlay={(
          <Menu>
            <Menu.Item>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={() => setModalAddMember({ visible: true })}>
                  {"+  New Member"}
                </Button>
              </div>
            </Menu.Item>
            {
              memberList.map((member) => (
                <MemberMenuItem
                  name={member.name}
                  image={member.avaURL}
                  showDeleteOption={checkUserCanDeleteMember(member.uid)}
                  onClickDelete={() => onClickDeleteMember(member.uid)}
                />)
              )
            }
          </Menu>
        )} trigger={['click', 'hover']}>
          <Button type="dashed">Edit Member</Button>
        </Dropdown>

        <ModalDeleteMember
          visible={modalDeleteMember?.visible}
          onBlur={() => setModalDelete({})}
          onDelete={() => onConfirmDeleteMember(modalDeleteMember?.victim)}
          extra={modalDeleteMember}
        />
      </div>
      <div className="header-right">
        <HeaderProfile data={{
          name: user.displayName,
          image: user.photoURL
        }} />
      </div>

      <AddMemberModal
        visible={modalAddMember?.visible}
        onBlur={() => setModalAddMember({})}
      />
    </div>
  )
}




function HeaderProfile({ data }) {
  const { name, image } = data
  return <>
    <Tooltip title={name} placement="top">
      <Avatar src={image} size="large" style={{ color: '#f56a00', backgroundColor: '#fde3cf', marginLeft: "10px" }} />
    </Tooltip>
  </>
}

function ModalDeleteMember({ visible, onBlur = () => { }, onDelete = () => { alert('delete') }, extra }) {
  return <>
    <Modal open={visible}
      onCancel={onBlur}
      onOk={() => {
        onDelete()
        onBlur()
      }}
    >
      <strong><p>
          Do you want to delete member?
          {/* {JSON.stringify(extra)} */}
      </p></strong>
    </Modal>
  </>
}

function MemberMenuItem({ name, image, showDeleteOption = false, onClickDelete = () => { } }) {
  return <Menu.Item>
    <div
      className="row"
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <Avatar src={image} style={{ marginRight: "10px" }} />
        <span>{name}</span>
      </div>
      {
        showDeleteOption &&
        <Button
          onClick={onClickDelete}
          size='small'
          style={{ float: "right", marginLeft: "10px" }}
          icon={<CloseOutlined />}
        />
      }
    </div>
  </Menu.Item>
}