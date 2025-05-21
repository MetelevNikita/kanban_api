'use client'

import { FC, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useForm } from "react-hook-form"


// css

import styles from '@/app/login/page.module.css'

// bootstrap

import { Container, Row, Col } from 'react-bootstrap'

// fn

import { authUser } from '@/functions/authUser'
import { createUser } from '@/functions/createUser'

// components

import MyInput from '@/components/UI/Input/MyInput'
import MyButton from '@/components/UI/Button/MyButton'
import MySelector from '@/components/UI/Selector/MySelector'
import MyFile from '@/components/UI/File/MyFile'
import MyPassword from '@/components/UI/Password/MyPassword'

// img

import tgIcon from '@/asset/login_icon/tg_icon.svg'
import waIcon from '@/asset/login_icon/wa_icon.svg'

// types

import { CompanyArrType } from '@/types/types'

// 




const Login: FC = () => {

  const [activeButton, setActiveButton] = useState<string>('login')
  const [validError, setValidError] = useState<boolean>(false)
  const { register, handleSubmit, formState: {errors} } = useForm()

  const authSubmitData = async (formData: FormData): Promise<any> => {

    const data = await authUser(formData)
    if (data.message == "email not valid" || data.message == "Invalid password") {
      alert(data.message)
      setValidError(true)
    }
    sessionStorage.setItem('userId', data.message)
    window.location.href = '/main'
  }



  const createUserSubmitData = async (formData: FormData): Promise<any> => {

    const data = await createUser(formData)
    console.log(data)

    if (data.message === 'please enter all field' || data.message === 'password too short' || data.message === 'error create users') {
      alert(data.message)
      setValidError(true)
    }

      alert(data.message)
      sessionStorage.setItem('userId', data.message)
      setActiveButton('login')
  }




  const activeButtonStyle = {
    marginLeft: '2px',
    marginRight: '2px',
    width: '184px',
    height: '40px',
    borderRadius: '10px',
    color: 'white',
    backgroundColor: '#2A4587',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  const buttonCss = {
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


  console.log(activeButton)


  return (
    <Container className='d-flex flex-column justify-content-center align-items-center mb-4'>



      <Row className='d-flex justify-content-center align-items-center' style={{width: '100%'}}>
        <Col md={5}>
          <div style={{textAlign: 'center'}}>TaskPro+</div>
        </Col>
      </Row>



      <div className={styles.form_container}>

          <Row>
            <Col className='d-flex justify-content-center align-items-center mb-4' style={{width: '100%'}}>

              <div className={styles.login_title}>Добро пожаловать!</div>

            </Col>
          </Row>

          <Row>
            <Col className='d-flex justify-content-center align-items-center mb-4' style={{width: '100%'}}>

              <div className={styles.button_selector_container}>

                <button style={(activeButton === 'login') ? {...activeButtonStyle} : {...buttonCss}} value={'login'} onClick={(e: any) => {setActiveButton(e.target.value)}}>Войти</button>


                <button style={(activeButton === 'registration') ? {...activeButtonStyle} : {...buttonCss}} value={'registration'} onClick={(e: any) => {setActiveButton(e.target.value)}}>Зарегестрироваться</button>

              </div>


            </Col>
          </Row>

          {/* form */}

          <Row className='d-flex flex-column justify-content-center align-items-center'>

          {( activeButton === 'login') && <form action={authSubmitData}>
          
              <Col md={12} className='d-flex flex-column align-items-center' style={{width: '100%'}}>
                <MyInput title={'Имя'} type={'text'} name='email' placeholder='Ваше Почта'/>
                <MyInput title={'Пароль'} type={'text'} name='password' placeholder='Ваш пароль'/>
              </Col>

              <Col className='d-flex flex-column justify-content-center align-items-center mb-3'>
                <div onClick={() => {console.log('Забыли пароль')}}>Забыли пароль?</div>
              </Col>


            <Col className='d-flex flex-column justify-content-center align-items-center mb-5'>

              <MyButton style={{backgroundColor: '#C61515'}} text={'Войти'} onClick={() => {console.log('SUBMIT')}} type='submit'/>

            </Col>
            
          </form>}

          {(activeButton === 'registration') && <form action={createUserSubmitData}>
          
              <Col md={12} className='d-flex flex-column align-items-center' style={{width: '100%'}}>

                <MyInput title={'Имя'} type={'text'} name='username' placeholder='Ваше Имя'/>
                <MyInput title={'Почта'} type={'text'} name='email' placeholder='Ваша почта'/>
                <MySelector name='company' arr={menuButton} title={'Компания'} />
                <MyFile name={'avatar'} title={'Аватар'} />
                <MyPassword name={'password'} title={'Пароль'} placeholder='Введите пароль'/>
                
              </Col>

              <Col className='d-flex flex-column justify-content-center align-items-center mb-5'>

                <MyButton style={{backgroundColor: '#C61515'}} text={'Зарегестрироваться'} onClick={() => {console.log('SUBMIT')}} type='submit'/>

              </Col>
            
          </form>}

          </Row>

          {/*  */}


          <Row>
            <Col className='d-flex flex-column justify-content-center align-items-center mb-2'>
              <div className={styles.login_line}></div>
            </Col>
          </Row>


          <Row className='d-flex flex-row justify-content-center align-items-center mb-3'>

            <Col className='d-flex flex-row justify-content-center align-items-center'>
              <div className={styles.login_info_text}>Возникли сложности ? Напишите нам</div>
            </Col>

            <Col className='d-flex flex-row justify-content-center align-items-center'>

                <Link className={styles.login_icon} href={''}><Image width={45} height={40} src={tgIcon} alt='TG'/></Link>
                <Link href={''}><Image width={45} height={40} src={waIcon} alt='WA'/></Link> 

            </Col>
          </Row>

      </div>

    </Container>

  )
}

export default Login