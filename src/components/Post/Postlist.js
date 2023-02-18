import { Card, Typography } from 'antd'
import React from 'react'
import Post from './Post'

const {Title} = Typography

export default function Postlist({posts}) {
  return (
    <div >
      <Card style={{background: 'rgba(255,255,255,0.5)'}}>
      {posts?.length === 0 ? (
        <Title level={4} textAlign='center'>
          No posts yet... feeling a little lonely here
        </Title>
      ) : (
        posts?.map(post => <Post key={post.id} post={post} />)
      )}
      </Card>
    </div>
  )
}
