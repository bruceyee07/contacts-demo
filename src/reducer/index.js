import { combineReducers } from 'redux'
import Immutable from 'immutable'
import { TOGGLE_GROUP, CLICK_USER, CHANGE_GROUP } from '../action'
import CONTACTS from '../mock'

const GROUP = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const arrConstructor = (length, value) => {
	let arr = new Array(length)
	for (let i = 0; i < length; i ++) {
		arr[i] = value
	}
	return arr
}

let initialState = Immutable.fromJS({ 
	currentUserInfo: null, 
	unFoldedGroup: arrConstructor(GROUP.length, false),
	userList: CONTACTS.map((item, index)=> Object.assign(item, {group: Math.floor(index / 3) + 1}))
})

function contactsReducer (state = initialState, action) {
	switch (action.type) {
		case TOGGLE_GROUP:
			let newState = state.update('unFoldedGroup', arr => arr.map((item ,index) => { 
				return index == action.index ? !item : item 
			}))
			return !newState.toJS().unFoldedGroup.every(item => !item) ? 
				newState :
				newState.set('currentUserInfo', null)
		case CLICK_USER:
			return state.set('currentUserInfo', state.get('userList').filter(item => item.get('id') == action.id))
		case CHANGE_GROUP:
			return state.update('userList', arr => arr.map(item => {
				return item.get('id') == action.id ? item.set('group', action.group) : item
			})).setIn(['currentUserInfo', '0', 'group'], action.group)
		default:
			return state
	}
}

const reducer = combineReducers({ contactsReducer })
export default reducer