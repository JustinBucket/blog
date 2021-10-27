import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

interface Props {
    openForm: () => void;
};

export default function NavBar({openForm}: Props) {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img className="logo-image" src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    Bucket Blog
                </Menu.Item>
                <Menu.Item>
                    <Button onClick={openForm} positive content='Create Post'/>
                </Menu.Item>
                <Menu.Item name='All posts'/>
                <Menu.Item name='About'/>
                
            </Container>
        </Menu>

    )
}