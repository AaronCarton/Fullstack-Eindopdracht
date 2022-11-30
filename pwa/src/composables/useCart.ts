import { useQuery } from '@vue/apollo-composable'
import { computed, Ref, ref, watch } from 'vue'
import { TOPPINGS } from '../graphql/query.topping'
import CartItem from '../interfaces/cartItem.interface'
import Pizza, { PizzaSize, PizzaType } from '../interfaces/pizza.interface'
import Topping from '../interfaces/topping.interface'

const cart: Ref<CartItem[]> = ref(
  localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') as string) : [],
)

const databaseToppings: Ref<Topping[]> = ref([])
const allToppings: Ref<Topping[]> = ref([])

export default () => {
  const loadToppings = async () => {
    console.log('Loading toppings')

    const { onResult } = useQuery(TOPPINGS)
    onResult((res) => {
      console.log('Toppings loaded', res.data.toppings)
      // some hack to make all nested fields writeable
      databaseToppings.value = JSON.parse(JSON.stringify(res.data.toppings))
      calculateToppingStock()
    })
  }

  const calculateToppingStock = () => {
    console.log('Calculating topping stock')
    // copy database toppings to all toppings
    let fullToppings: Topping[] = JSON.parse(JSON.stringify(databaseToppings.value))
    // take note of toppings that are being used by items in the cart
    // iterate through each cart item's toppings and lower the topping stock by 1
    allToppings.value = fullToppings.map((topping) => {
      cart.value.forEach(({ item }) => {
        item.toppings.forEach((t) => {
          if (t.id === topping.id) {
            console.log(
              topping.name,
              'used by',
              item.name,
              '| stock',
              topping.stock,
              '->',
              topping.stock - 1,
            )
            topping.stock--
          }
        })
      })
      return topping
    })
  }

  const updateCart = (updateCallback: (cart: CartItem[]) => any) => {
    // get new cart from callback
    const newCart = updateCallback(cart.value)
    // update cart
    cart.value = newCart
    // calculate new topping stock
    console.log('Updating cart')

    calculateToppingStock()
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
    allToppings,

    findItem,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartItemPrice,
    getCartTotal,
    loadToppings,
  }
}
