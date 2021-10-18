import { Fragment, useState, useContext, useEffect } from 'react'
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
import { toast } from 'react-toastify'
import axios from 'axios'

const ToastContent = () => (
    <Fragment>
        <div className='toastify-header'>
            <div className='title-wrapper'>
                <h6 className='toast-title font-weight-bold'>회원 가입이 완료되었습니다.</h6>
            </div>
        </div>
    </Fragment>
)

const Register = () => {
    const ability = useContext(AbilityContext)

    const [skin, setSkin] = useSkin()

    const history = useHistory()

    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [authenticationNumber, setAuthenicationNumber] = useState('')
    const [valErrors, setValErrors] = useState({})
    const [terms, setTerms] = useState(false)

    const { register, errors, handleSubmit, trigger } = useForm()

    const [minutes, setMin] = useState(0)
    const [seconds, setSecond] = useState(0)

    useEffect(() => {
        const countdown = setInterval(() => {
            if (parseInt(seconds) > 0) {
                setSecond(parseInt(seconds) - 1)
            }
            if (parseInt(seconds) === 0) {
                if (parseInt(minutes) === 0) {
                    clearInterval(countdown)
                } else {
                    setMin(parseInt(minutes) - 1)
                    setSecond(59)
                }
            }
        }, 1000)
        return () => clearInterval(countdown)
    }, [minutes, seconds])

    const onSubmit = () => {
        if (isObjEmpty(errors)) {
            useJwt
                .register({ username, email, password, phoneNumber })
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
                        //ability.update(res.data.user.ability)
                        toast.success(
                            <ToastContent />
                        )
                        // dispatch(handleLogin(data))
                        history.push('/login')
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

    //phoneNumber 상태 바꾸는 것
    const handlephoneNumberChange = e => {
        const errs = valErrors
        if (errs.phoneNumber) delete errs.phoneNumber
        setPhoneNumber(e.target.value)
        setValErrors(errs)
    }

    const Toast = e => (
        <Fragment>
            <div className='toastify-header'>
                <h6 className='toast-title font-weight-bold'>이메일로 인증번호가 발송 되었습니다.</h6>
            </div>
        </Fragment>
    )
    //이메일로 인증 보내기
    //email이 빈 것인지 아닌지 체크 후 인증을 보낸다.
    const emailSend = () => {
        console.log("Test")
        if (isObjEmpty(errors)) {
            setMin(3)
            setSecond(0)
            useJwt.SendEmail({ email })
                .then(res => {
                    if (res.data.error) {
                        const arr = {}
                        for (const property in res.data.error) {
                            if (res.data.error[property] !== null) arr[property] = res.data.error[property]
                        }
                        setValErrors(arr)
                    } else {
                        setValErrors({})
                        console.log(res)
                        // setAuthenicationNumber(res)
                        toast.success(
                            <Toast />
                        )
                    }

                })
        }
    }

    const sendConfirm = () => {
        if (isObjEmpty(errors)) {
            useJwt.SendConfirm({ authenticationNumber, email })
                .then(res => {
                    if (res.data.error) {
                        const arr = {}
                        for (const property in res.data.error) {
                            if (res.data.error[property] !== null) arr[property] = res.data.error[property]
                        }
                        setValErrors(arr)
                    } else {
                        setValErrors({})
                        console.log(res)
                        // setAuthenicationNumber(res)
                    }

                })
        }
    }

    //authentication 상태 바꾸는 것
    const handleauthenticationNumberChange = e => {
        const errs = valErrors
        if (errs.authenticationNumber) delete errs.authenticationNumber
        setAuthenicationNumber(e.target.value)
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
                        {/*<CardTitle tag='h4' className='mb-1'>
                            Adventure starts here 🚀
                        </CardTitle>
    <CardText className='mb-2'>Make your app management easy and fun!</CardText>*/}
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
                                <Label className='form-label' for='register-phoneNumber'>
                                    PhoneNumber
                                </Label>
                                <Input
                                    autoFocus
                                    type='text'
                                    value={phoneNumber}
                                    placeholder='010-1234-5678'
                                    id='register-phoneNumber'
                                    name='register-phoneNumber'
                                    onChange={handlephoneNumberChange}
                                    className={classnames({ 'is-invalid': errors['register-phoneNumber'] })}
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

                                <Button.Ripple color='primary' style={{ margin: 10 }} onClick={emailSend}>
                                    Authentication
                                </Button.Ripple>

                            </FormGroup>
                            <FormGroup>
                                <Label className='form-label' for='register-Authentication'>
                                    Authentication Number
                                </Label>
                                <Input
                                    value={authenticationNumber}
                                    id='register-Authentication'
                                    name='register-Authentication'
                                    onChange={handleauthenticationNumberChange}
                                    className={classnames({ 'is-invalid': errors['register-Authentication'] })}
                                    innerRef={register({ required: true, validate: value => value !== '' })}
                                />

                                <Button.Ripple color='primary' style={{ margin: 10 }}>
                                    Confirmation
                                </Button.Ripple>
                                <Label>{minutes} : {seconds < 10 ? `0${seconds}` : seconds}</Label>
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
