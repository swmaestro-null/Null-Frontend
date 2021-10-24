import { UncontrolledCarousel } from 'reactstrap'
import sliderImage1 from '@src/assets/images/ColorAid/메인_1.png'
import sliderImage2 from '@src/assets/images/ColorAid/메인_2.png'
import sliderImage3 from '@src/assets/images/ColorAid/메인_3.png'

const items = [
    {
        key: 1,
        src: sliderImage2,
        header: ' ',
        caption: '이미지 두장으로',
        altText: 'Slide 1'
    },
    {
        key: 2,
        src: sliderImage3,
        header: ' ',
        caption: '자동으로 채색되는',
        altText: 'Slide 2'
    },
    {
        key: 3,
        src: sliderImage1,
        header: ' ',
        caption: '새로움을 경험하세요',
        altText: 'Slide 3'
    }
]

const CarouselUncontrolled = () => {
    return <UncontrolledCarousel items={items} keyboard={false} />
}
export default CarouselUncontrolled