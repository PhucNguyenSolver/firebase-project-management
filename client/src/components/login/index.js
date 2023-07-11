import React from 'react';
import { Button } from 'antd';
import { GoogleOutlined, FacebookOutlined, UserOutlined } from '@ant-design/icons';
import logo from './logoDelta.png';
import './index.scss';
import authService from "../../services/AuthService"
import { useHistory, useLocation } from 'react-router-dom';


export default function Login() {
  let location = useLocation()
  let history = useHistory()
  let { from } = location.state || { from: "/" }
  const onSuccess = () => history.replace(from)

  const alertError = (any) => {
    console.error(any)
    if (typeof any == "string") alert(any)
    else alert("Không thể đăng nhập. Vui lòng đăng nhập bằng phương thức khác.")
  }

  return (
    <div className="wrapper">
      <div className="login-wrapper">
        <div className="image-wrapper">
          <img
            src={logo} alt=""
            style={{
              borderRadius: '50%',
              width: '200px',
              height: '200px',
              border: '5px solid #1890ff'
            }}
          />
        </div>
        <div className="btn-wrapper">
          <Button
            style={{
              width: "350px",
              height: "40px",
              marginBottom: 7,
              background: '#4285f4',
              color: 'white',
              fontSize: '16px'
            }}
            onClick={() => authService.loginGuest().then(onSuccess).catch(alertError)}
          >
            <UserOutlined style={{ fontSize: '18px' }} />Login demo account
          </Button>
        </div>

        <div className="btn-wrapper">
          <Button
            style={{
              width: "350px",
              marginBottom: 7,
              height: "40px",
              background: '#3b5998',
              color: 'white',
              fontSize: '16px'
            }}
            onClick={() => authService.loginWith("facebook").then(onSuccess).catch(alertError)}
          >
            <FacebookOutlined style={{ fontSize: '18px' }} />Login with Facebook
          </Button>
        </div>

        <div className="btn-wrapper">
          <Button
            style={{
              width: "350px",
              marginBottom: 7,
              height: "40px",
              background: '#3b5998',
              color: 'white',
              fontSize: '16px'
            }}
            onClick={() => authService.loginWith("google").then(onSuccess).catch(alertError)}
          >
            <GoogleOutlined style={{ fontSize: '18px' }} />Login with Google
          </Button>
        </div>
      </div>
    </div>
  )
}
