import { useState, useCallback, useContext } from "react";
import { Dropdown, Button, Input } from "antd";
import "./subbar.scss";
import SortMenu from "./SortMenu";
import PropsMenu from "./PropsMenu";
import { debounce } from "lodash";
import { SearchOutlined } from "@ant-design/icons";
import { ViewContext } from "context/ViewProvider";


const TIMEOUT = 300;
export default function Subbar() {
  const {setSearchString} = useContext(ViewContext);
  const [keyword, setKeyword] = useState("");
  const debounceFilter = useCallback(debounce((nextValue) => setSearchString(nextValue), TIMEOUT), [])
  const handleInputChange = (e) => {
    const nextValue = e.target.value;
    setKeyword(nextValue);
    debounceFilter(nextValue);
  }

  return (
    <div
      style={{
        width: '100%',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 16px',
      }}
    >

      <div type="primary" style={{ marginRight: 8 }}>
        <Dropdown overlay={<PropsMenu />}>
          <Button>Properties</Button>
        </Dropdown>
      </div>

      <div type="primary" style={{ marginRight: 8 }}>
        <Dropdown overlay={<SortMenu />}>
          <Button>Sort</Button>
        </Dropdown>
      </div>

      <div type="primary" style={{ marginRight: 8 }}>
        <Input
          value={keyword}
          onChange={handleInputChange}
          style={{ width: '10rem' }}
          prefix={<SearchOutlined />}
          placeholder="Search"
        />
      </div>
    </div>
  )
}