import Cookies from 'js-cookie'

export const logOut = () => {
    sessionStorage.removeItem('userId')
    Cookies.remove('token')
    alert('Вы вышли из аккаунта')
    window.location.href = '/login'
  }