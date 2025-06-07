"use client"

import { FC, useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { MenuContext } from '@/app/main/layout'

// 

import { Container, Row, Col } from 'react-bootstrap'

// 

import styles from '@/components/element/Header/Header.module.css'

// components

import Header_profile from '../Header_Profile/Header_profile'
import MyButton from '@/components/UI/Button/MyButton'

// img

import logo from '@/asset/logo/logo.svg'
import emptyAvatar from '@/asset/header_profile/empty_avatar.svg'
import quitProfile from '@/asset/header_profile/header_quit.svg'

// fn

import { logOut } from '@/functions/logOutUser'

// types

import { MenuButtonType, UserType, CompanyArrType } from '@/types/types'

// api

import { getAllUsers } from '@/functions/users/getAllUsers'



const Header: FC = ():React.ReactNode  => {

  const { menuActive, setMenuActive } = useContext(MenuContext)
  const [menu, setMenu] = useState<string>('')
  const [user, setUser] = useState<UserType[]>([])




  const activeButtonStyle = {
    marginLeft: '2px',
    marginRight: '2px',
    width: '184px',
    height: '40px',
    borderRadius: '10px',
    color: 'white',
    backgroundColor: '#B23636',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  const buttonStyle = {
    marginLeft: '2px',
    marginRight: '2px',
    width: '184px',
    height: '40px',
    borderRadius: '10px',
    color: '#2A4587',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }


  useEffect(() => {
    const getUsers = async () => {
      const res = await getAllUsers();
      setUser(res);
    }

    getUsers()
  }, [])



  const menuButton: CompanyArrType[] = [
    {
      id: 1,
      label: 'Дизайнеры',
      value: 'designers',
      isActive: false
    },
    {
      id: 2,
      label: 'Монтажеры',
      value: 'editors',
      isActive: false
    },
    {
      id: 3,
      label: 'Продакшен',
      value: 'productions',
      isActive: false
    },
    {
      id: 4,
      label: 'Операторы',
      value: 'Operators',
      isActive: false
    }
  ]


  useEffect(() => {

    if (user.length > 0) {
      setMenuActive(user[0].company);
    }
  }, [user])
  

  const currentComopanyButton = menuButton.filter(item => item.value == menuActive)[0];

  
  return (

    <Container fluid style={{padding: '0px'}}>
        <Row className={`${styles.header_container} d-flex justify-content-center align-items-center`}>
            <Col md={3} className={`${styles.header_image}`}>

                <Image width={100} src={logo} alt='logo'/>

            </Col>


            <Col md={7} className={`${styles.header_menu} d-flex flex-row justify-content-around`}>
                <Col md={2}>
                    <div className={styles.header_menu_title}>{(currentComopanyButton) ? currentComopanyButton.label : menuActive}</div>
                </Col>

                <Col md={8} className={`${styles.header_menu_buttons} d-flex flex-row justify-content-around align-items-center`}>
                  {menuButton.map((item: CompanyArrType ): React.ReactNode => {
                    return <MyButton key={item.id} style={(item.value === menuActive) ? activeButtonStyle : buttonStyle} text={item.label} type={'button'} onClick={(e) => {
                      setMenu(item.label)
                      setMenuActive(item.value)
                    }}/>
                  })}
                </Col>
            </Col>



            <Col md={2} className={`${styles.header_profile} d-flex justify-content-end align-items-center`}>
              <Header_profile name={user[0]?.username || ''} avatar_img={(!user[0]?.avatar) ? emptyAvatar : user[0].avatar} quit_img={quitProfile} quit={() => {logOut()}}/>
            </Col>
        </Row>

        <Row>

            <div className={styles.header_line}></div>

        </Row>
    </Container>

  )
}

export default Header
