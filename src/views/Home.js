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
SwiperCore.use([Navigation, Pagination, EffectFade, EffectCube, EffectCoverflow, Autoplay, Lazy, Virtual])

const Home = () => {
  const [isRtl, setIsRtl] = useRTL()

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Kick start your project 🚀</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>All the best for your new project.</CardText>
          <CardText>
            Please make sure to read our{' '}
            <CardLink
              href='https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/documentation/'
              target='_blank'
            >
              Template Documentation
            </CardLink>{' '}
            to understand where to go from here and how to use our template.
          </CardText>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Want to integrate JWT? 🔒</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>
            We carefully crafted JWT flow so you can implement JWT with ease and with minimum efforts.
          </CardText>
          <CardText>
            Please read our{' '}
            <CardLink
              href='https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/documentation/development/auth'
              target='_blank'
            >
              JWT Documentation
            </CardLink>{' '}
            to get more out of JWT authentication.
          </CardText>
        </CardBody>
      </Card>
    </div>
  )
}

export default Home
