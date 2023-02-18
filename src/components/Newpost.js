import { Button, Card, Form, Input, notification,Typography } from 'antd';
import { useAuth } from 'hooks/auth';
import { useAddPost } from 'hooks/posts';

const { Title} = Typography;

export default function Newpost() {


    const openNotification = () => {
        notification.open({
          message: 'Post submitted!',
          duration: 2,
          placement:'top'
        });
      };

    const { TextArea } = Input;
    const { addPost, isLoading: addingPost } = useAddPost();
    const { user, isLoading: authLoading } = useAuth();
    const [form] = Form.useForm();
    const onFinish = (values) => {
        addPost({
            uid: user.uid,
            text: values.postmessage
        });
        form.resetFields();
        openNotification();
      };
    return (
        <div className="container-fluid">
        <Card title={<Title level={3} style={{textAlign:'center'}} >Create Post</Title>}>
        <Form form={form} onFinish={onFinish}>
            <Form.Item
                required={false}
                //label="Create a new post..."
                name="postmessage"
                rules={[
                    {
                        required: true,
                        message: 'Post cannot be empty!',
                    }
                ]}
            >
                <TextArea rows={4} placeholder="Create a new post..." style={{ resize: 'none' }} />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={addingPost || authLoading}>
                Post
            </Button>
        </Form>
        </Card>
        </div>
    )
}
