import React from 'react';
import { Button } from 'antd';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import logo from './logoDelta.png';
import './index.scss';
import { facebookLoginHandler, googleLoginHandler, passwordLoginHandler } from "../../services/auth"


export default function Login({ onSuccess = () => { } }) {
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
            // onClick={() => googleLoginHandler().catch(alertError)}
            onClick={async () => {
              try {
                await googleLoginHandler()
                onSuccess && onSuccess()
              } catch (e) {
                alertError(e)
              }
            }}
          >
            <GoogleOutlined style={{ fontSize: '18px' }} />Đăng nhập bằng Google
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
            onClick={() => facebookLoginHandler().catch(alertError)}
          >
            <FacebookOutlined style={{ fontSize: '18px' }} />Đăng nhập bằng Facebook
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
            onClick={() => passwordLoginHandler().catch(alertError)}
          >
            Phương thức khác
          </Button>
        </div>
      </div>
    </div>
  )
}
