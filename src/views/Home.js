import { Row, Col, Card, CardHeader, CardBody, CardTitle, CardText, CardLink } from 'reactstrap'
import { useRTL } from '@hooks/useRTL'
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
import CarouselUncontrolled from './CarouselUncontrolled'
import {
  carouselUncontrolled
} from './CarouselSourceCode'
import MainPage1 from './MainPage1'
SwiperCore.use([Navigation, Pagination, EffectFade, EffectCube, EffectCoverflow, Autoplay, Lazy, Virtual])

const Home = () => {
  const [isRtl, setIsRtl] = useRTL()

  return (
    <div>
      <Card title='Uncontrolled Example' code={carouselUncontrolled}>
        <div>
          <CarouselUncontrolled />
        </div>
      </Card>
      <div>
        <MainPage1 />
      </div>
    </div>
  )
}

export default Home
