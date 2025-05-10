'use client'

import { FC, useState } from 'react'
import Link from 'next/link'
import { useForm, SubmitHandler } from "react-hook-form"


// css

import styles from '@/app/login/page.module.css'

// bootstrap

import { Container, Row, Col } from 'react-bootstrap'

// fn

import { authUser } from '@/functions/authUser'

// components

import MyButton from '@/components/UI/Button/MyButton'
import MyInput from '@/components/UI/Input/MyInput'

const Login = () => {

  const [validError, setValidError] = useState<boolean>(false)
  const { register, handleSubmit, formState: {errors} } = useForm()

  const onSubmitData = async (data: any) => {
    const resultAuth = await authUser(data)

    if (resultAuth.message == "email not valid" || resultAuth.message == "Invalid password") {
      alert(resultAuth.message)
      setValidError(true)
    }
    if (resultAuth.message == "User not found") {
      alert('Пользователь не найден')
    }

    sessionStorage.setItem('userId', JSON.stringify(resultAuth.message))
    window.location.href = '/main'
  }


  return (
    <Container>
      <Row className='d-flex justify-content-center align-items-center' style={{width: '100%'}}>
        <Col md={5}>
          <div style={{textAlign: 'center'}}>TaskPro+</div>
        </Col>
      </Row>


      <form onSubmit={handleSubmit(onSubmitData)}>
        <Row className='d-flex justify-content-center align-items-center' style={{width: '100%'}}>
          <Col className='d-flex flex-column' md={5}>
          <MyInput  type={'text'} style={(validError) ? {border: '1px solid red'} : {border: '1px solid black'}} placeholder='введите почту' {...register('email', {required: 'error'})} onFocus={() =>{setValidError(false)}} />
            {(errors.email?.message === 'error') && (<span>Ошибка</span>)}
          <MyInput type={'text'} style={(validError) ? {border: '1px solid red'} : {border: '1px solid black'}} placeholder='введите пароль' {...register('password', {required: 'error'})} onFocus={() =>{setValidError(false)}} />
          {(errors.email?.message === 'error') && (<span>Ошибка</span>)}

            <div className={styles.btn_container}>

              <MyButton type='submit' text={'Войти'} color={'#2FD2FF'}></MyButton>
              <Link href={'/registration'}><MyButton type='button' text={'Регистрация'} color={'#2FD2FF'}></MyButton></Link>

            </div>
          
          </Col>
        </Row>
      </form>

    </Container>

  )
}

export default Login