import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { Card, Button, Form, Input, Radio, Upload, message, Typography } from 'antd';
import { useAuth, useUpdateInfo } from 'hooks/auth';
import { useUser } from 'hooks/users';
import { useEffect, useState } from 'react';

const {Title} = Typography;

export default function Profile() {
  const {user, isLoading} = useAuth();
  const [loadingImage, setLoadingImage] = useState(false);
  const reader = new FileReader();
  const {user: currentUser, isLoading: userLoading} = useUser(user.uid);
  
  
  useEffect(()=>{
    if(isLoading || userLoading){ 
    }
    else{
      setImageUrl(currentUser.avatar);
      setGender(currentUser.gender=="male"?"male":"female");
      //console.log(currentUser.gender);
    }
    
},[userLoading,isLoading]);



  const { update, isLoading:updateLoading } = useUpdateInfo();
  const [imageUrl, setImageUrl] = useState("");
  const [gender, setGender] = useState(1);
  // const [imageUrl, setImageUrl] = useState(currentUser.avatar);
  // const [gender, setGender] = useState(currentUser.gender=="male"?1:2);
  
  const uploadButton = (
    <div>
      {loadingImage ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const handleChange = ({ fileList }) => {
    setImageUrl("");
    setLoadingImage(true);
    reader.readAsDataURL(fileList[fileList.length - 1].originFileObj);
    reader.addEventListener("load", () => {
      // convert image file to base64 string
      setImageUrl(reader.result);
      setLoadingImage(false);
    }, false);


  };
  const handleRadio = (e) => {
    setGender(e.target.value);
  }
  const onFinish = (values) => {
    //console.log('Success:', values);
    update({
      fullname: values.fullname,
      avatar: imageUrl,
      gender: gender
    })
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if (userLoading || isLoading) return "Loading...";
  return (
    <div className="container-fluid">
    <Card title={<Title level={3} style={{textAlign:'center'}} >Update your information</Title>} >
      <Form layout='vertical'
        //style={{ maxWidth: 500 }}
        name="basic"

        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          required={false}
          label="Update Full Name:"
          name="fullname"
          
          rules={[
            {
              required: true,
              message: 'Please input your full name!',
            },
          ]}
        >
          <Input defaultValue={currentUser.fullname}/>
        </Form.Item>
        <Form.Item label="Update Profile Picture:" valuePropName="fileList">
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
        
        <Form.Item onChange={handleRadio} value={setGender} label="Update Gender:">
          <Radio.Group defaultValue={gender}>
            <Radio value="male"> Male </Radio>
            <Radio value="female"> Female </Radio>
          </Radio.Group>
        </Form.Item>
        


        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Update
        </Button>
      </Form>
    </Card>
    </div>
  )
}
