import React, { Fragment, useState, useEffect } from 'react'

import 'tui-image-editor/dist/tui-image-editor.css'
import ImageEditor from '@toast-ui/react-image-editor'
import { Typography, Row, Col, Button, Label, Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import { isObjEmpty, isUserLoggedIn } from '@utils'
import { useForm } from 'react-hook-form'
import useJwt from '@src/auth/jwt/useJwt'
import Big from '@src/assets/images/ColorAid/큰 배경.png'
import Small from '@src/assets/images/ColorAid/작은 배경.png'

import SwiperResponsive from './swiper/SwiperResponsive'
import { useRTL } from '@hooks/useRTL'
import '@styles/react/libs/swiper/swiper.scss'
import SwiperCore, {
  Navigation,
  Pagination,
  EffectFade,
  EffectCube,
  EffectCoverflow,
  Autoplay,
  Lazy,
  Virtual
} from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import img1 from '@src/assets/images/banner/banner-30.jpg'
import img2 from '@src/assets/images/banner/banner-31.jpg'
import img3 from '@src/assets/images/banner/banner-32.jpg'
import img4 from '@src/assets/images/banner/banner-33.jpg'
import img5 from '@src/assets/images/banner/banner-34.jpg'
import img6 from '@src/assets/images/banner/banner-35.jpg'
import img7 from '@src/assets/images/banner/banner-36.jpg'
import img8 from '@src/assets/images/banner/banner-37.jpg'
import img9 from '@src/assets/images/banner/banner-38.jpg'
SwiperCore.use([Navigation, Pagination, EffectFade, EffectCube, EffectCoverflow, Autoplay, Lazy, Virtual])

const SecondPage = () => {
  const { register, errors, handleSubmit, trigger } = useForm()
  const [image, setImage] = useState(Small)
  const [sketch, setSketch] = useState(Small)
  const [resultImage, setResult] = useState(Big)

  const Example = new Map()
  Example.set(img1, img2)

  const [isRtl, setIsRtl] = useRTL()
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

  // ** userState
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }
  }, [])

  const sendImage = () => {
    const file = dataURLtoFile(image, "reference.png")
    const data = new FormData()
    data.append('image', file, file.name)
    if (isObjEmpty(errors)) {
      console.log(localStorage.localStorage)
      useJwt.SendImage(userData.email, data, "reference")
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
    const file2 = dataURLtoFile(sketch, "sketch.png")
    const data2 = new FormData()
    data2.append('image', file2, file2.name)
    if (isObjEmpty(errors)) {
      useJwt.SendImage(userData.email, data2, "sketch")
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
    if (isObjEmpty(errors)) {
      useJwt.Colorization(userData.email)
        .then(res => {
          console.log(res.data.data.resultUrl)
          setResult(res.data.data.resultUrl)
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

  const ChangeImageFile = (event) => {
    event.preventDefault()
    console.log(event.target.getAttribute('src'))
    setSketch(event.target.getAttribute('src'))
    setImage(Example.get(event.target.getAttribute('src')))
  }

  //swiper 옵션
  const params = {
    slidesPerView: 5,
    spaceBetween: 50,
    pagination: {
      clickable: true
    },
    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 40
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 10
      }
    }
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
      <div className="d-flex justify-content-around">
        <Row >
          <Col lg={{ size: 4, order: 1 }} sm={{ size: 12 }} xs={{ order: 2 }}>
            <div className="innerFrame">
              <div className='d-flex justify-content-around'>
                <p className="ColorPageWord"> 채색 스타일 이미지</p>
                <Label className="input-file-button" for='firstimage'>
                  + 파일 업로드
                </Label>
                <input id="firstimage" style={{ display: 'none' }} type='file'
                  accept='image/*'
                  name='profile_img'
                  onChange={handleFileOnChange} />
              </div>
              <img src={image} className="img-fluid rounded mb-75"></img>
            </div>

            <div className="innerFrame">
              <div className='d-flex justify-content-around'>
                <p className="ColorPageWord"> 채색할 이미지</p>
                <Label className="input-file-button" for='secondimage'>
                  + 파일 업로드
                </Label>
                <input id="secondimage" style={{ display: 'none' }} type='file'
                  accept='image/*'
                  name='profile_img'
                  onChange={handleFileOnChange2} />
              </div>
              <img src={sketch} className="img-fluid rounded mb-75"></img>
            </div>
          </Col>
          <Col lg={{ size: 8, order: 1 }} sm={{ size: 12 }} xs={{ order: 1 }}>
            <div className="innerFrame">
              <div className='d-flex justify-content-around'>
                <Label className="input-file-button" onClick={sendImage}>
                  결과확인
                </Label>
                <Label className="input-file-button">
                  저장하기
                </Label>
              </div>
              <img src={resultImage} className="img-fluid rounded mb-75"></img>
            </div>
          </Col>
        </Row>
      </div>
      <Row>
        <Col sm='12'>
          <Card>
            <CardHeader>
              <CardTitle className="ColorPageWord" tag='h4'>예제 이미지</CardTitle>
            </CardHeader>
            <CardBody>
              <Swiper dir={isRtl ? 'rtl' : 'ltr'} {...params}>
                <SwiperSlide>
                  <img src={img1} alt='swiper 1' className='img-fluid' onClick={ChangeImageFile} />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={img2} alt='swiper 2' className='img-fluid' />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={img3} alt='swiper 3' className='img-fluid' />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={img4} alt='swiper 4' className='img-fluid' />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={img5} alt='swiper 5' className='img-fluid' />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={img6} alt='swiper 6' className='img-fluid' />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={img7} alt='swiper 7' className='img-fluid' />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={img8} alt='swiper 8' className='img-fluid' />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={img9} alt='swiper 9' className='img-fluid' />
                </SwiperSlide>
              </Swiper>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>


  )
}
export default SecondPage
