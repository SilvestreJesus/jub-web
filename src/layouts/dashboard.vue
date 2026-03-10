<template>
    <dashboard-drawer/>

    <v-app-bar app color="white" elevation="0" height="72" class="px-2" >
        <template v-slot:prepend>
          <v-btn @click="onBack" icon="mdi-arrow-left"></v-btn>
        </template>
        <template v-slot:append>
          <v-btn  icon="mdi-bell" variant="text" color="grey"/> 
          <v-btn  icon="mdi-dots-vertical" variant="text" color="grey"/> 
        </template>
    </v-app-bar>  
  <v-main>
    <router-view />
  </v-main>
</template>

<script lang="ts" setup>
  //
  import {useRouter} from 'vue-router'

  const drawer = ref(true);
  const router = useRouter();

  const onBack = () => {
  
  };
  const goProfile = () => {
    router.push('/profile');
  };
</script>
