import DBTask from './DBTask';
import './listtask.scss';
import { Row, Col } from 'antd';

export default function ListTasks(props) {
    const { id, name, list } = props
    const tasks = list.filter((task) => task.workspace === id)
    return (
        <div>
            <div className="list-task-contain">
                <div className="list-title">{name}</div>
                <div className="tasks-contain">
                    <Row gutter={[16, 8]}>
                        {tasks.map((task) => (
                            <Col key={task.id} span={6} className="gutter-row">
                                <DBTask 
                                    key={task.id} 
                                    id={task.id}
                                    task={task} 
                                    name={task.name} 
                                    progression={task.progression} 
                                    deadline={task.deadline} 
                                    priority={task.priority}
                                    tags={task.tag}
                                    memberIdList={task.memberIdList}
                                />
                            </Col>)
                        )}
                    </Row>
                </div>
            </div>
        </div>
    )
}