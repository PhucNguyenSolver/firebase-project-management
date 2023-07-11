import React from 'react';
import { Button } from 'antd';
import { GoogleOutlined, FacebookOutlined, UserOutlined } from '@ant-design/icons';
import logo from './logoDelta.png';
import './index.scss';
import { useHistory, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';


export default function Login() {
  let location = useLocation()
  let history = useHistory()
  let { user, loginWith, loginGuest } = React.useContext(AuthContext)

  React.useEffect(() => {
    if (user) {
      let from = location?.state?.from || "/"
      history.replace(from)
    }
  }, [user])

  const alertError = (any) => {
    console.error(any)
    if (typeof any == "string") alert(any)
    else alert("Cannot login. \nPlease check your internet connection or choose another method.")
  }

  const onSuccess = () => { }

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
            onClick={() => loginGuest().then(onSuccess).catch(alertError)}
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
            onClick={() => loginWith("facebook").then(onSuccess).catch(alertError)}
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
              background: '#D62D20',
              color: 'white',
              fontSize: '16px'
            }}
            onClick={() => loginWith("google").then(onSuccess).catch(alertError)}
          >
            <GoogleOutlined style={{ fontSize: '18px' }} />Login with Google&nbsp;&nbsp;&nbsp;
          </Button>
        </div>
      </div>
    </div>
  )
}
