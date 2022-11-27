import { computed, Ref, ref, watch } from 'vue'
import CartItem from '../interfaces/cartItem.interface'
import Pizza, { PizzaSize, PizzaType } from '../interfaces/pizza.interface'

const cart: Ref<CartItem[]> = ref(
  localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') as string) : [],
)

export default () => {
  const updateCart = (updateCallback: (cart: CartItem[]) => any) => {
    // get new cart from callback
    const newCart = updateCallback(cart.value)
    // update cart
    cart.value = newCart
    // save cart to local storage
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  const findItem = (id: string) => {
    return cart.value.find((item) => item.id === id)
  }

  const addToCart = (pizza: Pizza) => {
    const item: CartItem = {
      id: Date.now().toString(),
      item: { ...pizza, type: PizzaType.Classic, size: PizzaSize.Medium },
    }
    updateCart((cart) => [...cart, item])
    return item
  }
  const updateCartItem = (id: string, callback: (cartItem: CartItem) => CartItem) => {
    const index = cart.value?.findIndex((item) => item.id === id)
    let item = cart.value[index]
    if (item) {
      // get item from callback
      item = callback(item)
      // update cart
      updateCart((cart) => {
        cart[index] = item
        return cart
      })
    }
  }

  const removeFromCart = (itemId: string) => {
    const index = cart.value?.findIndex((item) => item.id === itemId)
    if (index !== -1) {
      updateCart((cart) => {
        cart.splice(index, 1)
        return cart
      })
    }
  }
  const clearCart = () => updateCart(() => [])

  watch(cart, (newCart) => {
    console.log('Cart changed', newCart)
  })
  console.log(cart.value)

  // return price of pizza plus toppings and type
  const getCartItemPrice = (cartItem: CartItem) => {
    let pizzaPrice = cartItem.item.basePrice
    let toppingsPrice = cartItem.item.toppings.reduce((acc, topping) => acc + topping.price, 0)
    let typePrice = cartItem.item.type === PizzaType.CheesyCrust ? 5 : 0
    if (cartItem.item.size === 'small') pizzaPrice -= 3
    else if (cartItem.item.size === 'large') pizzaPrice += 3
    return pizzaPrice + toppingsPrice + typePrice
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
