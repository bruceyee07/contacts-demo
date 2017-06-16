export const TOGGLE_GROUP = 'TOGGLE_GROUP'
export const CLICK_USER = 'CLICK_USER'
export const CHANGE_GROUP = 'CHANGE_GROUP'

export function toggleGroup (index) {
	return { type: TOGGLE_GROUP, index }
}
export function clickUser (id) {
	return { type: CLICK_USER, id }
}
export function changeGroup (id, group) {
	return { type: CHANGE_GROUP, id, group }
}