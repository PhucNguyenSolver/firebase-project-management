import React from 'react';
import { AppContext } from '../../../context/AppProvider';
import ModalViewTask from '../../modal/ModalViewTask';

// Data got from DB

// const TaskInfo = {
//     taskID: "123683",
//     title: 'Hello',
//     createDate: "2/12/2021",
//     deadline: "4/12/2021",
//     Name: "Dieu Ai",
//     priority: "Medium",
//     tag: ['OS', 'Assignment'],
//     assignTo: ['a1', 'a3'],
//     progress: 40,
//     desc: "Sample Text Sample Text Sample Text Sample Text Sample Text"
// }


export default function ModalViewTaskFromDashboard() {
    const { visibleDBTask, setVisibleDBTask, curDBTask: task, DBmemberList } = React.useContext(AppContext);

    function convertIDtoName(uid) {
        return DBmemberList.find(o => o.uid === uid)?.name;
    }

    const assignees = task.memberIdList.map(memId => convertIDtoName(memId))

    return <ModalViewTask
        visible={visibleDBTask}
        onBlur={() => setVisibleDBTask(false)}
        data={{
            title: task.name,
            createDate: task.createDate,
            dl: task.deadline,
            priority: task.priority,
            tags: task.tag,
            AA: task.memberIdList,
            prog: task.progression,
            desc: task.description,
            assignees: assignees,
        }}
    />
}