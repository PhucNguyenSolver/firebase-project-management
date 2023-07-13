import { useState, useContext } from "react";
import { Button, Menu, Select } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { ViewContext, Field, Sort } from "../../../context/ViewProvider";

const { Option } = Select;


export default function SortMenu() {
  const { sortOptions, setSortOptions } = useContext(ViewContext);
  const [allowedOptions, setAllowedOptions] = useState([
    { id: Field.NAME, value: Sort.ASC },
    { id: Field.DEADLINE, value: Sort.ASC },
    { id: Field.PRIORITY, value: Sort.ASC },
    { id: Field.PROGRESS, value: Sort.ASC },
  ]);
  const [selectedOptions, setSelectedOptions] = [sortOptions, setSortOptions];

  const handleChange = (victimId, candidate) => {
    const ref1 = selectedOptions.find(f => f.id === victimId);
    const ref2 = allowedOptions.find(f => f.id === candidate);
    const temp = ref1.id;
    ref1.id = ref2.id;
    ref2.id = temp;
    setAllowedOptions(allowedOptions);
    setSelectedOptions([...selectedOptions]);
  };
  const handleChangeValue = (rule, newValue) => {
    rule.value = newValue;
    setAllowedOptions(allowedOptions);
    setSelectedOptions([...selectedOptions]);
  }
  const handleRemoveRule = (victimId) => {
    const pos = selectedOptions.findIndex(f => f.id === victimId);
    const victim = selectedOptions.splice(pos, 1)[0];
    setAllowedOptions([...allowedOptions, victim]);
    setSelectedOptions([...selectedOptions]);
  };
  const handleAddRule = () => {
    if (!allowedOptions || allowedOptions.length === 0) {
      return;
    }
    const victim = allowedOptions.pop();
    setAllowedOptions(allowedOptions);
    setSelectedOptions([...selectedOptions, victim]);
  };

  return (
    <Menu className="my-menu">
      {
        selectedOptions
          .filter(sortRule => sortRule.value != null)
          .map((sortRule) => (
          <Menu.Item key={sortRule.id}>
              <div>
                <Select
                  defaultValue={sortRule.id}
                  style={{ width: "7rem" }}
                  onChange={(candidate) => handleChange(sortRule.id, candidate)}
                >
                  {allowedOptions.map((option) => (
                    <Option label={option.id} key={option.id} value={option.id}>
                      {option.id}
                    </Option>
                  ))}
                </Select>{' '}
                <Select
                  defaultValue={sortRule.value}
                  style={{ width: "8rem" }}
                  onChange={(value) => handleChangeValue(sortRule, value)} // TODO
                >
                  <Option value={Sort.ASC}>{Sort.ASC}</Option>
                  <Option value={Sort.DESC}>{Sort.DESC}</Option>
                </Select>
                <span style={{ marginLeft: "10px" }}>
                  <Button
                    onClick={() => handleRemoveRule(sortRule.id)}
                    size='small'
                    icon={<CloseOutlined />}
                  />
                </span>
            </div>
          </Menu.Item>
          ))
      }
      <Menu.Item key="_addsort">
        <div onClick={handleAddRule}>
          <PlusOutlined /> Add a sort
        </div>
      </Menu.Item>
    </Menu>
  );
}