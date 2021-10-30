import { Fragment, useState, useEffect } from 'react'
// ** Utils
import { isUserLoggedIn } from '@utils'
import Breadcrumbs from '@components/breadcrumbs'
import GeneralTabContent from './AccountSetting'
import { Row, Col, TabContent, TabPane, Card, CardBody } from 'reactstrap'

import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'

const AccountSettings = () => {
    const [activeTab, setActiveTab] = useState('1'),
        [data, setData] = useState(null)

    const toggleTab = tab => {
        setActiveTab(tab)
    }

    useEffect(() => {
        // axios.get('/account-setting/data').then(response => setData(response.data))
        if (isUserLoggedIn() !== null) {
            setData(JSON.parse(localStorage.getItem('userData')))
        }
    }, [])

    return (
        <Fragment>
            <div className="SettingFrame">

                {data !== null ? (
                    <Row>

                        <Card>
                            <CardBody>
                                <GeneralTabContent data={data} />
                            </CardBody>
                        </Card>

                    </Row>
                ) : null}
            </div>
        </Fragment>
    )
}

export default AccountSettings
