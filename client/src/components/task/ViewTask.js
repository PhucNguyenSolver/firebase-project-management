import React, { useState } from 'react';
import { Input, Col, Row, Button, Modal } from 'antd';
import { DatePicker, Menu, Dropdown, message, Tag, Slider, Select } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import moment from 'moment';
import './index.scss';
import { AppContext } from '../../context/AppProvider';
import CommentSection from './CommentSection';
import { deleteDocumentById, editDocumentById } from '../../services/document.service';

const dateFormat = 'DD/MM/YYYY';

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

const { TextArea } = Input;
const { Option } = Select;

export default function ViewTask() {
    const { visibleTask, setVisibleTask, curTask, memberList, columns } = React.useContext(AppContext);
    const [PrevTitle, setPT] = useState(curTask.name);
    const [title, setTitle] = useState(curTask.name);

    const Author = memberList.find(member => member.uid === curTask.createdBy)?.name;
    const createDate = curTask.createDate;

    const [prevDl, setPDL] = useState(curTask.deadline);
    const [dl, setDl] = useState(curTask.deadline);

    const [prevPrio, setPP] = useState(curTask.priority);
    const [priority, setPriority] = useState(curTask.priority);
    
    const [prevStatus, setPrevStatus] = useState(curTask.statusId); // TODO
    const [status, setStatus] = useState(curTask.statusId);
    const statusNameById = (id) => columns.find(col => col.id === id)?.name;
    // console.log({status});
    // console.log(statusNameById (status));

    const [prevT, setPTag] = useState(curTask.tag);
    const [tags, setTags] = useState(curTask.tag);
    const [visibleTagInput, setVisibleTagInput] = useState(false);

    const [prevAA, setPAA] = useState(curTask.memberIdList);
    const [AA, setAA] = useState(curTask.memberIdList);

    const [prevProg, setPProg] = useState(curTask.progression);
    const [prog, setProg] = useState(curTask.progression);

    const [prevDesc, setPDesc] = useState(curTask.description);
    const [desc, setDesc] = useState(curTask.description);

    const [visibleDBox, setVisibleDBox] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const p = (
        <Menu onClick={(e) => { setPriority(e.key) }}>
            <Menu.Item key="Low">Low</Menu.Item>
            <Menu.Item key="Medium">Medium</Menu.Item>
            <Menu.Item key="High">High</Menu.Item>
        </Menu>
    );
    
    const menuStatus = (
      <Menu onClick={(e) => { setStatus(e.key) }}>
        {columns.map(column => (
          <Menu.Item key={column.id} id={column.id} name={column.name}>{column.name}</Menu.Item>
        ))}
      </Menu>
    );

    // Change Input Method
    function titleChange(event) {
        setTitle(event.target.value);
    }

    function dateChange(date, dateString) {
        setDl(dateString);
    }

    function tagClose(removedTag) {
        setVisibleTagInput(false);
        const ttags = tags.filter(tag => tag !== removedTag);
        setTags(ttags);
    }

    async function makeDBox() {
        setVisibleDBox(false);
        return;
    }

    const closeModal = async () => {
        await deleteDocumentById('task', curTask.id);

        await makeDBox();
        setVisibleTask(false);
    }

    function convertIDtoName(uid) {
        return memberList.find(o => o.uid === uid)?.name;
    }

    function showTagInput() {
        setVisibleTagInput(true);
    };

    function handleInputConfirm(e) {
        if (e.target.value !== "" && !tags.includes(e.target.value)) {
            const ttags = [...tags, e.target.value]
            setTags(ttags);
        }
        setVisibleTagInput(false);
    };

    function handleAA(value) {
        setAA(value);
    }

    function changeProg(value) {
        setProg(value);
    }

    function descChange(event) {
        setDesc(event.target.value);
    }

    //Save and Cancel
    async function saveChange(e) {
        if (title === '' || AA === []) {
            message.error('Not Enough Information');
        }
        else {
            await editDocumentById('task', curTask.id, {
                name: title,
                description: desc,
                priority: priority,
                deadline: dl,
                memberIdList: AA,
                progression: prog,
                tag: tags,
                createdBy: curTask.createdBy,
                createDate: curTask.createDate
            });
            
            if (prevStatus !== status) {
              const taskIdListById = (colId) => (
                columns.find(col => col.id === colId)?.taskIdList || []
              );
              await editDocumentById('column', prevStatus, {
                taskIdList: taskIdListById(prevStatus).filter(taskId => (taskId !== curTask.id)),
              });
              await editDocumentById('column', status, {
                taskIdList: [...taskIdListById(status), curTask.id],
              });
              setPrevStatus(status);
            }

            setPT(title);
            setPDL(dl);
            setPP(priority);
            setPTag(tags);
            setPAA(AA);
            setPProg(prog);
            setPDesc(desc);
            setEditMode(false);
        }

    }

    function cancelChange() {
        setTitle(PrevTitle);
        setDl(prevDl);
        setPriority(prevPrio);
        setTags(prevT);
        setAA(prevAA);
        setProg(prevProg);
        setDesc(prevDesc);
        setEditMode(false);
    }

    function closeAbrupt() {
        cancelChange();
        setEditMode(false);
        setVisibleTagInput(false);
        setVisibleTask(false);
    }

    return (
        <Modal className="TaskModal" visible={visibleTask} width={700} onCancel={closeAbrupt} footer={
            <div>
                {
                    editMode &&
                    <Button type="primary" onClick={saveChange}>Save</Button>
                }
                {
                    editMode &&
                    <Button type="secondary" onClick={() => { cancelChange(); setEditMode(false) }}>Cancel</Button>
                }
            </div>
        }>
            {/* Title */}
            <Row className="title-row">
                <Col span={15}>
                    <Input value={title} onChange={titleChange} placeholder="Title" size="large" bordered={false} readOnly={!editMode} />
                </Col>

                <div className="button-div">
                    {(!editMode &&
                        (<Col >
                            <Button onClick={() => { setEditMode(true) }}><EditOutlined /></Button>
                        </Col>))}
                    {!editMode &&
                        (<Col style={{ marginLeft: '10px' }}>
                            <Button onClick={() => setVisibleDBox(true)}><DeleteOutlined /></Button>
                        </Col>)}
                </div>

            </Row>

            <Modal
                centered
                visible={visibleTask && visibleDBox}
                onOk={closeModal}
                onCancel={() => setVisibleDBox(false)}
            >
                <h1>Do you want to delete this Task</h1>
            </Modal>

            {/* Date & Deadline */}
            <Row className="normal-row">
                <Col span={5} className="element-text">Create Date:</Col>
                <Col span={7}>
                    <input type="text" size={20} value={createDate} readOnly />
                </Col>
                <Col span={5} className="element-text align-pair">Due Date:</Col>
                <Col span={5}>
                    {!editMode
                        ? <input type="text" size={15} value={dl === "" ? "None" : dl} readOnly />
                        : <DatePicker value={dl !== "" ? moment(dl, dateFormat) : null} onChange={dateChange} format={dateFormat} />
                    }
                </Col>
            </Row>
            
            { editMode &&
            <Row className="normal-row">
            <Col span={5} className='element-text'>Status:</Col>
              <Col span={10}>
                <Dropdown disabled={!editMode} overlay={menuStatus}>
                    <Button> {statusNameById(status)} </Button>
                </Dropdown>
              </Col>
            </Row>}

            {/* Creator & Priority */}
            <Row className="normal-row">
                <Col span={5} className="element-text">Create By:</Col>
                <Col span={7}>
                    <input type="text" size={20} value={Author} readOnly />
                </Col >
                <Col span={5} className='element-text align-pair'>Priority:</Col>
                <Col span={5}>
                    {!editMode
                        ? <input type="text" size={10} value={priority} readOnly />
                        : <Dropdown disabled={!editMode} overlay={p}>
                            <Button> {priority} </Button>
                        </Dropdown>
                    }

                </Col>
            </Row>

            {/* Tag */}
            <Row className="normal-row">
                <Col span={5} className="element-text">Tag:</Col>
                {tags?.map((tag) => {
                    const isLongTag = tag.length > 7;
                    const tagElem = (
                        <Tag
                            key={tag}
                            closable={editMode}
                            onClose={() => tagClose(tag)}
                        >
                            <span style={{fontSize: '14px'}}> {isLongTag ? `${tag.slice(0, 7)}...` : tag} </span>
                        </Tag>
                    );
                    return tagElem;
                })}
                {editMode && <Col>
                    {(visibleTagInput && tags.length < 4) ? (
                        <Input
                            type="text"
                            size="small"
                            className="tag-input"
                            onBlur={(e) => handleInputConfirm(e)}
                            onPressEnter={(e) => handleInputConfirm(e)}
                            placeholder='Enter @Tag'
                        />
                    )
                        :
                        (
                            (tags.length < 4 &&
                                <Tag className="site-tag-plus" onClick={showTagInput}>
                                    <PlusOutlined /> New Tag
                                </Tag>)
                        )}
                </Col>}
            </Row>


            {/* Assigns */}
            <Row className="normal-row">
                <Col span={5} className="element-text">Assign to:</Col>
            </Row>

            <Row className="normal-row">
                {editMode
                    ? <Select
                        mode="multiple"
                        style={{ width: '100%', minWidth: '150px' }}
                        placeholder="Select person/people to assign"
                        value={AA}
                        closable={false}
                        optionLabelProp="label"
                        onChange={handleAA}
                    >
                        {memberList.map(member => {
                            return <Option key={member.uid} value={member.uid} label={member.name}>{member.name}</Option>
                        })}
                    </Select>
                    :
                    <div>
                        {AA.map((memberID) => {
                            const memElem = (
                                <Tag
                                    key={memberID}
                                    closable={false}
                                >
                                    {convertIDtoName(memberID)}
                                </Tag>
                            );
                            return memElem;
                        })}
                    </div>
                }
            </Row>

            {/* Progression */}
            <Row className="normal-row">
                <Col span={5} className="element-text">Progression:</Col>
                {editMode && <Col span={8}>
                    <Slider value={prog} onChange={changeProg} />
                </Col>}
                <Col span={4}>
                    {editMode ? <input type="text" size={10} value={prog + " %"} /> : <input type="text" size={10} value={prog + " %"} readOnly />}
                </Col>
            </Row>

            {/* Description */}
            <Row className="normal-row">
                <h1 className="element-text">Description:</h1>
            </Row>

            {/* DescTextArea */}
            <Row className="desc-row">
                <TextArea readOnly={!editMode} value={desc} onChange={descChange} placeholder="Description" autoSize={{ minRows: 5, maxRows: 10 }} />
            </Row>
            {!editMode && <CommentSection />}
        </Modal>
    )
}