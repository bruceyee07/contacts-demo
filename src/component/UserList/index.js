import React from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import { toggleGroup, clickUser, changeGroup } from '../../action'
import store from '../../store'

import './style.styl'

const GROUP = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

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
									<span>{'分组' + group}</span>
								</div>
								{this.props.data.toJS().unFoldedGroup[index] &&
									<ul className="user-list">
										{
											this.props.data.toJS().userList.filter(user => user.group == index + 1).map(item =>
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
														<p>昵称：{item.login}</p>
														<p>分组：{item.group}</p>
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
							<img className="avatar" alt={this.props.data.toJS().currentUserInfo[0].login} src={this.props.data.toJS().currentUserInfo[0].avatar_url} /> 
							<p className="user-name">{this.props.data.toJS().currentUserInfo[0].login}</p>
						</div>
					</div>
					<div className="main-bottom-wrapper">
						<p>昵称：{this.props.data.toJS().currentUserInfo[0].login}</p>
						<p>分组：
							<select
								value={'' + this.props.data.toJS().currentUserInfo[0].group}
								onChange={(e) => {
									store.dispatch(changeGroup(this.props.data.toJS().currentUserInfo[0].id, e.target.value))
								}}
							>
								{GROUP.map(group => <option key={group} value={group}>{group}</option>)}
							</select>
						</p>
						<p>主页：{this.props.data.toJS().currentUserInfo[0].html_url}</p>
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