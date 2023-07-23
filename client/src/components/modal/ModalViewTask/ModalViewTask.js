import React from 'react';
import { Input, Col, Row, Modal } from 'antd';
import { Tag } from 'antd';
import './task.scss';

const { TextArea } = Input;


export default function ModalViewTask({
  visible,
  onBlur = () => { },
  data: {
    title,
    createDate,
    dl,
    priority,
    tags,
    prog,
    desc,
    assignees,
  } }) {
  return (
    <Modal className="TaskModal" open={visible} width={700} onCancel={onBlur} onOk={onBlur} footer={null}>
      {/* Title */}
      <Row className="title-row">
        <Col span={15}>
          <Input value={title} placeholder="Title" size="large" bordered={false} readOnly={true} />
        </Col>
      </Row>

      {/* Date & Deadline */}
      <Row className="normal-row">
        <Col span={5} className="element-text">Create Date:</Col>
        <Col span={7}>
          <input type="text" size={20} value={createDate} readOnly />
        </Col>
        <Col span={5} className="element-text align-pair">Due Date:</Col>
        <Col span={5}>
          <input type="text" size={15} value={dl === "" ? "None" : dl} readOnly />
        </Col>
      </Row>

      {/* Creator & Priority */}
      <Row className="normal-row">
        <Col span={5} className='element-text'>Priority:</Col>
        <Col span={5}>
          <input type="text" size={10} value={priority} readOnly />
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
              closable={false}
            >
              <span style={{ fontSize: '14px' }}> {isLongTag ? `${tag.slice(0, 7)}...` : tag} </span>
            </Tag>
          );
          return tagElem;
        })}
      </Row>


      {/* Assigns */}
      <Row className="normal-row">
        <Col span={5} className="element-text">Assign to:</Col>
      </Row>

      <Row className="normal-row">
        <div>
          {assignees.map((name, idx) => (
            <Tag key={name} closable={false}>
              {name}
            </Tag>
          ))}
        </div>
      </Row>

      {/* Progression */}
      <Row className="normal-row">
        <Col span={5} className="element-text">Progression:</Col>
        <Col span={4}>
          <input type="text" size={10} value={prog + " %"} readOnly />
        </Col>
      </Row>

      {/* Description */}
      <Row className="normal-row">
        <h1 className="element-text">Description:</h1>
      </Row>

      {/* DescTextArea */}
      <Row className="desc-row">
        <TextArea readOnly={true} value={desc} placeholder="Description" autoSize={{ minRows: 5, maxRows: 10 }} />
      </Row>
    </Modal>
  )
}