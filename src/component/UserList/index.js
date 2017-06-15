import React from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import { toggleGroup, clickUser } from '../../action'
import store from '../../store'

import CONTACTS from '../../mock'
import './style.styl'

const GROUP = ['分组1', '分组2', '分组3', '分组4', '分组5', '分组6', '分组7', '分组8', '分组9', '分组10']

export class UserList extends React.Component {
	constructor (props) {
		super(props)
	}

	render () {
		return (
			<div className="contacts-app">
				<div className="left-content">
					<ul className="group-list">
						{GROUP.map((group, index) => 
							<li 
								key={index} 
								className="group-item" 
								onClick={(e) => {
									e.stopPropagation()
									store.dispatch(toggleGroup(index))
								}}
							>
								<div className="group-name-wrap">
									<span className={cx('arrow-icon', {folded: !this.props.data.toJS().unFoldedGroup[index]})}></span>
									<span>{group}</span>
								</div>
								{this.props.data.toJS().unFoldedGroup[index] &&
									<ul className="user-list">
										{
											CONTACTS.slice(index * 3, index * 3 + 3).map(item =>
												<li 
													key={item.id} 
													className="user-item" 
													onClick={(e) => {
														e.stopPropagation()
														store.dispatch(clickUser(item.id))
													}}
												>
													<div className="avatar-wrap">
														<img className="avatar" alt={item.login} src={item.avatar_url} />
													</div>
													<div className="currentUserInfo-wrap">
														<p>ID：{item.id}</p>
														<p>昵称：{item.login}</p>
														<p>主页：{item.html_url}</p>
													</div>
												</li>
											)
										}
									</ul>
								}
							</li>)}
					</ul>
				</div>
				{this.props.data.toJS().currentUserInfo && <div className="main-content">
					<div className="main-top-wrapper">
						<div className="main-top-content">
							<img className="avatar" alt={this.props.data.toJS().currentUserInfo.login} src={this.props.data.toJS().currentUserInfo.avatar_url} /> 
							<p className="user-name">{this.props.data.toJS().currentUserInfo.login}</p>
						</div>
					</div>
					<div className="main-bottom-wrapper">
						<p>ID：{this.props.data.toJS().currentUserInfo.id}</p>
						<p>昵称：{this.props.data.toJS().currentUserInfo.login}</p>
						<p>主页：{this.props.data.toJS().currentUserInfo.html_url}</p>
					</div>
				</div>}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return { data: state.contactsReducer }
}

export default connect(mapStateToProps)(UserList)