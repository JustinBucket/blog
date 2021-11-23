import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";

export default function NavBar() {
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header exact as={NavLink} to='/'>
                    <img
                        className="logo-image"
                        src="/assets/logo.png"
                        alt="logo"
                        style={{ marginRight: "10px" }}
                    />
                    Bucket Blog
                </Menu.Item>
                <Menu.Item>
                    <Button
                        positive
                        content="Create Post"
                        as={NavLink}
                        to='/createPost'
                    />
                </Menu.Item>
                <Menu.Item name="All posts" as={NavLink} to='/posts'/>
                <Menu.Item name="About" as={NavLink} to='/about'/>
            </Container>
        </Menu>
    );
}
