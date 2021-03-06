import React, { useContext, useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/auth'
import { NotificationContext } from '../../context/notification'

import './Navbar.css'

const Navbar = () => {

    const { user, logout } = useContext(AuthContext)
    const { addNotification } = useContext(NotificationContext)

    const pathname = window.location.pathname

    const path = pathname === '/' ? 'home' : pathname.substr(1)
    const [activeItem, setActiveItem] = useState(path)

    const handleItemClick = (e, { name }) => setActiveItem(name)
    const handleLogout = () => {
        logout()
        addNotification({ message: 'Logged out succesfully', type: 'success' })
    }

    const menuBar = user ? (
        <Menu pointing secondary size="large" color="teal" className="menu-container">

            <Menu.Menu position="right" style={{ 'paddingRight': '2%' }}>
                <Menu.Item
                    className="menu-item"
                    name="home"
                    active={activeItem === 'home'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/"
                />
                <Menu.Item
                    className="menu-item"
                    name="posts"
                    active={activeItem === 'posts'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/posts"
                />
                <div className="ui simple dropdown item">
                    {user.username}
                    <i className="dropdown icon"></i>
                    <div className="menu" style={{ 'margin': '10px !important' }}>
                        <Link className="item" to={`/user/${user.username}`}>Profile</Link>
                        <Link className="item" to={'/create-post'}>Create Post</Link>
                        <Link className="item" to={'/'} onClick={handleLogout}>Logout</Link>
                    </div>
                </div>
            </Menu.Menu>
        </Menu>
    ) : (
            <Menu pointing secondary size="large" color="teal" className="menu-container">
                <Menu.Item
                    className="menu-item"
                    name="home"
                    active={activeItem === 'home'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/"
                />
                <Menu.Item
                    className="menu-item"
                    name="posts"
                    active={activeItem === 'posts'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/posts"
                />
                <Menu.Menu position="right">
                    <Menu.Item
                        className="menu-item"
                        name="login"
                        active={activeItem === 'login'}
                        onClick={handleItemClick}
                        as={Link}
                        to="/login"
                    />
                    <Menu.Item
                        className="menu-item"
                        name="register"
                        active={activeItem === 'register'}
                        onClick={handleItemClick}
                        as={Link}
                        to="/register"
                    />
                </Menu.Menu>
            </Menu>
        )

    return menuBar
}

export default Navbar