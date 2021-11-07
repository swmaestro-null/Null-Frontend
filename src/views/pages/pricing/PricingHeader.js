import { duration } from 'moment'
import { CustomInput } from 'reactstrap'

const PricingHeader = ({ duration, setDuration }) => {
  const onChange = e => {
    if (e.target.checked) {
      setDuration('yearly')
    } else {
      setDuration('monthly')
    }
  }

  return (
    <div className='text-center'>
      <h1 className='firstWord mt-5'>가격 플랜</h1>
      <p className='SecondMainWord2 mb-2 pb-75'>
        나에게 꼭 맞는 플랜으로 선택하세요!
      </p>
      <div className='d-flex align-items-center justify-content-center mb-5 pb-50'>
        <h6 className='secondWord mr-1'>월</h6>
        <CustomInput id='plan-switch' type='switch' checked={duration === 'yearly'} onChange={onChange} />
        <h6 className='secondWord ml-50'>년</h6>
      </div>
    </div>
  )
}

export default PricingHeader
