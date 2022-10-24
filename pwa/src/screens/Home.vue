

<template>
  <div class=" bg-[url(../HomeBG.jpg)]">
    <div class="
    min-h-screen  bg-black bg-opacity-80 "> 
      <RouterLink class="right-1 absolute border-2 rounded-full  m-2" to="/account">
        <User class="w-8 h-8 stroke-neutral-50"/>
      </RouterLink>
      <div class="flex items-center justify-center min-h-screen">
      <div class="w-full max-w-3xl px-6 flex flex-col items-center gap-6 ">

        <h2 class="text-8xl text-white font-title text-center mb-24">Pizza Time</h2>
        
      <RouterLink to="/afhalen" class="ease-out transition-all font-extrabold duration-250 text-center border-2 rounded-2 w-[65%]  text-2xl text-slate-50 border-slate-50 mx-8 py-2 px-2 hover:text-black hover:bg-slate-50">
        AFHALEN
      </RouterLink>
      <div class=" w-full px-50">

     
     <fieldset class="border-t-2 border-slate-200 ">
       <legend class="mx-auto px-4 text-slate-100 text-2xl font-bold italic">OF</legend>
     </fieldset>
    </div>

   <RouterLink to="/leveren" class="ease-out transition-all duration-250 text-center border-2 rounded-2 w-[65%] font-extrabold text-2xl text-slate-50 border-slate-50 mx-8 py-2 px-2 hover:text-black hover:bg-slate-50">
        LEVEREN
      </RouterLink>
    </div>
  </div>
</div>
</div>
  </template>
  
  <script lang="ts">
import useAuthentication from '../composables/useAuthentication';
import {User} from 'lucide-vue-next';
// add 
  export default {
    components: {
      User
    },
    setup(){

      const {user} = useAuthentication()
      const getToken = async() =>{
      console.log(await user.value?.getIdToken())
      }

      getToken()
      return {
        user,
      


      }
    }
  }
  </script>