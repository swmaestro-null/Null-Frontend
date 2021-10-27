import { Fragment, useState } from 'react'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { Button, Media, Label, Row, Col, Input, FormGroup, Alert, Form } from 'reactstrap'

const AccountSetting = ({ data }) => {
    const { register, errors, handleSubmit, control, setValue, trigger } = useForm()


    const onChange = e => {
        const reader = new FileReader(),
            files = e.target.files
        reader.readAsDataURL(files[0])
    }

    const onSubmit = data => trigger()

    return (
        <Fragment>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col sm='7'>
                        <FormGroup>
                            <Label for='username'>Username</Label>
                            <Controller
                                defaultValue={data.name}
                                control={control}
                                as={Input}
                                id='username'
                                name='username'
                                placeholder='Username'
                                innerRef={register({ required: true })}
                                onChange={e => setValue('username', e.target.value)}
                                className={classnames({
                                    'is-invalid': errors.username
                                })}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm='7'>
                        <FormGroup>
                            <Label for='phoneNumber'>phoneNumber</Label>
                            <Controller
                                defaultValue={data.phoneNumber}
                                control={control}
                                as={Input}
                                id='phoneNumber'
                                name='phoneNumber'
                                placeholder='010-1234-5678'
                                innerRef={register({ required: true })}
                                onChange={e => setValue('phoneNumber', e.target.value)}
                                className={classnames({
                                    'is-invalid': errors.phoneNumber
                                })}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm='7'>
                        <FormGroup>
                            <Label for='email'>E-mail</Label>
                            <Controller
                                defaultValue={data.email}
                                control={control}
                                as={Input}
                                type='email'
                                id='email'
                                name='email'
                                placeholder='Email'
                                innerRef={register({ required: true })}
                                onChange={e => setValue('email', e.target.value)}
                                className={classnames({
                                    'is-invalid': errors.email
                                })}
                            />
                        </FormGroup>
                    </Col>
                    <Col className='mt-2' sm='12'>
                        <Button.Ripple type='submit' className='mr-1' color='primary'>
                            Save changes
                        </Button.Ripple>
                        <Button.Ripple color='secondary' outline>
                            Cancel
                        </Button.Ripple>
                    </Col>
                </Row>
            </Form>
        </Fragment>
    )
}

export default AccountSetting
