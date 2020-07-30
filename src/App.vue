<template>
  <div id="app">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"/>
    <van-number-keyboard safe-area-inset-bottom />
  </div>
</template>
