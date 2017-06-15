import { combineReducers } from 'redux'
import Immutable from 'immutable'
import { TOGGLE_GROUP, CLICK_USER } from '../action'
import CONTACTS from '../mock'

const GROUP = ['分组1', '分组2', '分组3', '分组4', '分组5', '分组6', '分组7', '分组8', '分组9', '分组10']
const arrConstructor = (length, value) => {
	let arr = new Array(length)
	for (let i = 0; i < length; i ++) {
		arr[i] = value
	}
	return arr
}

let initialState = Immutable.fromJS({ currentUserInfo: null, unFoldedGroup: arrConstructor(GROUP.length, false) })

function contactsReducer (state = initialState, action) {
	switch (action.type) {
		case TOGGLE_GROUP:
			let newState = state.update('unFoldedGroup', (arr) => arr.map((item ,index) => { return index == action.index ? !item : item }))
			
			return !newState.toJS().unFoldedGroup.every(item => !item) ? 
				newState :
				newState.set('currentUserInfo', null)
		case CLICK_USER:
			return state.set('currentUserInfo', CONTACTS.filter(item => item.id == action.id)[0])
		default:
			return state
	}
}

const reducer = combineReducers({ contactsReducer })
export default reducer