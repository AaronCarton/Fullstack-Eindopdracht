import { useQuery } from '@vue/apollo-composable'
import { Ref, ref } from 'vue'
import { TOPPINGS } from '../graphql/query.topping'
import Cart, { CartItem, ExtraCartItem } from '../interfaces/cart.interface'
import ExtraItem from '../interfaces/extraItem.interface'
import Pizza, { isPizza, PizzaSize, PizzaType } from '../interfaces/pizza.interface'
import Topping from '../interfaces/topping.interface'

const cart: Ref<Cart> = ref(
  localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart') as string)
    : { items: [], extras: [] },
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
      cart.value.items.forEach(({ item }) => {
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

  const updateCart = (
    type: 'items' | 'extras',
    updateCallback: (cart: CartItem[] | ExtraCartItem[]) => (CartItem | ExtraCartItem)[],
  ) => {
    // get new cart from callback
    const newCart = updateCallback(cart.value[type])
    // update cart
    cart.value = { ...cart.value, [type]: newCart }
    // calculate new topping stock
    console.log('Updating cart')

    calculateToppingStock()
    // save cart to local storage
    console.log('Saving cart to local storage', newCart)

    localStorage.setItem('cart', JSON.stringify(cart.value))
  }

  const findItem = (type: 'items' | 'extras', id: string) => {
    return type === 'items'
      ? cart.value.items.find((item) => item.id === id)
      : cart.value.extras.find((item) => item.id === id)
  }

  const addToCart = (item: Pizza | ExtraItem) => {
    const newItem = {
      id: Date.now().toString(),
      item: { ...item },
    }
    if (isPizza(item)) {
      newItem.item = { ...item, type: PizzaType.Classic, size: PizzaSize.Medium }
    }
    updateCart(isPizza(item) ? 'items' : 'extras', (cart) => [
      ...cart,
      newItem as CartItem | ExtraCartItem,
    ])
    return newItem
  }
  const updateCartItem = (id: string, callback: (cartItem: CartItem) => CartItem) => {
    const index = cart.value.items?.findIndex((item) => item.id === id)
    let item = cart.value.items[index]
    if (item) {
      // get item from callback
      item = callback(item)
      // update cart
      updateCart('items', (cart) => {
        cart[index] = item
        return cart
      })
    }
  }

  const removeFromCart = (type: 'items' | 'extras', itemId: string) => {
    const index = cart.value[type]?.findIndex((item) => item.id === itemId)
    if (index !== -1) {
      updateCart(type, (cart) => {
        cart.splice(index, 1)
        return cart
      })
    }
  }
  const clearCart = () => {
    updateCart('items', () => [])
    updateCart('extras', () => [])
  }

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
    const itemsTotal = cart.value.items
      .reduce((acc, item) => acc + getCartItemPrice(item), 0)
      .toFixed(2)
    const extrasTotal = cart.value.extras.reduce((acc, item) => acc + item.item.price, 0).toFixed(2)
    return (parseFloat(itemsTotal) + parseFloat(extrasTotal)).toFixed(2)
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
