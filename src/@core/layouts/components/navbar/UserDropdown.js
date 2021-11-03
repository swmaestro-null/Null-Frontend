// ** React Imports
import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { isUserLoggedIn } from '@utils'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/actions/auth'

// ** Third Party Components
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Button } from 'reactstrap'
import { User, Mail, CheckSquare, MessageSquare, Settings, CreditCard, HelpCircle, Power } from 'react-feather'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'

const UserDropdown = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const history = useHistory()

  // ** State
  const [userData, setUserData] = useState(null)

  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }
  }, [])

  const getOutToken = (e) => {
    e.preventDefault()
    localStorage.accessToken = ''
    history.push('/login')
    console.log(userData)

  }

  const LoginButton = () => {
    return <Link to='/Login'><Button.Ripple className="Word" color='primary'>로그인</Button.Ripple></Link>
  }

  const LogoutButton = () => {
    return <Link to='/Login'><Button.Ripple className="Word" color='primary' onClick={getOutToken}>로그아웃</Button.Ripple></Link>
  }

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div>
          <Link to='/account-settings'><span className='user-name font-weight-bold Word' style={{ margin: 10 }}>{(userData && userData['name'])}님, 안녕하세요</span></Link>
          <Link to='/pages/pricing'><Button.Ripple className="Word" color='primary' style={{ margin: 10 }}>무료 체험</Button.Ripple></Link>
        </div>
        {localStorage.accessToken !== '' ? <LogoutButton /> : <LoginButton />}
      </DropdownToggle>
    </UncontrolledDropdown >
  )
}

export default UserDropdown
