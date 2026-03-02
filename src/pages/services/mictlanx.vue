<template>
  <div class="mictlanx-page bg-background">
    
    <v-sheet class="hero-section d-flex flex-column align-center justify-center pt-16 pb-16" color="grey-darken-4">
      
      <v-container class="text-center position-relative z-10" max-width="800">
        
        <v-img
          src="@/assets/mictlanx.svg" 
          alt="MictlanX Logo"
          width="240"
          class="mx-auto mb-4"
        ></v-img>

        <h1 class="text-h2 text-white mb-2" style="font-family: Georgia, serif !important;">
          MictlanX
        </h1>

        <p class="text-body-1 text-grey-lighten-1 mb-6" style="font-family: monospace;">
          Disponibilidad de los datos de forma segura.
        </p>

        <h2 class="text-h5 font-weight-bold text-white mb-10">
          Servicio de almacenamiento de objetos distribuido
        </h2>

        <div class="d-flex justify-center flex-wrap gap-4 mb-8">
          <v-btn
            color="grey-darken-2"
            rounded="pill"
            size="large"
            elevation="0"
            class="text-none font-weight-bold px-8"
          >
            Reporte técnico
          </v-btn>
          
          <v-btn
            color="primary"
            rounded="pill"
            size="large"
            elevation="0"
            class="text-none font-weight-bold px-8"
            @click="onClickDocs"
          >
            Docs
          </v-btn>
          
          <v-btn
            color="grey-darken-2"
            rounded="pill"
            size="large"
            elevation="0"
            class="text-none font-weight-bold px-8 text-white"
            @click="onClickDemo"
          >
            Demo
          </v-btn>
        </div>

        <div class="d-flex justify-center flex-wrap gap-2 pb-16">
          <v-chip
            v-for="tag in ['Prod4', 'Meta 4', 'E1-C1', 'E1-C2', 'E4-C2']"
            :key="tag"
            color="primary-darken-1"
            variant="flat"
            class="text-white font-weight-bold px-4"
          >
            {{ tag }}
          </v-chip>
        </div>

      </v-container>
    </v-sheet>

    <v-container class="px-4">
      <v-card
        class="mx-auto overlap-card mt-n16"
        max-width="900"
        min-height="500"
        elevation="6"
        rounded="xl"
      >
        <v-card-text class="pa-8 text-center text-grey">
          <h2>Contenido del Dashboard</h2>
          <p>MictlanX Service Card Placeholder</p>
        </v-card-text>
      </v-card>
    </v-container>

  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

definePage({
  name: 'MictlanX',
  meta: {
    requiresAuth: false,
    layout: 'service', 
  },
});

const router = useRouter();
const authStore = useAuthStore();

function onClickDemo() {
  const token = localStorage.getItem('token'); 
  
  if (token) {
    // User is logged in, navigate to the MictlanX specific dashboard/demo
    router.push({ name: 'Dashboard' }); 
  } else {
    // User is not logged in, trigger the global Pinia Auth Dialog
    authStore.pendingRedirect = '/services/mictlanx/demo'; // Or wherever the demo is
    authStore.showAuthDialog = true; 
  }
}

function onClickDocs() {
  window.open('https://jub-ecosystem.github.io/mictlanx-client/#/', '_blank');
}


</script>

<style scoped>
/* 1. Set your background image here. 
  The linear-gradient helps darken the image so the white text stays readable!
*/
.hero-section {
  background-image: linear-gradient(to bottom, rgba(15, 15, 15, 0.8), rgba(20, 20, 20, 0.95)), url('@/assets/mictlanx_hs_25s.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

/* 2. Z-index ensures the card sits strictly above the background */
.overlap-card {
  position: relative;
  z-index: 20;
}

/* 3. Flexbox gaps for quick spacing */
.gap-4 {
  gap: 16px;
}
.gap-2 {
  gap: 8px;
}
</style>