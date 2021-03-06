// ** Dropdowns Imports
import { Fragment } from 'react'
import UserDropdown from './UserDropdown'
// ** Third Party Components
import { Sun, Moon, Menu } from 'react-feather'
import {
  NavItem, NavLink, Button, DropdownToggle,
  DropdownMenu,
  DropdownItem, UncontrolledDropdown
} from 'reactstrap'
import * as Icon from 'react-feather'
import themeConfig from '@configs/themeConfig'
import Logo from '@src/assets/images/logo/logo2.png'
import { Link } from 'react-router-dom'

const NavbarUser = props => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className='ficon' onClick={() => setSkin('light')} />
    } else {
      return <Moon className='ficon' onClick={() => setSkin('dark')} />
    }
  }

  return (
    <Fragment>
      <ul className='navbar-nav d-xl-none d-flex align-items-center'>
        <NavItem className='mobile-menu mr-auto'>
          <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
            <DropdownToggle tag='a' className='nav-menu-main menu-toggle hidden-xs is-active'>
              <Icon.Menu className='ficon' />
            </DropdownToggle>
            <DropdownMenu left>
              <DropdownItem tag={Link} to='/'>
                <span className='navbar align-items-center NavWord'>Home</span>
              </DropdownItem>
              <DropdownItem tag={Link} to='/second-page'>
                <span className='navbar align-items-center NavWord'>Coloring</span>
              </DropdownItem>
              <DropdownItem tag={Link} to='/Edit'>
                <span className='navbar align-items-center NavWord'>Edit</span>
              </DropdownItem>
              <DropdownItem tag={Link} to='/pages/pricing'>
                <span className='navbar align-items-center NavWord'>Price</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </NavItem>
      </ul>
      <div>
        <NavItem className='d-none d-lg-block'>
          <NavLink className='nav-link-style'>
            <NavLink className='navbar-brand' className='navbar-container d-flex content'>
              <span className='brand-logo'>
                <img src={Logo} style={{ height: 50 }} alt='logo' />
              </span>
              <Link to='/' className='navbar align-items-center NavWord'>Home</Link>
              <Link to='/second-page' className='navbar align-items-center NavWord'>Coloring</Link>
              <Link to='/Edit' className='navbar align-items-center NavWord'>Edit</Link>
              {/* <Link to='/pages/pricing' className='navbar align-items-center NavWord'>Price</Link> */}
            </NavLink>
          </NavLink>
        </NavItem>
      </div>
      <ul className='nav navbar-nav align-items-center ml-auto'>
        <UserDropdown />
      </ul>
    </Fragment>
  )
}
export default NavbarUser
