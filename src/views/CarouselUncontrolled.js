import { UncontrolledCarousel } from 'reactstrap'
import sliderImage1 from '@src/assets/images/ColorAid/메인_1.png'
import sliderImage2 from '@src/assets/images/ColorAid/메인_2.png'
import sliderImage3 from '@src/assets/images/ColorAid/메인_3.png'
import styled from 'styled-components'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

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

const settings = {
    dots: false,  // 점은 안 보이게
    infinite: true, // 무한으로 즐기게
    speed: 500,
    slidesToShow: 1, //4장씩 보이게 해주세요
    slidesToScroll: 1, //1장씩 넘어가세요
    arrows: false,
    // centerMode: true,
    autoplay: true,
    autoplaySpeed: 5000,

    responsive: [ // 반응형 웹 구현 옵션
        {
            breakpoint: 1200, // 화면 사이즈 1200px
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 1023,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 1
            }
        }
    ]
}

const Container = styled.div`
  overflow:hidden;
`

const StyledSlider = styled(Slider)`
    .slick-slide div{
      outline: none;
    }
`

const ImageContainer = styled.div`
  max-height: 600px;
  width: 100%;
`
const Image = styled.img`
width: 100%;
max-height:600px;
`

const CarouselUncontrolled = () => {
    return (
        <div>
            <StyledSlider {...settings}
            >
                {items.map(items => {
                    return (
                        <div key={items.key}>
                            <ImageContainer>
                                <Image src={items.src} />
                            </ImageContainer>
                        </div>
                    )
                })}
            </StyledSlider>
        </div>
    )
}
export default CarouselUncontrolled