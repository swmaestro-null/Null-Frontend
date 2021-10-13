import { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import PricingFaqs from './PricingFaqs'
import PricingCards from './PricingCards'
import PricingTrial from './PricingTrial'
import PricingHeader from './PricingHeader'

import '@styles/base/pages/page-pricing.scss'

const Pricing = () => {
  const [data, setData] = useState(null),
    [faq, setFaq] = useState(null),
    [duration, setDuration] = useState('monthly')

  const PricingData = {
    pricing: {
      basicPlan: {
        title: 'Basic',
        img: require('@src/assets/images/illustration/Pot1.svg').default,
        subtitle: 'A simple start for everyone',
        monthlyPrice: 0,
        yearlyPlan: {
          perMonth: 0,
          totalAnnual: 0
        },
        planBenefits: [
          '100 responses a month',
          'Unlimited forms and surveys',
          'Unlimited fields',
          'Basic form creation tools',
          'Up to 2 subdomains'
        ],
        popular: false
      },
      standardPlan: {
        title: 'Standard',
        img: require('@src/assets/images/illustration/Pot2.svg').default,
        subtitle: 'For small to medium businesses',
        monthlyPrice: 49,
        yearlyPlan: {
          perMonth: 40,
          totalAnnual: 480
        },
        planBenefits: [
          'Unlimited responses',
          'Unlimited forms and surveys',
          'Instagram profile page',
          'Google Docs integration',
          'Custom “Thank you” page'
        ],
        popular: true
      },
      enterprisePlan: {
        title: 'Enterprise',
        img: require('@src/assets/images/illustration/Pot3.svg').default,
        subtitle: 'Solution for big organizations',
        monthlyPrice: 99,
        yearlyPlan: {
          perMonth: 80,
          totalAnnual: 960
        },
        planBenefits: [
          'PayPal payments',
          'Logic Jumps',
          'File upload with 5GB storage',
          'Custom domain support',
          'Stripe integration'
        ],
        popular: false
      }
    }
  }

  useEffect(() => {
    const dataArr = [],
      faqArr = []
    Object.entries(PricingData.pricing).forEach(([key, val]) => {
      dataArr.push(val)
      setData([...dataArr])
    })
    // axios.get('/pricing/data').then(res => {
    //   const dataArr = [],
    //     faqArr = []
    //   console.log(res.data)
    // Object.entries(res.data).forEach(([key, val]) => {
    //   if (key !== 'qandA') {
    //     dataArr.push(val)
    //     setData([...dataArr])
    //   } else {
    //     faqArr.push(val)
    //     setFaq(faqArr[0])
    //   }
    // })
    // })
  }, [])

  return (
    <div id='pricing-table'>
      <PricingHeader duration={duration} setDuration={setDuration} />
      {data !== null || faq !== null ? (
        <Fragment>
          <PricingCards data={data} duration={duration} />
          <PricingTrial />
          {/*<PricingFaqs data={faq} />*/}
        </Fragment>
      ) : null}
    </div>
  )
}

export default Pricing
