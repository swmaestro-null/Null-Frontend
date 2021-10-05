import { Mail, Home, Circle } from 'react-feather'

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  {
    id: 'secondPage',
    title: 'Second Page',
    icon: <Mail size={20} />,
    navLink: '/second-page'
  },
  {
    id: 'pricing',
    title: 'Pricing',
    icon: <Circle size={12} />,
    permissions: ['admin', 'editor'],
    navLink: '/pricing'
  }
]
