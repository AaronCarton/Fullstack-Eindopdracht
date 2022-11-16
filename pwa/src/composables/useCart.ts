import { computed, Ref, ref, watch } from 'vue'
import CartItem from '../interfaces/cartItem.interface'
import Pizza, { PizzaSize, PizzaType } from '../interfaces/pizza.interface'

const cart: Ref<CartItem[]> = ref([])

export default () => {
  const findItem = (id: string) => {
    return cart.value.find((item) => item.id === id)
  }

  const addToCart = (pizza: Pizza) => {
    const item: CartItem = {
      id: Date.now().toString(),
      item: { ...pizza, type: PizzaType.Classic, size: PizzaSize.Medium },
    }
    cart.value?.push(item)
    return item
  }
  const updateCartItem = (id: string, callback: (cartItem: CartItem) => CartItem) => {
    const index = cart.value?.findIndex((item) => item.id === id)
    let item = cart.value[index]
    if (item) {
      // get item from callback
      item = callback(item)
      // update cart
      cart.value[index] = item
    }
  }

  const removeFromCart = (itemId: string) => {
    const index = cart.value?.findIndex((item) => item.id === itemId)
    if (index !== -1) {
      cart.value.splice(index, 1)
    }
  }
  const clearCart = () => (cart.value = [])

  watch(cart, (newCart) => {
    console.log('Cart changed', newCart)
  })
  console.log(cart.value)

  // return price of pizza plus toppings
  const getCartItemPrice = (cartItem: CartItem) => {
    const { item } = cartItem
    const { basePrice, toppings } = item
    const toppingsPrice = toppings.reduce((acc, topping) => acc + topping.price, 0)
    return basePrice + toppingsPrice
  }

  // return total price of all items in cart

  const getCartTotal = () => {
    return cart.value.reduce((acc, item) => acc + getCartItemPrice(item), 0).toFixed(2)
  }

  return {
    cart,

    findItem,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartItemPrice,
    getCartTotal,
  }
}
