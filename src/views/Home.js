import { Button, Row, Col, Card, CardHeader, CardBody, CardTitle, CardText, CardLink } from 'reactstrap'
import { useRTL } from '@hooks/useRTL'
import { Facebook, Twitter, Mail, GitHub, HelpCircle, Coffee } from 'react-feather'
import Logo from '@src/assets/images/logo/logo2.png'
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
import { Fragment } from 'react'
import './App.css'
import CarouselUncontrolled from './CarouselUncontrolled'
import {
  carouselUncontrolled
} from './CarouselSourceCode'
import MainPage1 from './MainPage1'
SwiperCore.use([Navigation, Pagination, EffectFade, EffectCube, EffectCoverflow, Autoplay, Lazy, Virtual])

const Home = () => {
  const [isRtl, setIsRtl] = useRTL()

  return (
    <div className="back">
      <Card title='Uncontrolled Example' code={carouselUncontrolled}>
        <div>
          <CarouselUncontrolled />
        </div>
      </Card>
      <div>
        <MainPage1 />
      </div>
      <div className="footerWord">
        <img src={Logo} className="image" height={46}></img>
        <p className="secondWord">주소: 서울시 강남구 아남타워</p>
        <p className="secondWord">상담문의: 010-1234-5678</p>
      </div>
      <div className="footerSet">
        <Button.Ripple color='facebook'>
          <Facebook size={14} />
        </Button.Ripple>
        <Button.Ripple color='twitter'>
          <Twitter size={14} />
        </Button.Ripple>
        <Button.Ripple color='google'>
          <Mail size={14} />
        </Button.Ripple>
        <Button.Ripple className='mr-0' color='github'>
          <GitHub size={14} />
        </Button.Ripple>
      </div>
    </div>
  )
}

export default Home
