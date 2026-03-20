<template>
  <v-sheet   class="container py-16 px-4">
      <v-card @mouseover="onHover" @mouseleave="onLeave" color="white" :elevation="elevation" rounded="xl" class="card pa-8 pa-md-16 mx-auto" max-width="1400">
        <v-row justify="center" class="text-left mb-12">
          <v-col cols="12">
            <p class="text-subtitle-1 font-weight-bold text-secondary-blue mb-2 text-uppercase">
              Ejes del Ecosistema JUB
            </p>
            <p class="text-h4 font-weight-medium text-grey-darken-4" style="line-height: 1.2;">
              Un ecosistema diseñado para estructurar, resguardar y <br class="hidden-sm-and-down">
              facilitar la búsqueda de información estratégica.
            </p>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <v-card elevation="0" color="transparent" class="text-center px-4">
              <v-img src="@/assets/icons/Icon_1.png" height="140" contain class="mb-6"></v-img>
              <h3 class="text-h5 font-weight-bold mb-4">Modelo de manejo de variables</h3>
              <p class="text-center text-md-justify text-grey-darken-2 leading-relaxed">
                Clasificación avanzada de metadatos que permite organizar los datos, contenido y productos por variables espaciales, temporales y de interés.
              </p>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card elevation="0" color="transparent" class="text-center px-4">
              <v-img src="@/assets/icons/Icon_2.png" height="140" contain class="mb-6"></v-img>
              <h3 class="text-h5 font-weight-bold mb-4">Ingesta automatizada</h3>
              <p class="text-center text-md-justify text-grey-darken-2 leading-relaxed">
                Permite a las instituciones indexar catálogos y productos directamente mediante código.
              </p>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card elevation="0" color="transparent" class="text-center px-4">
              <v-img src="@/assets/icons/Icon_3.png" height="140" contain class="mb-6"></v-img>
              <h3 class="text-h5 font-weight-bold mb-4">Almacenamiento distribuido</h3>
              <p class="text-center text-md-justify text-grey-darken-2 leading-relaxed">
                Jub garantiza alta disponibilidad, seguridad y resiliencia para grandes volúmenes de datos.
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    <Separator class="separator" :size="20"/>
  </v-sheet>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const elevation = ref(0);

function onHover() {
  elevation.value = 5;
}

function onLeave() {
  elevation.value = 0;
}
</script>
<style scoped>
.leading-relaxed {
  line-height: 1.6 !important;
  font-size: 1.2rem !important;
}
.container {
  position: relative;
  /* background: red; */
  z-index: 1;
  cursor: pointer;
}
.card {
  
  transition: transform 1s ease-out;
}
.container:hover .card {
  transform: scale(1.05);
  transition: transform .3s ease-in;
  /* background-color: red !important; */
}

  /* background-color: blue !important; */
/* .card {
  position: relative;
  display: block;
  z-index: 10;
/* } */
.separator {
  height: 20px;
  z-index: -1;
  width: 100%;
  background-color: blue;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
} 

</style>