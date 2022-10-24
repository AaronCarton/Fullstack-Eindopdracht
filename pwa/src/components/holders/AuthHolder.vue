
<template>
  <div class="bg-[url(../HomeBG.jpg)]">
    <div class="grid min-h-screen place-items-center bg-black bg-opacity-80 ">
      <div class="w-full max-w-lg px-6 flex flex-col">
        <h1 class="text-8xl text-neutral-50 font-title text-center self-center mb-24 ">PizzaTime</h1>
  
        <div class="mb-20 rounded-md">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
  </template>