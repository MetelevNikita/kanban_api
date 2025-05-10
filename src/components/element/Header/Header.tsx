"use client"

import { FC, useEffect, useState } from 'react'
import Image from 'next/image'

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

// redux

import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { fetchSingleUser } from '@/app/lib/slice/userSlice'

// fn

import { logOut } from '@/functions/logOutUser'

// types

import { MenuButtonType } from '@/types/types'



const Header: FC = ():React.ReactNode  => {


  const [menuActive, setMenuActive] = useState<string>('')
  const [menu, setMenu] = useState<string>('')


  const menuButton: MenuButtonType[] = [
    {
      name: 'designers',
      label: 'Дизайнеры',
      isActive: false
    },
    {
      name: 'Editors',
      label: 'Монтажеры',
      isActive: false
    },
    {
      name: 'Production',
      label: 'Продакшен',
      isActive: false
    },
    {
      name: 'Operators',
      label: 'Операторы',
      isActive: false
    }
  ]


  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user.user)


  useEffect(() => {

    if (typeof window !== 'undefined') { // Проверяем, что код выполняется в браузере
      const id = sessionStorage.getItem('userId');

      if(!id) {
        return
      }

      dispatch(fetchSingleUser(JSON.parse(id)))
    }

  }, [dispatch])



  return (

    <Container fluid>
        <Row className={`${styles.header_container} d-flex justify-content-center align-items-center`}>
            <Col md={3} className={`${styles.header_image}`}>

                <Image width={226} src={logo} alt='logo'/>

            </Col>


            <Col md={7} className={`${styles.header_menu} d-flex flex-row justify-content-around`}>


                <Col md={2}>
                    <div className={styles.header_menu_title}>{menu}</div>
                </Col>


                <Col md={8} className={`${styles.header_menu_buttons} d-flex flex-row justify-content-around align-items-center`}>

                  {menuButton.map((item: MenuButtonType, index: number): React.ReactNode => {
                    return <MyButton key={index+1} color={(item.label === menuActive) ? 'button_active' : 'button'} text={item.label} type={'button'} onClick={(e) => {
                      
                      console.log(item)
                      setMenu(item.label)
                      setMenuActive(item.label)
          
                    }}/>
                  })}

                </Col>


              

            </Col>



            <Col md={2} className={`${styles.header_profile} d-flex justify-content-end align-items-center`}>

              <Header_profile name={user[0]?.username || ''} avatar_img={(!user[0]?.avatar) ? emptyAvatar : user[0].avatar} quit_img={quitProfile} quit={() => {logOut()}}/>

            </Col>
        </Row>
    </Container>

  )
}

export default Header
