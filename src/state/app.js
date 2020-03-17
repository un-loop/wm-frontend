const initialState = {
  isDarkMode: false,
  cart: [],
}

const TOGGLE_DARKMODE = "TOGGLE_DARKMODE"
const ADD_ITEM = "ADD_ITEM"
const REMOVE_ITEM = "REMOVE_ITEM"

export const toggleDarkMode = isDarkMode => ({
  type: TOGGLE_DARKMODE,
  isDarkMode,
})

export const addItem = newItem => ({
  type: ADD_ITEM,
  newItem,
})

export const removeItem = item => ({
  type: REMOVE_ITEM,
  item,
})

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DARKMODE:
      return { ...state, isDarkMode: action.isDarkMode }
    case ADD_ITEM:
      console.log(action)
      let newCart = state.cart.slice()
      newCart.push(action.newItem)
      console.log(state)
      return { ...state, cart: newCart }
    case REMOVE_ITEM:
      let updated = state.cart.slice()
      let emptyCart = []

      updated.map((item, i) => {
        if (i !== action.item) {
          emptyCart.push(item)
        }
      })

      console.log(action)
      console.log(emptyCart)
      return { ...state, cart: emptyCart }
    default:
      return state
  }
}
