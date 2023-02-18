import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, Upload, message, Typography, Card } from 'antd';
import { useRegister } from 'hooks/auth';
import { LOGIN } from 'lib/routes';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const { Title } = Typography;

export default function Register() {

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [gender, setGender] = useState(1);
    const reader = new FileReader();

    const handleRadio = (e) => {
        setGender(e.target.value);
    }

    const handleChange = ({ fileList }) => {
        //console.log("setting image");
        setImageUrl("");
        setLoading(true);
        reader.readAsDataURL(fileList[fileList.length - 1].originFileObj);
        reader.addEventListener("load", () => {
            // convert image file to base64 string
            setImageUrl(reader.result);
            setLoading(false);
        }, false);


    };

    const uploadButton = (
        <div >
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    const { register, isLoading } = useRegister();

    const onFinish = (values) => {
        //console.log('Success:', values);
        register({
            email: values.email,
            password: values.password,
            fullname: values.fullname,
            avatar: imageUrl,
            gender: gender
        })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };




    return (
        <div className='container-fluid'>
            <Card title={<Title level={3} style={{ textAlign: 'center' }} >Register</Title>}>


                <Form layout='vertical'
                    //style={{ maxWidth: 500 }}
                    name="basic"

                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >

                    <Form.Item
                        required={false}
                        label="Full Name:"
                        name="fullname"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your full name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Upload Profile Picture (Optional):" valuePropName="fileList">
                        <Upload
                            multiple={false}
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            action="/upload.do"
                            showUploadList={false}
                            beforeUpload={() => false}
                            onChange={handleChange}
                        >
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt="avatar"
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            ) : (
                                uploadButton
                            )}
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        required={false}
                        label="Email:"
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
                    <Form.Item onChange={handleRadio} value={setGender} label="Gender:">
                        <Radio.Group >
                            <Radio value="male"> Male </Radio>
                            <Radio value="female"> Female </Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        required={false}
                        label="Password:"
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
                            Already have an account?{" "}<Link to={LOGIN}>Login</Link>{" "}instead!
                        </Typography>
                    </Form.Item>

                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Register
                    </Button>
                </Form>
            </Card>
        </div>
    )
}

