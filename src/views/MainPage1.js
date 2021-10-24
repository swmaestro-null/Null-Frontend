import React from 'react'
import Second from '@src/assets/images/ColorAid/colorization.png'
import Third from '@src/assets/images/ColorAid/complete.png'
import First from '@src/assets/images/ColorAid/sketch.png'

function MainPage1() {
    return (
        <div className="back">
            <div className="SecondMainWord">
                쉽고 빠른 AI 채색 도우미ColorAid
            </div>
            <div className="SecondMainWord2">
                이제 스케치 업로드만하면 1초만에 밑색을 채색할 수 있어요!
            </div>
            <div className="SecondMainWord2">
                ColorAid와 쉬운 웹툰 제작을 시작해 보세요.
            </div>
            <div className="features container features_P2SU">
                <div>
                    <img src={First} height={200}></img>
                    <div className="numbering">
                        <button className="numberingButton">1</button>
                        <p>
                            채색된 이미지 1장 업로드
                        </p>
                    </div>
                </div>
                <div>
                    <img src={Second} height={200}></img>
                    <div className="numbering">
                        <button className="numberingButton">2</button>
                        <p>
                            채색할 스케치 1장 업로드
                        </p>
                    </div>
                </div>
                <div>
                    <img src={Third} height={200}></img>
                    <div className="numbering">
                        <button className="numberingButton">3</button>
                        <p>
                            채색완료!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MainPage1