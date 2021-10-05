import { Fragment, useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Logo from '@src/assets/images/logo/logo2.png'
import { useForm } from 'react-hook-form'
import InputPasswordToggle from '@components/input-password-toggle'
import { Card, CardBody, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput, Button } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'

import classnames from 'classnames'
import useJwt from '@src/auth/jwt/useJwt'
import { isObjEmpty } from '@utils'
import { useSkin } from '@hooks/useSkin'
import { useDispatch } from 'react-redux'
import { handleLogin } from '@store/actions/auth'
import { AbilityContext } from '@src/utility/context/Can'

const Register = () => {
    const ability = useContext(AbilityContext)

    const [skin, setSkin] = useSkin()

    const history = useHistory()

    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [valErrors, setValErrors] = useState({})
    const [terms, setTerms] = useState(false)

    const { register, errors, handleSubmit, trigger } = useForm()

    const onSubmit = () => {
        if (isObjEmpty(errors)) {
            useJwt
                .register({ username, email, password })
                .then(res => {
                    if (res.data.error) {
                        const arr = {}
                        for (const property in res.data.error) {
                            if (res.data.error[property] !== null) arr[property] = res.data.error[property]
                        }
                        setValErrors(arr)
                        if (res.data.error.email !== null) console.error(res.data.error.email)
                        if (res.data.error.username !== null) console.error(res.data.error.username)
                    } else {
                        setValErrors({})
                        const data = { ...res.data.user, accessToken: res.data.accessToken }
                        ability.update(res.data.user.ability)
                        dispatch(handleLogin(data))
                        history.push('/')
                    }
                })
                .catch(err => console.log(err))
        }
    }

    //이름 상태 바꾸는 것
    const handleUsernameChange = e => {
        const errs = valErrors
        if (errs.username) delete errs.username
        setUsername(e.target.value)
        setValErrors(errs)
    }

    //email 상태 바꾸는 것
    const handleEmailChange = e => {
        const errs = valErrors
        if (errs.email) delete errs.email
        setEmail(e.target.value)
        setValErrors(errs)
    }

    const RememberMe = () => {
        return (
            <Fragment>
                I agree to
                <a className='ml-25' href='/' onClick={e => e.preventDefault()}>
                    privacy policy & terms
                </a>
            </Fragment>
        )
    }

    return (
        <div className='auth-wrapper auth-v1 px-2'>
            <div className='auth-inner py-2'>
                <Card className='mb-0'>
                    <CardBody>
                        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
                            <img src={Logo} width="80%" height="auto"></img>
                        </Link>
                        <CardTitle tag='h4' className='mb-1'>
                            Adventure starts here 🚀
                        </CardTitle>
                        <CardText className='mb-2'>Make your app management easy and fun!</CardText>
                        <Form className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                            <FormGroup>
                                <Label className='form-label' for='register-username'>
                                    Username
                                </Label>
                                <Input
                                    autoFocus
                                    type='text'
                                    value={username}
                                    placeholder='johndoe'
                                    id='register-username'
                                    name='register-username'
                                    onChange={handleUsernameChange}
                                    className={classnames({ 'is-invalid': errors['register-username'] })}
                                    innerRef={register({ required: true, validate: value => value !== '' })}
                                />
                                {Object.keys(valErrors).length && valErrors.username ? (
                                    <small className='text-danger'>{valErrors.username}</small>
                                ) : null}
                            </FormGroup>
                            <FormGroup>
                                <Label className='form-label' for='register-email'>
                                    Email
                                </Label>
                                <Input
                                    type='email'
                                    value={email}
                                    id='register-email'
                                    name='register-email'
                                    onChange={handleEmailChange}
                                    placeholder='john@example.com'
                                    className={classnames({ 'is-invalid': errors['register-email'] })}
                                    innerRef={register({ required: true, validate: value => value !== '' })}
                                />
                                {Object.keys(valErrors).length && valErrors.email ? (
                                    <small className='text-danger'>{valErrors.email}</small>
                                ) : null}
                                <Button.Ripple color='primary' style={{ margin: 10 }}>
                                    Authentication
                                </Button.Ripple>
                            </FormGroup>
                            <FormGroup>
                                <Label className='form-label' for='register-password'>
                                    Password
                                </Label>
                                <InputPasswordToggle
                                    value={password}
                                    id='register-password'
                                    name='register-password'
                                    className='input-group-merge'
                                    onChange={e => setPassword(e.target.value)}
                                    className={classnames({ 'is-invalid': errors['register-password'] })}
                                    innerRef={register({ required: true, validate: value => value !== '' })}
                                />
                            </FormGroup>
                            <FormGroup>
                                <CustomInput
                                    type='checkbox'
                                    id='terms'
                                    name='terms'
                                    value='terms'
                                    label={<RememberMe />}
                                    className='custom-control-Primary'
                                    innerRef={register({ required: true })}
                                    onChange={e => setTerms(e.target.checked)}
                                    invalid={errors.terms && true}
                                />
                            </FormGroup>
                            <Button.Ripple type='submit' block color='primary'>
                                Sign up
                            </Button.Ripple>
                        </Form>
                        <p className='text-center mt-2'>
                            <span className='mr-25'>Already have an account?</span>
                            <Link to='/login'>
                                <span>Sign in instead</span>
                            </Link>
                        </p>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default Register
