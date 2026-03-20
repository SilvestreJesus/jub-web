<template>

  <video-background 
    :src="heroVideo"
    overlay="rgba(0, 0, 0, 0.6)" 
    class="d-flex align-center justify-center text-center"
    style="min-height: 850px; width: 100%;"
    muted
  >
    <v-container>
        <v-col justify="center" align="center" class="mb-10">
          <v-img :width="name === 'xs' ? 240 : 320" src="@/assets/logo.svg" contain/>
        </v-col>

      <h1 :class="[responsiveBannerTitle, 'font-weight-bold', 'text-white','mb-8', 'text-uppercase']"
        style="max-width: 900px; margin: 0 auto; line-height: 1.4; letter-spacing: 1px;">
        Unificación de Servicios de Ciencia de Datos
        para la Construcción de un Concentrador, Distribuidor y
        Buscador Nacional de Datos e Información Estratégica
      </h1>

      <v-chip color="primary-darken-1" :class="[name === 'xs' ? 'text-h6' : 'text-h4', 'font-weight-bold', 'text-white', 'mb-12', 'px-6']" 
             variant="flat" style="height: auto; min-height: 50px; border-radius: 50px !important; white-space: normal;" >
        MADTEC-2025-M-478 
      </v-chip>

      <div class="d-flex flex-column flex-sm-row justify-center align-center gap-6 mt-4">

        <v-btn @click="onClickDemo" color="secondary-blue" rounded="lg" size="x-large" class="px-6 text-white font-weight-bold text-none" 
            height="80" :width="name === 'xs' ? '100%' : '280'" >
            Prueba nuestra<br>plataforma 
        </v-btn>

        <v-btn color="surface-light"  rounded="lg" size="x-large" class="px-6  text-black font-weight-bold text-none" 
             height="80" :width="name === 'xs' ? '100%' : '280'" >
            ¿Qué es la plataforma<br>de unificación?
        </v-btn>

      </div>

    </v-container>
    </video-background> 
</template>

<script setup lang="ts">
import VideoBackground from '@hintay/vue-video-background';
import heroVideo from '@/assets/hero-background.mp4';
import { computed } from 'vue';
import { useDisplay } from 'vuetify';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const { name } = useDisplay();
const authStore = useAuthStore();
const router = useRouter();

const responsiveBannerTitle = computed(() => {
  if (name.value === 'xs') return 'text-subtitle-1';
  if (name.value === 'sm') return 'text-h6';
  if (name.value === 'md') return 'text-h5';
  return 'text-h5';
});

function onClickDemo() {
  const user = authStore.getUser(); 
  if (user) {
    router.push({ name: 'Dashboard' });
  } else {
    authStore.pendingRedirect = '/dashboard';
    authStore.showAuthDialog = true;
  }
}
</script>

<style scoped>
.gap-6 { gap: 28px; }

@media (min-width: 600px) {
  .gap-6 { 
    gap: 28px; 
  }
}

.text-uppercase {
  text-transform: uppercase !important;
}

</style>
