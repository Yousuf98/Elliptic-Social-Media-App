import { Button, Card, Form, Input, Typography } from 'antd';
//import { Col, Row } from 'antd';

import { useLogin } from "hooks/auth";
import { DASHBOARD } from "lib/routes";
import { Link } from 'react-router-dom';
import { REGISTER } from 'lib/routes';
import "App.css";

const { Title} = Typography;

export default function Login() {

  const { login, isLoading } = useLogin();
  const onFinish = (values) => {
    //console.log('Success:', values);
    login({
      email: values.email,
      password: values.password,
      redirectTo: DASHBOARD,
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div style={{marginTop:"50px"}} className='container-fluid'>
      <Card title={<Title level={3} style={{textAlign:'center'}} >Login</Title>}>
          <Form layout='vertical'
            //style={{ maxWidth: 500 }}
            name="basic"

            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              required={false}
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
                {
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email address is not valid",
                }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              required={false}
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  min: 6,
                  message: 'Password must be at least 6 characters long',
                }
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item >
              <Typography >
              Do not have an account?{" "}<Link to={REGISTER}>Register</Link>{" "}instead!
              </Typography>
            </Form.Item>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Login
              </Button>
          </Form>
      </Card>
    </div>

  )
}
