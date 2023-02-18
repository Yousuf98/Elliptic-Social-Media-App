import React from 'react'
import { Typography } from 'antd'
import { Link } from 'react-router-dom';
import { REGISTER } from 'lib/routes';

const {Title} = Typography;

export default function Root() {
  return (
    <div style={{marginTop:'200px'}} className='container-fluid'>
        <Title >Welcome to Elliptic Social Media!</Title>
        <Link style={{alignContent:'center'}} to={REGISTER}>Click here to continue to sign up!</Link>
    </div>
  )
}
