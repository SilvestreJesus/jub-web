<template>

<dashboard-drawer/>
<v-app-bar app color="primary" elevation="0" height="20" class="px-6">

</v-app-bar>

<v-main>
    <router-view />
</v-main>
</template>
<script lang="ts" setup>
  //
  const drawer = ref(true)
  const goProfile = ()=>{
    
  }
</script>