import React from 'react';
import "./DBTask.scss";
import { Card, Avatar, Progress, Tag } from 'antd';
import { AppContext } from '../../../context/AppProvider';
import { ViewContext, Field } from '../../../context/ViewProvider';
import { useContext } from 'react';

function priorityToColor(priority) {
  const ColorPallete = ['6px solid green', '6px solid orange', '6px solid red', ''];
  switch (priority) {
    case 'Low': return ColorPallete[0]
    case 'Medium': return ColorPallete[1]
    case 'High': return ColorPallete[2]
    default: return ''
  }
}

export default function DBTask(props) {
  const {isFieldVisible} = useContext(ViewContext);
  const { DBmemberList, setDBTask, setVisibleDBTask } = React.useContext(AppContext);
  const members = DBmemberList.filter((member) => props.memberIdList.includes(member.uid))

  let borderRight = isFieldVisible(Field.PRIORITY) ? priorityToColor(props.priority) : '' 
  return (
    <div className="task-card-container">
      <Card
        hoverable
        bordered={true}
        style={{
          cursor: 'pointer',
          borderRadius: '5px',
          borderRight: borderRight
        }}
        bodyStyle={{ padding: '4%', minheight: '150px'}}
        onClick={() => {
          setDBTask({ ...props.task });
          setVisibleDBTask(true);
        }}
      >
        <div style={{ display: 'flex' }}>
          <p className="title">{props.name}</p>
          {(isFieldVisible(Field.MEMBER)) && 
          <Avatar.Group style={{ marginLeft: 'auto', marginRight: 0 }}>
              {
                members.map((member) => (
                  <Avatar key={member.uid} src={member.avaURL} />
                ))
              }
          </Avatar.Group>
          }
        </div>
        {isFieldVisible(Field.PROGRESS) &&
        <div style={{ marginTop: '-15px' }}>
          <Progress
            percent={props.progression}
            status="active"
            showInfo={false}
            strokeColor="#805454"
            trailColor="#c4c4c4"
            style={{ width: '100%' }}
          />
        </div>
        }
        {
          isFieldVisible(Field.DEADLINE) && 
          props.deadline !== "" &&
          <div style={{ marginTop: '5px'}}>
            <p className="date">{props.deadline}</p>
          </div>
        }
        
        <div style={{ marginTop: '0px', float: 'right'  }}>
          {props.tags.map((T, idx) => {
            return(
              <Tag style={{
                fontFamily: 'arial',
                fontWeight: 'bold',
                fontSize: '14px'
              }}>
                {T.length > 7 ? T.slice(0, 7) + '...' : T}
              </Tag>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
