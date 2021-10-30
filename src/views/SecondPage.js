import React, { useState } from 'react'

import 'tui-image-editor/dist/tui-image-editor.css'
import ImageEditor from '@toast-ui/react-image-editor'
import { Row, Col, Button, Label } from 'reactstrap'
import { isObjEmpty } from '@utils'
import { useForm } from 'react-hook-form'
import useJwt from '@src/auth/jwt/useJwt'
import Big from '@src/assets/images/ColorAid/큰 배경.png'
import Small from '@src/assets/images/ColorAid/작은 배경.png'

const SecondPage = () => {
  const { register, errors, handleSubmit, trigger } = useForm()
  const [image, setImage] = useState(Small)
  const [sketch, setSketch] = useState(Small)
  const [resultImage, setResult] = useState(Big)

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n) {
      u8arr[n - 1] = bstr.charCodeAt(n - 1)
      n -= 1
    }
    //debugger
    return new File([u8arr], filename, { type: mime })
  }

  const sendImage = () => {
    console.log(image)
    const file = dataURLtoFile(image, "test.png")
    const data = new FormData()
    console.log(file)
    data.append('image', file, file.name)
    if (isObjEmpty(errors)) {
      console.log(localStorage.localStorage)
      useJwt.SendImage(data)
        .then(res => {
          if (res.data.error) {
            const arr = {}
            for (const property in res.data.error) {
              if (res.data.error[property] !== null) arr[property] = res.data.error[property]
            }
            setValErrors(arr)
          } else {
            //setValErrors({})
            console.log(res)
            // setAuthenicationNumber(res)
            // toast.success(
            //   <Toast />
            // )
          }

        })
    }
  }

  const sendSketch = () => {
    const file = dataURLtoFile(sketch, "test.png")
    const data = new FormData()
    console.log(file)
    data.append('image', file, file.name)
    if (isObjEmpty(errors)) {
      useJwt.SendImage(data)
        .then(res => {
          if (res.data.error) {
            const arr = {}
            for (const property in res.data.error) {
              if (res.data.error[property] !== null) arr[property] = res.data.error[property]
            }
            setValErrors(arr)
          } else {
            //setValErrors({})
            console.log(res)
            // setAuthenicationNumber(res)
            // toast.success(
            //   <Toast />
            // )
          }

        })
    }
  }

  const handleFileOnChange = (event) => {
    event.preventDefault()
    const reader = new FileReader()
    const file = event.target.files[0]
    reader.onloadend = () => {
      setImage(reader.result)
    }
    setImage(file)
    reader.readAsDataURL(file)
  }

  const handleFileOnChange2 = (event) => {
    event.preventDefault()
    const reader = new FileReader()
    const file = event.target.files[0]
    reader.onloadend = () => {
      setSketch(reader.result)
    }
    setSketch(file)
    reader.readAsDataURL(file)
  }

  let profile_preview = null
  if (image !== '') {
    profile_preview = <img src={image}></img>
  }

  let sketchImage = null
  if (sketch !== '') {
    sketchImage = <img src={sketch}></img>
  }

  let result = null
  if (sketch !== '') {
    result = <img src={resultImage}></img>
  }
  return (

    <div className='outFrame'>
      <Row >
        <Col lg={{ size: 4, order: 1 }} sm={{ size: 12 }} xs={{ order: 2 }}>
          <div className="innerFrame">
            <div className='d-flex justify-content-around'>
              <p className="ColorPageWord"> 채색 스타일 이미지</p>
              <Label>파일 업로드</Label>
            </div>
            <img src={image} className="img-fluid rounded mb-75"></img>
          </div>

          <div className="innerFrame">
            <div className='d-flex justify-content-around'>
              <p className="ColorPageWord"> 채색할 이미지</p>
              <Label>파일 업로드</Label>
            </div>
            <img src={sketch} className="img-fluid rounded mb-75"></img>
          </div>
        </Col>
        <Col lg={{ size: 8, order: 1 }} sm={{ size: 12 }} xs={{ order: 1 }}>
          <div className="innerFrame">
            <div className='d-flex justify-content-around'>
              <p className="ColorPageWord"> 채색 스타일 이미지</p>
              <Label>파일 업로드</Label>
            </div>
            <img src={resultImage} className="img-fluid rounded mb-75"></img>
          </div>
        </Col>

      </Row>


      <div>
        <input type='file'
          accept='image/*'
          name='profile_img'
          onChange={handleFileOnChange}>
        </input>
        {profile_preview}

        <Button.Ripple color='primary' style={{ margin: 10 }} onClick={sendImage}>
          Send
        </Button.Ripple>
      </div>
      <div>
        <input type='file'
          accept='image/*'
          name='profile_img'
          onChange={handleFileOnChange2}>
        </input>
        {sketchImage}

        <Button.Ripple color='primary' style={{ margin: 10 }} onClick={sendSketch}>
          Draw
        </Button.Ripple>
      </div>

    </div>


  )
}
export default SecondPage
