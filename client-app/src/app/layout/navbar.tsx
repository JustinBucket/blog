import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default function NavBar() {
    const { postStore } = useStore();

    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
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
                        onClick={() => postStore.openForm()}
                        positive
                        content="Create Post"
                    />
                </Menu.Item>
                <Menu.Item name="All posts" />
                <Menu.Item name="About" />
            </Container>
        </Menu>
    );
}
