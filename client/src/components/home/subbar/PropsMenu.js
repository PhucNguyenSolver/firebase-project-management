import { useState, useContext } from "react";
import { Menu, Checkbox, Button } from "antd";
import { Field, ViewContext } from "../../../context/ViewProvider";

export default function PropsMenu() {
  const { setFieldVisible, isFieldVisible } = useContext(ViewContext);
  const selectedFields = [
    // { id: Field.NAME, name: "Name" },
    { id: Field.PRIORITY, name: "Priority" },
    { id: Field.MEMBER, name: "Assignee" },
    { id: Field.DEADLINE, name: "Due date" },
    { id: Field.PROGRESS, name: "Progress" },
  ];
  const fields = selectedFields.map(f => ({
    id: f.id,
    name: f.name,
    active: isFieldVisible(f.id),
  }));

  const handleChange = (victimId, newState) => {
    setFieldVisible(victimId, newState);
    // console.log({fields});
  };
  const handleChangeAll = (newState) => {
    fields.forEach(field => {
      setFieldVisible(field.id, newState);
    })
  };

  return (
    <div className="container props-menu">
      <Menu className="my-menu">
        {fields.map((f) => (
          <ItemToggle
            id={f.id}
            name={f.name}
            isActive={f.active}
            handleChange={handleChange}
          />
        ))}
        <ItemShowAll onChange={handleChangeAll} />
      </Menu>
    </div>
  );
}


function ItemToggle({ id, name, isActive, handleChange }) {
  const onChange = (newState) => {
    handleChange(id, newState);
  };
  const handleClick = () => {
    handleChange(id, !isActive);
  };
  return (
    <Menu.Item key={id}>
    <div class="container"
      style={{
        flexDirection: 'row', justifyContent: 'space-between',
        // backgroundColor: 'gray'
      }}>
      <span>
        <span className="col-9" onClick={handleClick}>{name}</span>
      </span>
      <span style={{
        // backgroundColor: 'pink',
        float: 'right', marginLeft: '3rem'
      }}>
          <Checkbox checked={isActive} onChange={(e) => onChange(e.target.checked)} />
      </span>
    </div>
    </Menu.Item>
  )
}

function ItemShowAll({ onChange }) {
  const [checked, setChecked] = useState();

  const onClick = () => {
    if (checked === undefined) setChecked(true);
    else setChecked(!checked);
    onChange(!checked);
  };

  return <Menu.Item key="nono">
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Button size="small" onClick={onClick} >
        {checked === true ? "Hide all" : "Show all"}
      </Button>
    </div>
  </Menu.Item>
}
