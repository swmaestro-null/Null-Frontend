import { Fragment } from 'react'
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
import SwiperResponsive from './SwiperResponsive'

import '@styles/react/libs/swiper/swiper.scss'

SwiperCore.use([Navigation, Pagination, EffectFade, EffectCube, EffectCoverflow, Autoplay, Lazy, Virtual])

const Slider = () => {
  const [isRtl, setIsRtl] = useRTL()

  return (
    <Fragment>
      <ExtensionsHeader
        title='Swiper'
        subTitle='Swiper is the most modern free mobile touch slider'
        link='https://swiperjs.com/'
      />
      <Row>
        <Col sm='12'>
          <SwiperResponsive isRtl={isRtl} />
        </Col>
      </Row>
    </Fragment>
  )
}

export default Slider
