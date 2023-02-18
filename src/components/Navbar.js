import { MenuOutlined, HomeFilled, PlusCircleFilled, LogoutOutlined } from '@ant-design/icons';
import { Avatar, Button, Drawer, Menu } from 'antd'
import MenuItem from 'antd/es/menu/MenuItem';
import { DASHBOARD, LOGIN, NEWPOST, USERPROFILE } from 'lib/routes';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "App.css";
import { useLogout } from "hooks/auth";
import { useUser } from 'hooks/users';


export default function Navbar({ user }) {
    const { logout, isLoading } = useLogout();
    const { user: currentUser, isLoading: userLoading } = useUser(user.uid);
    //console.log(currentUser);
    function AppMenu({ isInline = false }) {
        return (
            <Menu style={{ display: 'block' }} mode={isInline ? "inline" : "horizontal"} >
                <MenuItem  onClick={()=>setOpenMenu(false)}>
                    <Avatar src={userLoading ? "" : currentUser.avatar} style={{ display: "inline-block", marginRight: '12px', backgroundColor: '#D3D3D3', color: '#5A5A5A', }}>{
                        userLoading ? "" :
                            currentUser.fullname.match(/\b(\w)/g).join('')
                    }</Avatar>
                    <Link to={USERPROFILE}>My Profile</Link>
                </MenuItem>
                <MenuItem onClick={()=>setOpenMenu(false)}>
                    <HomeFilled style={{ marginRight: "8px" }} />
                    <Link to={DASHBOARD}>Home</Link>
                </MenuItem>
                <MenuItem onClick={()=>setOpenMenu(false)}>
                    <PlusCircleFilled style={{ marginRight: "8px" }} />
                    <Link to={NEWPOST}>New Post</Link>
                </MenuItem>
                <MenuItem onClick={()=>setOpenMenu(false)} style={{ float: 'right' }}>
                    <LogoutOutlined style={{ marginRight: "8px" }} />
                    <Link onClick={logout} >
                        Logout
                    </Link>
                </MenuItem>
            </Menu>
        )
    }


    const [openMenu, setOpenMenu] = useState(false);
    return (
        <div style={{ marginBottom: "30px" }}>
            <div style={{ paddingLeft: "4px", paddingTop: "12px" }} className="menuIcon">
                <MenuOutlined onClick={() => { setOpenMenu(true) }} />
            </div>

            <div className='headerMenu'>
                <AppMenu />
            </div>
            <Drawer width={300} placement='left' open={openMenu} onClose={() => { setOpenMenu(false) }} closable={false}>
                <AppMenu isInline={true} />
            </Drawer>
        </div>
    )
}


