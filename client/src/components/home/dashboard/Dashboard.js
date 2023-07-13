import React, { useContext } from 'react';
import { Typography, Avatar, Tooltip, Checkbox } from 'antd';
import "./dashboard.scss";
import "../../main/task.scss";
import ListTask from './ListTasks';
import ViewDBTask from './ViewDBTask';
import { Field, ViewContext } from "context/ViewProvider";
import { AuthContext } from 'context/AuthProvider';
import { AppContext } from 'context/AppProvider';


const { Title } = Typography;

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const { dashboardTask, workspaceList, visibleDBTask } = useContext(AppContext);

  const { setFieldVisible, isFieldVisible } = useContext(ViewContext);
  const selectedFields = [
    { id: Field.PRIORITY, name: "Priority" },
    { id: Field.MEMBER, name: "Assignee" },
    { id: Field.DEADLINE, name: "Due-date" },
    { id: Field.PROGRESS, name: "Progress" },
  ];
  const fields = selectedFields.map(f => ({
    id: f.id,
    name: f.name,
    active: isFieldVisible(f.id),
  }));

  const handleChange = (victimId, newState) => {
    setFieldVisible(victimId, newState);
    console.log({ fields });
  };


  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-subbar">
          <Title level={4}>Your Dash Board</Title>
        </div>
        <div className='flex'>
          {fields.map((f) => (
            <ToggleItem
              key={f.id}
              id={f.id}
              name={f.name}
              isActive={f.active}
              handleChange={handleChange}
            />
          ))}
          <div className='Avatar'>
            <Tooltip title={user.displayName} placement="top">
              <Avatar className='img' size="large" style={{ color: '#f56a00', backgroundColor: '#fde3cf', marginLeft: "10px" }} key={user.uid} src={user.photoURL} />
            </Tooltip>
          </div>
        </div>
      </div>
      {visibleDBTask && <ViewDBTask></ViewDBTask>}
      {workspaceList.map((item) => {
        for (let i = 0; i < dashboardTask.length; i++) {
          if (dashboardTask[i].workspace === item.id) {
            return (
              <ListTask key={item.id} id={item.id} name={item.name} list={dashboardTask} />
            )
          }
        }
      })}
    </div>
  )
}


function ToggleItem({ id, name, isActive, handleChange = (id, newState) => { } }) {
  const onChange = (newState) => {
    handleChange(id, newState);
  };
  const handleClick = () => {
    handleChange(id, !isActive);
  };

  return (
    <div class="container" key={id}
      style={{
        flexDirection: 'row', justifyContent: 'space-between',
        backgroundColor: '#f0f0f0',
        padding: '.3rem',
        marginLeft: '1rem'
      }}>
      <span>
        {/* <span className="col-9" onClick={handleClick}>{"FU"}</span> */}
        <CustomSwitch checked={isActive} onChange={onChange} />
      </span>
      <span style={{
        float: 'right', marginLeft: '.6rem'
      }}>
        {/* <span className="col-9" onClick={handleClick}>{"FU"}</span> */}
        <div className="col-9" style={{ wordBreak: "keep-all" }} onClick={handleClick}>{name}</div>
      </span>
    </div>
  )
}

function CustomSwitch({ checked, onChange }) {
  const handleChange = (e) => {
    onChange(e.target.checked);
  };
  return (<>
    <Checkbox checked={checked} onChange={handleChange} />
  </>);
}