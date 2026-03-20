<template>
  <v-container class="py-8" max-width="1200">
    
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card rounded="xl" elevation="4" class="overflow-visible mt-10">
          <v-img
            height="180"
            cover
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"
            class="bg-grey-lighten-2"
          ></v-img>

          <v-card-text class="d-flex flex-column align-center text-center position-relative pt-0">
            <v-avatar
              size="130"
              color="white"
              class="profile-avatar elevation-6"
            >
              <v-img 
                :src="currentUser?.profile_photo || 'https://placehold.co/150x150/eeeeee/999999?text=Sin+Foto'" 
                cover
              ></v-img>
            </v-avatar>

            <div class="mt-16 pt-2">
              <h1 class="text-h4 font-weight-black text-capitalize mb-1">
                {{ fullName }}
              </h1>
              <p class="text-subtitle-1 text-grey-darken-1 font-weight-medium mb-4">
                @{{ currentUser?.username || 'usuario' }}
              </p>

              <div class="d-flex justify-center ga-3 mb-6">
                <v-chip color="primary" variant="flat" prepend-icon="mdi-shield-account" class="font-weight-bold text-uppercase">
                  {{ currentUser?.role || 'User' }}
                </v-chip>
                <v-chip color="grey-darken-3" variant="tonal" prepend-icon="mdi-email-outline">
                  {{ currentUser?.email || 'No email' }}
                </v-chip>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-10">
      <v-col cols="12" md="10" lg="10">
        
        <div class="d-flex align-center justify-space-between mb-6">
          <div>
            <h2 class="text-h5 font-weight-bold">Exploración Destacada</h2>
            <p class="text-body-2 text-grey-darken-1">Los observatorios y productos mejor valorados de la comunidad.</p>
          </div>
          <v-btn :to="{'name':'Dashboard'}" variant="text" color="primary" append-icon="mdi-arrow-right" class="text-none font-weight-bold">
            Ver todo
          </v-btn>
        </div>

        <v-row>
          <v-col v-for="item in popularItems" :key="item.id" cols="12" sm="6" md="4">
            
            <v-hover v-slot="{ isHovering, props }">
              <v-card
                v-bind="props"
                :elevation="isHovering ? 8 : 2"
                rounded="xl"
                class="h-100 transition-swing cursor-pointer gallery-card"
                @click="goToItem(item)"
              >
                <v-img :src="item.image" height="200" cover class="align-end">
                  <v-overlay
                    :model-value="isHovering ?? false"
                    contained
                    scrim="#036358"
                    class="align-center justify-center"
                  >
                    <v-btn color="white" variant="flat" rounded="pill" class="text-none font-weight-bold px-6">
                      Explorar
                    </v-btn>
                  </v-overlay>
                  
                  <v-chip
                    :color="item.type === 'Observatory' ? 'secondary-blue' : 'black'"
                    size="small"
                    class="ma-3 font-weight-bold text-white position-absolute top-0 right-0"
                  >
                    {{ item.type }}
                  </v-chip>
                </v-img>

                <v-card-item class="pt-4">
                  <v-card-title class="text-subtitle-1 font-weight-bold text-wrap" style="line-height: 1.2;">
                    {{ item.title }}
                  </v-card-title>
                </v-card-item>

                <v-card-text class="d-flex align-center pb-4 pt-0">
                  <v-rating
                    :model-value="item.rating"
                    color="amber"
                    density="compact"
                    half-increments
                    readonly
                    size="small"
                  ></v-rating>
                  <span class="text-caption text-grey-darken-1 ml-2 font-weight-medium">
                    {{ item.rating }} ({{ item.reviews }} reseñas)
                  </span>
                </v-card-text>
              </v-card>
            </v-hover>

          </v-col>
        </v-row>

      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

definePage({
    name: 'UserProfile',
    meta: {
        requiresAuth: true,
        layout: 'profile'
    }
});

const authStore = useAuthStore();
const router = useRouter();

// Usuario actual
const currentUser = computed(() => authStore.getUser());

// Computed seguro para el nombre (maneja si last_name viene vacío como en "invitado")
const fullName = computed(() => {
  const first = currentUser.value?.first_name || '';
  const last = currentUser.value?.last_name || '';
  return `${first} ${last}`.trim() || 'Usuario Desconocido';
});

// Mock Data para la Galería (Reemplazar con llamada real a tu API de productos/observatorios)
const popularItems = ref([
  { 
    id: 1, 
    title: 'Observatorio de Salud Pública', 
    type: 'Observatory', 
    image: 'https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?q=80&w=600&auto=format&fit=crop', 
    rating: 4.8, 
    reviews: 124 
  },
  { 
    id: 2, 
    title: 'Análisis Demográfico Nacional 2025', 
    type: 'Product', 
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop', 
    rating: 4.9, 
    reviews: 89 
  },
  { 
    id: 3, 
    title: 'Lenguaje y Cultura en México', 
    type: 'Observatory', 
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop', 
    rating: 4.5, 
    reviews: 56 
  },
  { 
    id: 4, 
    title: 'Cancer de Mama: Estadísticas y Tendencias', 
    type: 'Product', 
    image: 'https://images.unsplash.com/photo-1581093588401-ecbfae0caa9b?q=80&w=600&auto=format&fit=crop', 
    rating: 4.7, 
    reviews: 210 
  }
]);

// Navegación simulada
const goToItem = (item: any) => {
  console.log("Navegando a:", item.title);
  // router.push(`/observatories/${item.id}`);
};
</script>

<style scoped>
/* Posiciona el avatar mitad dentro y mitad fuera del cover */
.profile-avatar {
  position: absolute !important;
  top: -65px; /* Mitad del tamaño del avatar (130/2) */
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid white; /* Un borde blanco para que resalte sobre la portada */
  background-color: white;
}

/* Efecto suave al pasar el mouse por las tarjetas de la galería */
.gallery-card {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}
.gallery-card:hover {
  transform: translateY(-4px);
}
</style>