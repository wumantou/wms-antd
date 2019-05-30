import React from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'connected-react-router'
import routes from './routes'
import 'antd/dist/antd.min.css'

const App = ({ history }) => {
    return (
        <ConnectedRouter history={history}>
            { routes }
        </ConnectedRouter>
    )
}

App.propTypes = {
    history: PropTypes.object,
}

export default App