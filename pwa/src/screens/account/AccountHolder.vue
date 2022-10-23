<template>
  <div class="flex min-h-screen place-items-center bg-slate-200">
    <div class="container mx-auto w-full">
      <div class="flex">
        <div
          class="mr-8 flex w-80 flex-col space-y-5 rounded-lg bg-slate-100 p-5 shadow-md"
        >
          <router-link to="/account/details" class="mx-2" active-class="font-bold">
            Persoonlijke Informatie
          </router-link>
          <router-link to="/account/order-history" class="mx-2" active-class="font-bold">
            Vorige bestellingen
          </router-link>
          <router-link
            to="/account/admin/manage-pizzas"
            class="mx-2"
            active-class="font-bold"
          >
            Pizzas instellen
          </router-link>
          <router-link
            to="/account/admin/manage-toppings"
            class="mx-2"
            active-class="font-bold"
          >
            Toppings instellen
          </router-link>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>
