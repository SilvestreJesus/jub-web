<template>
  <v-container max-width="900" class="py-8">
    
    <div class="mb-8">
      <h1 class="text-h4 font-weight-black mb-1">Configuración</h1>
      <p class="text-body-1 text-grey-darken-1">Personaliza tu experiencia y el entorno de trabajo.</p>
    </div>

    <v-row>
      <v-col cols="12">
        <v-card rounded="xl" elevation="2" class="pa-2">
          <v-card-title class="d-flex align-center font-weight-bold px-4 pt-4">
            <v-icon start color="primary" class="mr-2">mdi-palette-outline</v-icon>
            Apariencia
          </v-card-title>
          
          <v-list lines="two" bg-color="transparent">
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="grey-darken-2" class="mt-2">mdi-theme-light-dark</v-icon>
              </template>
              <v-list-item-title class="font-weight-medium">Tema de la Interfaz</v-list-item-title>
              <v-list-item-subtitle>Alterna entre modo claro y oscuro.</v-list-item-subtitle>
              
              <template v-slot:append>
                <v-btn-toggle
                  v-model="settings.theme"
                  color="primary"
                  variant="outlined"
                  divided
                  rounded="lg"
                  density="comfortable"
                  @update:model-value="toggleTheme"
                >
                  <v-btn value="jubThemeLight" class="text-none">
                    <v-icon start>mdi-white-balance-sunny</v-icon> Claro
                  </v-btn>
                  <v-btn value="jubThemeDark" class="text-none">
                    <v-icon start>mdi-weather-night</v-icon> Oscuro
                  </v-btn>
                </v-btn-toggle>
              </template>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="grey-darken-2" class="mt-2">mdi-animation-outline</v-icon>
              </template>
              <v-list-item-title class="font-weight-medium">Reducir animaciones</v-list-item-title>
              <v-list-item-subtitle>Mejora el rendimiento en equipos con menos recursos.</v-list-item-subtitle>
              
              <template v-slot:append>
                <v-switch v-model="settings.reduceAnimations" color="primary" hide-details inset></v-switch>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card rounded="xl" elevation="2" class="pa-2">
          <v-card-title class="d-flex align-center font-weight-bold px-4 pt-4">
            <v-icon start color="secondary-blue" class="mr-2">mdi-view-dashboard-outline</v-icon>
            Exploración de Datos
          </v-card-title>
          
          <v-list lines="two" bg-color="transparent">
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="grey-darken-2">mdi-format-list-numbered</v-icon>
              </template>
              <v-list-item-title class="font-weight-medium">Observatorios por página</v-list-item-title>
              <v-list-item-subtitle>Cantidad de resultados a mostrar en las búsquedas.</v-list-item-subtitle>
              
              <template v-slot:append>
                <div style="width: 120px;">
                  <v-select
                    v-model="settings.itemsPerPage"
                    :items="[12, 24, 48, 100]"
                    variant="outlined"
                    density="compact"
                    hide-details
                    rounded="lg"
                  ></v-select>
                </div>
              </template>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="grey-darken-2">mdi-view-grid-outline</v-icon>
              </template>
              <v-list-item-title class="font-weight-medium">Vista por defecto</v-list-item-title>
              <v-list-item-subtitle>Elige cómo prefieres visualizar los catálogos y observatorios.</v-list-item-subtitle>
              
              <template v-slot:append>
                <div style="width: 150px;">
                  <v-select
                    v-model="settings.defaultView"
                    :items="[{ title: 'Cuadrícula', value: 'grid' }, { title: 'Tabla', value: 'table' }]"
                    item-title="title"
                    item-value="value"
                    variant="outlined"
                    density="compact"
                    hide-details
                    rounded="lg"
                  ></v-select>
                </div>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card rounded="xl" elevation="2" class="pa-2">
          <v-card-title class="d-flex align-center font-weight-bold px-4 pt-4">
            <v-icon start color="teal" class="mr-2">mdi-database-export-outline</v-icon>
            Exportación y Avanzado
          </v-card-title>
          
          <v-list lines="two" bg-color="transparent">
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="grey-darken-2">mdi-file-download-outline</v-icon>
              </template>
              <v-list-item-title class="font-weight-medium">Formato de exportación predeterminado</v-list-item-title>
              <v-list-item-subtitle>Formato al descargar productos o consultas DSL.</v-list-item-subtitle>
              
              <template v-slot:append>
                <v-btn-toggle
                  v-model="settings.exportFormat"
                  color="teal"
                  variant="outlined"
                  divided
                  rounded="lg"
                  density="comfortable"
                >
                  <v-btn value="json" class="font-weight-bold">JSON</v-btn>
                  <v-btn value="yml" class="font-weight-bold">YML</v-btn>
                </v-btn-toggle>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <div class="d-flex justify-end mt-8">
      <v-btn
        color="black"
        size="large"
        rounded="lg"
        class="text-none font-weight-bold px-8"
        prepend-icon="mdi-content-save-outline"
        @click="saveSettings"
        :loading="isSaving"
      >
        Guardar Cambios
      </v-btn>
    </div>

    <v-snackbar v-model="showSnackbar" color="success" rounded="pill">
      <v-icon start>mdi-check-circle</v-icon> Configuración guardada exitosamente.
    </v-snackbar>

  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useTheme } from 'vuetify'

definePage({
  name: 'Settings',
  meta: {
    requiresAuth: true,
    layout: 'profile'
  }
})

const vuetifyTheme = useTheme()

const isSaving = ref(false)
const showSnackbar = ref(false)

const settings = ref({
  theme: 'jubThemeLight', // o 'jubThemeDark'
  itemsPerPage: 24,
  defaultView: 'grid',
  reduceAnimations: false,
  exportFormat: 'json'
})

const toggleTheme = (newTheme: string) => {
  if (newTheme) {
    vuetifyTheme.global.name.value = newTheme
  }
}

const saveSettings = () => {
  isSaving.value = true
  
  
  setTimeout(() => {
    isSaving.value = false
    showSnackbar.value = true
  }, 800)
}

onMounted(() => {
  settings.value.theme = vuetifyTheme.global.name.value
})
</script>