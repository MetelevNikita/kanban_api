'use client'

import { FC } from 'react'

// bootstrap

import { Container, Row, Col } from 'react-bootstrap'

// fn

import { authUser } from '@/functions/authUser'



const Login = () => {




  return (
    <Container>
      <Row className='d-flex justify-content-center align-items-center' style={{width: '100%'}}>
        <Col md={5}>
          <div style={{textAlign: 'center'}}>LOGIN</div>
        </Col>
      </Row>


      <form action={authUser}>
        <Row className='d-flex justify-content-center align-items-center' style={{width: '100%'}}>
          <Col className='d-flex flex-column' md={5}>
            <input type="text" name='email' placeholder='email'/>
            <input type="password" name='password' placeholder='password'/>
            <button type='submit'>войти</button>
          </Col>
        </Row>
      </form>

    </Container>

  )
}

export default Login