import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [
  {
    path: '/home',
    component: lazy(() => import('../../views/Home'))
  },
  {
    path: '/second-page',
    component: lazy(() => import('../../views/SecondPage'))
  },
  {
    path: '/login',
    component: lazy(() => import('../../views/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  },
  {
    path: '/Register',
    component: lazy(() => import('../../views/Register')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/ForgotPassword',
    component: lazy(() => import('../../views/ForgotPassword')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/pages/pricing',
    component: lazy(() => import('../../views/pages/pricing'))
  },
  {
    path: '/account-settings',
    component: lazy(() => import('../../views/account-settings'))
  },
  {
    path: '/Edit',
    component: lazy(() => import('../../views/Edit'))
  }

]

export { DefaultRoute, TemplateTitle, Routes }
