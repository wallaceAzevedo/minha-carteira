import React from 'react';

import logoImg from '../../assets/logo.svg';

import {useAuth} from '../../hooks/auth'

import {
    Container,
    Header,
    LogImg,
    Title,
    MenuContainer,
    MenuItemLink,
    MenuItemButton

} from './styles';

import {
    MdDashboard,
    MdArrowDownward,
    MdArrowUpward,
    MdExitToApp

} from 'react-icons/md';

const Aside: React.FC = () => {
    const {signOut} = useAuth();
    return (
        <Container menuIsOpen={true}>
            <Header>
               <LogImg src={logoImg} alt="Logo Minha Carteira"/>
               <Title>Minha Carteira</Title>
            </Header>
            <MenuContainer>
                <MenuItemLink href="/">
                    <MdDashboard/>
                    Dashboard
                </MenuItemLink>

                <MenuItemLink href="/list/entry-balance">
                   <MdArrowUpward/> 
                    Entradas
                </MenuItemLink>

                <MenuItemLink href="/list/exit-balance">
                   <MdArrowDownward/> 
                    Saidas
                </MenuItemLink>

                <MenuItemButton onClick={signOut}>
                    <MdExitToApp/>
                    Sair
                </MenuItemButton>

            </MenuContainer>
        </Container>
    );
}

export default Aside;