const initialState = {
  isDarkMode: false,
  cart: [],
}

const TOGGLE_DARKMODE = "TOGGLE_DARKMODE"
const ADD_ITEM = "ADD_ITEM"
const REMOVE_ITEM = "REMOVE_ITEM"
const CHOOSE_SIZE = "CHOOSE_SIZE"
const CLEAR_CART = "CLEAR_CART"

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

export const chooseSize = item => ({
  type: CHOOSE_SIZE,
  item,
})

export const clearCart = item => ({
  type: CLEAR_CART,
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
    case CHOOSE_SIZE:
      let updatedCartItems = state.cart.slice()
      console.log(updatedCartItems)
      console.log(action)
      updatedCartItems[action.item.index].size = action.item.size
      return { ...state, cart: updatedCartItems }
    case CLEAR_CART:
      return { ...state, cart: [] }
    default:
      return state
  }
}
