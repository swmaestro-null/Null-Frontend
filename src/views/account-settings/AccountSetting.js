import { Fragment, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { Button, Media, Label, Row, Col, Input, FormGroup, Alert, Form } from 'reactstrap'
import Logo from '@src/assets/images/logo/logo2.png'
import { isObjEmpty } from '@utils'
import InputPasswordToggle from '@components/input-password-toggle'
import useJwt from '@src/auth/jwt/useJwt'

const AccountSetting = ({ data }) => {
    const { register, errors, handleSubmit, control, setValue, trigger } = useForm()


    const onChange = e => {
        const reader = new FileReader(),
            files = e.target.files
        reader.readAsDataURL(files[0])
    }

    const [email, setEmail] = useState(data.email)
    const [username, setUsername] = useState(data.name)
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber)

    const [valErrors, setValErrors] = useState({})
    const history = useHistory()

    //정보 수정
    const onSubmit = () => {
        console.log(localStorage)
        if (isObjEmpty(errors)) {
            useJwt
                .EditAccount({ email, username, password, phoneNumber })
                .then(res => {
                    if (res.data.error) {
                        const arr = {}
                        for (const property in res.data.error) {
                            if (res.data.error[property] !== null) arr[property] = res.data.error[property]
                        }
                        setValErrors(arr)
                        if (res.data.error.email !== null) console.error(res.data.error.email)
                        if (res.data.error.username !== null) console.error(res.data.error.username)
                    }
                    //dispatch(handleLogin(data))
                    //useJwt.setToken(res.data.data.token)
                    //localStorage.userData = res.data.data
                    // ability.update(res.data.userData.ability)
                    //로그인 성공시 /home으로 이통되도록 하는 history
                    history.push('/')
                    alert('회원정보 수정되었습니다.')
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

    return (
        <Fragment>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Label className="AccountSetting">Account Settings </Label>
                <Col sm='12'>
                    <FormGroup>
                        <Label for='email'>E-mail</Label>
                        <Input
                            disabled
                            type='email'
                            value={email}
                            id='email'
                            name='email'
                            onChange={handleEmailChange}
                            placeholder='abc@example.com'
                            className={classnames({ 'is-invalid': errors['register-email'] })}
                            innerRef={register({ required: true, validate: value => value !== '' })}
                        />
                    </FormGroup>
                </Col>
                <Col sm='12'>
                    <FormGroup>
                        <Label for='username'>Username</Label>
                        <Input
                            autoFocus
                            type='text'
                            value={username}
                            id='username'
                            name='username'
                            onChange={handleUsernameChange}
                            className={classnames({ 'is-invalid': errors['register-username'] })}
                            innerRef={register({ required: true, validate: value => value !== '' })}
                        />
                    </FormGroup>
                </Col>
                <Col sm='12'>
                    <FormGroup>
                        <Label for='phoneNumber'>phoneNumber</Label>
                        <Input
                            autoFocus
                            type='text'
                            value={phoneNumber}
                            placeholder='010-1234-5678'
                            id='phoneNumber'
                            name='phoneNumber'
                            onChange={handlephoneNumberChange}
                            className={classnames({ 'is-invalid': errors['register-phoneNumber'] })}
                            innerRef={register({ required: true, validate: value => value !== '' })}
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <Label className='form-label' for='password'>
                        Password
                    </Label>
                    <InputPasswordToggle
                        value={password}
                        id='password'
                        name='password'
                        className='input-group-merge'
                        onChange={e => setPassword(e.target.value)}
                        className={classnames({ 'is-invalid': errors['register-password'] })}
                        innerRef={register({ required: true, validate: value => value !== '' })}
                    />
                </Col>
                <Col className='mt-2' sm='12'>
                    <Button.Ripple type='submit' className='mr-1' color='primary'>
                        Save changes
                    </Button.Ripple>
                    <Link to='/'><Button.Ripple color='secondary' outline>
                        Cancel
                    </Button.Ripple>
                    </Link>
                </Col>

            </Form>
        </Fragment>
    )
}

export default AccountSetting
