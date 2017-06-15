export const TOGGLE_GROUP = 'TOGGLE_GROUP'
export const CLICK_USER = 'CLICK_USER'

export function toggleGroup (index) {
	return { type: TOGGLE_GROUP, index }
}
export function clickUser (id) {
	return { type: CLICK_USER, id }
}