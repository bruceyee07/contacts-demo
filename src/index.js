import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, hashHistory, browserHistory } from 'react-router'
import cx from 'classnames'
import store from './store'
import UserList from './component/UserList'
import routes from './route'
import './static/style.styl'

export default class Contact extends React.Component {
	render () {
		return (
			<div className="wrapper">
				<UserList />
			</div>
		)
	}
}

ReactDOM.render(<Provider store={store}><Contact /></Provider>, document.getElementById('root'))