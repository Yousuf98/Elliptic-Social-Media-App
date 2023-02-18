import { Avatar, Card, Typography } from 'antd'
import { formatDistanceToNow } from "date-fns";
import { useUser } from "hooks/users";
const { Title, Paragraph, Text, Link } = Typography;
function Header({ uid, date }) {
    //const { uid, date } = post;
    const { user, isLoading } = useUser(uid);

    if (isLoading) return "Loading...";

    return (
        <div>
            <Avatar src={isLoading ? "" : user.avatar} style={{ display: "inline-block", marginRight: '12px', backgroundColor: '#D3D3D3', color: '#5A5A5A', }}>{user.fullname.match(/\b(\w)/g).join('')}</Avatar>
            <Text >
                {user.fullname}
            </Text>
        </div>
    );
}

export default function Post({ post }) {
    const { uid, text, date } = post;
    return (
        <Card style={{marginBottom:"20px"}} type='inner'
            title={<Header uid={uid} date={date} />}
            extra={<Text disabled style={{ display: "inline-block" }}>
                {formatDistanceToNow(date)} ago
                </Text>}
            
        >
            <Paragraph>
                {post.text}
            </Paragraph>
        </Card>
    )
}
