<template>
  <v-sheet color="grey-lighten-4" class="py-16 px-4">
    <v-container class="py-16">

      <h2 class="text-center text-h4 font-weight-bold text-grey-darken-4 mb-10 mt-16 ">
        JUB: <br> Buscador de datos e información estratégica
      </h2>
      
      <v-carousel hide-delimiter-background show-arrows="hover" 
          height="auto " class="rounded-xl custom-indicators" color="secondary-blue" >

        <v-carousel-item  v-for="(item, i) in observatories" :key="i">
          <div class="pa-4">
            <ObservatoryCard v-bind="item" />
          </div>
        </v-carousel-item>
      </v-carousel>
    </v-container>
  </v-sheet>
</template>


<script setup lang="ts">
import ObservatoryCard from './ObservatoryCarouselCard.vue';

//datos de ejemplo, para mostrar el funcionamiento del carrusel.
const observatories = [
  {
    title: 'Azomalli: Observatorio de salud mental',
    description: 'Fusión de datos meteorológicos retrospectivos y observaciones terrestres para lograr una cobertura territorial integral.',
    author: 'Xelhua Nez',
    rating: 5,
    reviews: 100,
    tags: ['Salud', 'IA', '2026'],
    chartImage1: '',
    chartImage2: ''
  },
  {
    title: 'Azomalli: Observatorio de salud mental',
    description: 'Fusión de datos meteorológicos retrospectivos y observaciones terrestres para lograr una cobertura territorial integral.',
    author: 'Xelhua Nez',
    rating: 5,
    reviews: 100,
    tags: ['Salud', 'IA', '2026'],
    chartImage1: '',
    chartImage2: ''
  },
  {
    title: 'Azomalli: Observatorio de salud mental',
    description: 'Fusión de datos meteorológicos retrospectivos y observaciones terrestres para lograr una cobertura territorial integral.',
    author: 'Xelhua Nez',
    rating: 5,
    reviews: 100,
    tags: ['Salud', 'IA', '2026'],
    chartImage1: '',
    chartImage2: ''
  },
];
</script>

<style scoped>
/* Círculo de las flechas  */
.custom-indicators :deep(.v-window__controls .v-btn) {
  background-color: #2196F3 !important;
  color: white !important;           
}
</style>