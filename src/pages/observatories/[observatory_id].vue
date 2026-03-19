<template>
  <v-container max-width="1400" class="py-8">
    
    <v-row justify="center" class="mb-10 mt-4">
      <v-col cols="12" md="10" lg="8" class="text-center">
        
        <h1 class="text-h3 font-weight-black mb-3">Productos</h1>
        <p class="text-body-1 text-grey-darken-1 mb-8">
          Explora las visualizaciones y datos generados en este observatorio.
        </p>

        <div class="position-relative">
          <v-text-field 
            id="search-input" 
            v-model="searchQuery" 
            :rules="dslRules"
            validate-on="input" 
            placeholder="Ej: jub.v1.VS(TAMPS).VT(2025)" 
            variant="solo" 
            elevation="3"
            rounded="xl" 
            bg-color="surface" 
            clearable 
            hide-details="auto"
            class="text-body-1"
            @keyup.enter="executeSearch" 
            @update:model-value="handleTyping"
          >
            <template v-slot:prepend-inner>
              <v-icon color="primary" class="mr-2">mdi-chart-box-outline</v-icon>
            </template>
            <template v-slot:append-inner>
              <v-icon color="grey-darken-1">mdi-tune</v-icon>
            </template>
          </v-text-field>

          <v-menu 
            v-model="showAutocomplete" 
            activator="#search-input" 
            :close-on-content-click="true"
            :open-on-click="false" 
            :open-on-focus="false" 
            offset-y
            location="bottom center"
          >
            <v-card rounded="xl" elevation="4" class="mt-2 border">
              <v-list v-if="dynamicSuggestions.length > 0" max-height="300" bg-color="surface">
                <v-list-item 
                  v-for="item in dynamicSuggestions" 
                  :key="item" 
                  @click="insertSuggestion(item)"
                  class="cursor-pointer transition-swing"
                  hover
                >
                  <template v-slot:prepend>
                    <v-icon size="small" color="secondary-blue" class="mr-3">mdi-tag-outline</v-icon>
                  </template>
                  <v-list-item-title class="font-weight-bold text-primary">
                    {{ item }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </div>

      </v-col>
    </v-row>

    <v-row align="center" justify="space-between" class="mb-4" v-if="filteredProducts.length > 0 || searchCounter > 0">
      <v-col cols="auto">
        <p class="cursor-pointer text-caption text-grey-darken-1 font-weight-bold mb-0">
          <v-icon start size="small">mdi-help-circle-outline</v-icon>
          ¿Cómo realizar búsquedas usando identificadores?
        </p>
      </v-col>

      <v-col cols="auto" class="d-flex align-center ga-4">
        <span class="text-caption font-weight-bold text-grey-darken-1">
          {{ filteredProducts.length }} productos
        </span>

        <v-btn-toggle
          v-model="viewMode"
          color="primary"
          variant="outlined"
          divided
          rounded="pill"
          density="comfortable"
          mandatory
        >
          <v-btn value="grid" icon="mdi-view-grid-outline" size="small"></v-btn>
          <v-btn value="table" icon="mdi-table" size="small"></v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>

    <v-divider class="mb-6" v-if="filteredProducts.length > 0 || searchCounter > 0"></v-divider>

    <v-row v-if="viewMode === 'grid' && filteredProducts.length > 0" class="d-flex align-stretch">
      <v-col v-for="product in filteredProducts" :key="product.product_id" cols="12" sm="6" md="4" lg="3">
        
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            :elevation="isHovering ? 8 : 2"
            rounded="xl"
            class="h-100 transition-swing cursor-pointer d-flex flex-column"
            @click="openDetails(product)"
          >
            <v-img 
              src="https://placehold.co/600x400/eeeeee/999999?text=Visualizaci%C3%B3n" 
              height="160" 
              cover 
              class="align-start bg-grey-lighten-4 border-bottom"
            ></v-img>

            <v-card-item class="pt-4 pb-2">
              <v-card-title class="text-subtitle-1 font-weight-bold text-wrap" style="line-height: 1.2;">
                {{ product.name || 'Producto sin nombre' }}
              </v-card-title>
              <v-card-subtitle class="text-caption mt-1 font-monospace text-primary">
                {{ product.product_id }}
              </v-card-subtitle>
            </v-card-item>

            <v-card-text class="flex-grow-1">
              <div class="d-flex flex-wrap ga-1">
                <v-chip 
                  v-for="tag in product.tags?.slice(0, 3) || []" 
                  :key="tag" 
                  size="x-small" 
                  variant="tonal" 
                  color="secondary-blue"
                  class="font-weight-medium"
                >
                  {{ tag }}
                </v-chip>
                <span v-if="(product.tags?.length || 0) > 3" class="text-caption text-grey-darken-1 ml-1 align-self-center">
                  +{{ product.tags!.length - 3 }}
                </span>
              </div>
            </v-card-text>
          </v-card>
        </v-hover>

      </v-col>
    </v-row>

    <v-row v-else-if="viewMode === 'table' && filteredProducts.length > 0">
      <v-col cols="12">
        <v-card rounded="xl" elevation="2" class="pa-8 text-center bg-grey-lighten-4 border">
          <p class="text-grey-darken-1 mb-0">Vista de tabla en construcción</p>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="d-flex justify-center mt-8" v-else-if="searchCounter > 0 && filteredProducts.length === 0">
      <v-col cols="12" md="8">
        <v-empty-state
          icon="mdi-chart-box-outline"
          image="https://vuetifyjs.b-cdn.net/docs/images/components/v-empty-state/astro-cat.svg"
          headline="Sin productos asociados"
          title="No hay productos que coincidan con esta consulta."
          text="Puedes programar una nueva tarea para generar los datos que necesitas."
          action-text="Generar Nuevo Producto"
          @click:action="showCreateDialog = true"
          color="primary"
          action-color="black"
        ></v-empty-state>
      </v-col>
    </v-row>

    <v-dialog v-model="showCreateDialog" max-width="550" persistent>
      <v-card rounded="lg" elevation="10">
        <v-toolbar color="black" density="comfortable" flat>
          <v-toolbar-title class="text-body-1">Configurar Nuevo Producto</v-toolbar-title>
          <v-btn icon="mdi-close" @click="showCreateDialog = false"></v-btn>
        </v-toolbar>

        <v-card-text class="pa-6">
          <v-form ref="taskForm">
            <v-text-field v-model="newTask.name" label="Nombre" variant="outlined" density="comfortable" class="mb-2"/>
            <v-select v-model="newTask.privacy" :items="['Privado', 'Público']" label="Privacidad" variant="outlined" density="comfortable" class="mb-2"/>
            <v-select v-model="newTask.dataSource" :items="['Datasource1', 'Datasource2','DatasourceN']" label="Fuente de datos" variant="outlined" density="comfortable" class="mb-2"/>
            <v-select v-if="newTask.dataSource" v-model="newTask.catalogs" :items="catalogData[newTask.dataSource.toUpperCase() as keyof typeof catalogData] || []" label="Seleccionar Catálogos" multiple chips variant="outlined" density="comfortable"/>
          </v-form>
        </v-card-text>
        <v-divider />
        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn variant="text" @click="showCreateDialog = false">Cancelar</v-btn>
          <v-btn color="black" class="px-6" @click="handleCreateTask">Crear</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showOverlay" fullscreen transition="dialog-bottom-transition">
      <v-card class="bg-surface">
        
        <v-toolbar color="primary-blue" class="text-white" density="compact">
          <v-toolbar-title class="text-subtitle-1 font-weight-bold">
            {{ filteredProducts[currentIndex]?.name || 'Visualizador de Productos' }}
          </v-toolbar-title>
          <v-spacer/>
          <v-btn 
            v-if="loadedData[currentIndex]?.type?.includes('html') && activeTab === 'visual'"
            icon="mdi-fullscreen" 
            @click="toggleFullScreen"
            tooltip="Ver en pantalla completa"
          ></v-btn>
          <v-btn icon="mdi-close" @click="closeOverlay"></v-btn>
        </v-toolbar>

        <v-tabs v-model="activeTab" color="primary" bg-color="grey-lighten-4" grow>
          <v-tab value="visual" class="text-none font-weight-bold"><v-icon start>mdi-chart-bar</v-icon> Visualización</v-tab>
          <v-tab value="data" class="text-none font-weight-bold"><v-icon start>mdi-table</v-icon> Datos (CSV)</v-tab>
          <v-tab value="meta" class="text-none font-weight-bold"><v-icon start>mdi-information-outline</v-icon> Metadatos</v-tab>
        </v-tabs>

        <div class="h-100 overflow-hidden bg-white">
          
          <div v-if="activeTab === 'visual'" class="h-100">
            <v-carousel 
              v-model="currentIndex" 
              hide-delimiters 
              height="calc(100vh - 112px)"
              @update:model-value="onSlideChange"
            >
              <v-carousel-item v-for="(product, i) in filteredProducts" :key="product.product_id">
                <div :id="'container-' + i" class="fill-height d-flex align-center justify-center bg-black">
                  
                  <v-progress-circular v-if="!loadedData[i]" indeterminate size="70" color="primary" />

                  <template v-else>
                    <v-img v-if="loadedData[i]?.type?.includes('image')" :src="loadedData[i]?.url ?? ''" contain width="100%" height="100%" max-height="90vh" />
                    
                    <iframe v-else-if="loadedData[i]?.type?.includes('pdf') || loadedData[i]?.type?.includes('html')" :src="loadedData[i]?.url ?? ''" class="full-size-iframe" style="width: 100%; height: 100%; border: none; background: white;"></iframe>

                    <audio v-else-if="loadedData[i]?.type?.includes('audio')" controls :src="loadedData[i]?.url ?? ''"></audio>

                    <v-empty-state v-else icon="mdi-file-question" title="Formato no soportado directamente">
                      <v-btn :href="loadedData[i]?.url ?? ''" download>Descargar para ver</v-btn>
                    </v-empty-state>
                  </template>

                </div>
              </v-carousel-item>
            </v-carousel>
          </div>

          <div v-if="activeTab === 'data'" class="h-100 pa-8 overflow-y-auto">
            <v-empty-state
              icon="mdi-table-large"
              title="Datos no cargados"
              text="No disponemos de una vista previa de los datos en este momento, pero puedes descargar el CSV para explorarlos."
            >
              <v-btn color="black" prepend-icon="mdi-download">Descargar CSV</v-btn>
            </v-empty-state>
          </div>

<div v-if="activeTab === 'meta'" class="h-100 pa-8 overflow-y-auto">
            <v-row v-if="currentProduct">
              
              <v-col cols="12" md="6" class="pr-md-8">
                <h2 class="text-h5 font-weight-bold mb-6 text-grey-darken-4">Contexto de Origen</h2>
                
                <div class="mb-6">
                  <div class="text-subtitle-1 font-weight-bold text-grey-darken-4 mb-1">ID del Producto</div>
                  <div class="text-body-1 text-primary">{{ currentProduct.product_id }}</div>
                </div>

                <div class="mb-6">
                  <div class="text-subtitle-1 font-weight-bold text-grey-darken-4 mb-1">Observatorio padre</div>
                  <div class="text-body-1 text-grey-darken-1">
                    {{ 'Observatorio Actual' }}
                  </div>
                </div>

                <div class="mb-6">
                  <div class="text-subtitle-1 font-weight-bold text-grey-darken-4 mb-1">Descripción</div>
                  <div class="text-body-1 text-grey-darken-1 text-wrap" style="line-height: 1.5;">
                    {{ currentProduct.description || 'Sin descripción disponible para este producto.' }}
                  </div>
                </div>
              </v-col>
              
              <v-col cols="12" md="6">
                
                <h2 class="text-h5 font-weight-bold mb-4 text-grey-darken-4">Parámetros de Consulta (DSL)</h2>
                
                <v-sheet 
                  color="grey-lighten-4" 
                  rounded="lg" 
                  class="pa-4 mb-8 text-body-1 text-grey-darken-2"
                  style="font-family: monospace;"
                >
                  {{'jub.v1.VS(NL).VT(2025).VI(CIE10.*)' }}
                </v-sheet>
                
                <h2 class="text-h5 font-weight-bold mb-4 text-grey-darken-4">Etiquetas</h2>
                <div class="d-flex flex-wrap ga-2">
                  <v-chip 
                    v-for="tag in (currentProduct.tags || [])" 
                    :key="tag" 
                    color="primary" 
                    variant="flat" 
                    size="default"
                    class="font-weight-bold text-white px-4"
                  >
                    {{ tag }}
                  </v-chip>
                  <span v-if="!(currentProduct.tags?.length)" class="text-body-1 text-grey-darken-1">
                    Sin etiquetas asociadas
                  </span>
                </div>

              </v-col>
            </v-row>
          </div>

        </div>
      </v-card>
    </v-dialog>

  </v-container>
  <!-- <v-container class="py-10">
    <div class="text-center mb-10">

      <v-responsive max-width="700" class="justify-content-center mx-auto">
        <v-row no-gutters align="center" justify="center">
          <v-col class="align-center">
            
            <v-text-field @keyup.enter="executeSearch" id="search-input" v-model="searchQuery" :rules="dslRules"
              validate-on="input" placeholder="Ej: jub.v1.VS(TAMPS).VT(2025)" variant="solo-filled" rounded="pill" flat
              bg-color="grey-lighten-3" clearable @update:model-value="handleTyping">
              <template v-slot:append-inner>
                <v-icon color="grey-darken-1">mdi-tune</v-icon>
              </template>
            </v-text-field>

            <v-menu v-model="showAutocomplete" activator="#search-input" :close-on-content-click="true"
              :open-on-click="false" :open-on-focus="false" offset-y>
              <v-list v-if="dynamicSuggestions.length > 0" max-height="300">
                <v-list-item v-for="item in dynamicSuggestions" :key="item" @click="insertSuggestion(item)">
                  <v-list-item-title class="font-weight-bold text-primary">
                    {{ item }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

          </v-col>

          <v-col cols="auto" class="d-flex ml-4">

            <v-btn icon="mdi-view-grid" variant="text" :color="viewMode === 'grid' ? 'primary' : 'grey-darken-3'"
              @click="viewMode = 'grid'" class="mr-1"></v-btn>

            <v-btn icon="mdi-view-list" variant="text" :color="viewMode === 'table' ? 'primary' : 'grey-darken-3'"
              @click="viewMode = 'table'"></v-btn>

          </v-col>

        </v-row>

        <v-row class="d-flex align-center justify-center">
          <v-col no-gutters>
            <p class="cursor-pointer text-subtitle-2 text-grey-darken-1 mt-3">
              ¿Como realizar busquedas usando identificadores?
            </p>
          </v-col>
        </v-row>

      </v-responsive>
    </div>

    <v-row v-if="viewMode === 'grid' && filteredProducts.length > 0" class="d-flex align-stretch">
      <v-col v-for="product in filteredProducts" :key="product.product_id" cols="12" sm="6" md="6">
        <v-card>
          <v-card-title>{{ product.name }}</v-card-title>
          <v-card-text>
            <p><strong>Tags:</strong> {{ product.tags.join(', ') }}</p>
            <p><strong>ID:</strong> {{ product.product_id }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="openDetails(product)">Ver Detalles</v-btn>
          </v-card-actions>
        </v-card>

      </v-col>
    </v-row>

    <v-row v-else-if="viewMode === 'table' && filteredProducts.length > 0">
      <v-col cols="12">
        <p class="bg-red">Tabla de resultados (missing)</p>
    
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center" v-else-if="searchCounter>0 && filteredProducts.length == 0">
          <v-empty-state
        icon="mdi-package-variant-remove"
                  image="https://vuetifyjs.b-cdn.net/docs/images/components/v-empty-state/astro-cat.svg"
        headline="Sin productos asociados"
        title="No hay productos asociados a esta consulta."
        text="Pero puedes programar una nueva tarea para crear un observatorio privado que podrás publicar después."
        action-text="Personalizar Tarea de Observatorio"
        @click:action="showCreateDialog = true"
        color="primary"
        action-color="primary"
      ></v-empty-state>
    </v-row>

    <v-dialog v-model="showCreateDialog" max-width="550" persistent>
      <v-card rounded="lg" elevation="10">
        <v-toolbar color="black" density="comfortable" flat>
          <v-toolbar-title class="text-body-1">Configurar Nuevo Observatorio</v-toolbar-title>
          <v-btn icon="mdi-close" @click="showCreateDialog = false"></v-btn>
        </v-toolbar>

        <v-card-text class="pa-6">
          <v-form ref="taskForm">
            <v-text-field 
              v-model="newTask.name" 
              label="Nombre del Observatorio" 
              variant="outlined" 
              density="comfortable"
              class="mb-2"
            />
            
            <v-select
              v-model="newTask.privacy"
              :items="['Privado', 'Público']"
              label="Privacidad"
              variant="outlined"
              density="comfortable"
              class="mb-2"
            />

            <v-select
              v-model="newTask.dataSource"
              :items="['Datasource1', 'Datasource2','DatasourceN']"
              label="Fuente de datos"
              variant="outlined"
              density="comfortable"
              class="mb-2"
            />

   

            <v-select
              v-if="newTask.dataSource"
              v-model="newTask.catalogs"
              :items="catalogData[newTask.dataSource.toUpperCase() as keyof typeof catalogData] || []"
              label="Seleccionar Catálogos"
              multiple
              chips
              variant="outlined"
              density="comfortable"
            />
          </v-form>
        </v-card-text>

        <v-divider />

        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn variant="text" @click="showCreateDialog = false">Cancelar</v-btn>
          <v-btn color="black" class="px-6" @click="handleCreateTask">Crear</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showOverlay" fullscreen transition="dialog-bottom-transition">
      <v-card class="bg-black">
        <v-toolbar color="transparent" density="compact">
          <v-btn icon="mdi-close" @click="closeOverlay"></v-btn>
          <v-toolbar-title>Visualizador de Productos</v-toolbar-title>
          <v-spacer/>
          <v-btn 
          v-if="loadedData[currentIndex]?.type?.includes('html')"
          icon="mdi-fullscreen" 
          @click="toggleFullScreen"
          tooltip="Ver en pantalla completa"
        ></v-btn>
        </v-toolbar>

        <v-carousel 
          v-model="currentIndex" 
          hide-delimiters 
          height="calc(100vh - 64px)"
          @update:model-value="onSlideChange"
        >
          <v-carousel-item v-for="(product, i) in filteredProducts" :key="product.product_id">
            <div :id="'container-' + i" class="fill-height d-flex align-center justify-center">
              
              <v-progress-circular 
                v-if="!loadedData[i]" 
                indeterminate 
                size="70" 
                color="primary"
              />

              <template v-else>
                <v-img 
                  v-if="loadedData[i]?.type?.includes('image')" 
                  :src="loadedData[i]?.url ?? ''" 
                  contain 
                  width="100%"
                  height="100%"
                  max-height="90vh" 
                />

                <iframe 
                  v-else-if="loadedData[i]?.type?.includes('pdf') || loadedData[i]?.type?.includes('html')" 
                  :src="loadedData[i]?.url ?? ''" 
                  class="full-size-iframe"
                  style="width: 100%; height: 100%; border: none; background: white;"
                ></iframe>

                <audio 
                  v-else-if="loadedData[i]?.type?.includes('audio')" 
                  controls 
                  :src="loadedData[i]?.url ?? ''"
                ></audio>

                <v-empty-state 
                  v-else 
                  icon="mdi-file-question" 
                  title="Formato no soportado directamente"
                >
                  <v-btn :href="loadedData[i]?.url ?? ''" download>Descargar para ver</v-btn>
                </v-empty-state>
              </template>
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-card>
    </v-dialog>
  </v-container> -->
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
// import { useDashboardStore, type Dashboard } from '@/stores/dashboard';
import { type ProductXDTO } from '@/types/index.types';
import { useJubStore } from '@/stores/jub';
import { useAppStore,SnackbarColor } from '@/stores/app';
import { useRouter, useRoute } from 'vue-router'
import { useMictlanXStore } from '@/stores/mictlanx';


definePage({
  name: 'ObservatoryDetails',
  path: '/observatories/:observatory_id',
  meta: {
    requiresAuth: true,
    layout: 'dashboard',
  },


});

const activeTab = ref('visual');
const showOverlay        = ref(false)
const mictlanXStore      = useMictlanXStore()
const loadedData         = reactive<Record<number, {url: string | null, type: string | null} >>({});
const appStore           = useAppStore();
const showCreateDialog   = ref(false);
const searchCounter      = ref(0);
const router             = useRouter();
const route              = useRoute('ObservatoryDetails');
const jubStore           = useJubStore();

const currentIndex       = ref(0);
const filteredProducts   = ref<ProductXDTO[]>([]);
const currentProduct = computed(() => filteredProducts.value[currentIndex.value]);
const viewMode           = ref<'grid' | 'table'>('grid');
const searchQuery        = ref('jub.v1.VS(*).VT(*).VI(*)');
const showAutocomplete   = ref(false);
const dynamicSuggestions = ref<string[]>([]);
const currentPage        = 0;
const itemsPerPage       = 10;

const catalogData = {
  'DATASOURCE1': ['TAMPS', 'CDMX', 'NL', 'MEXICO'],
  'DATASOURCE2': ['2023', '2024', '2025', '2026'],
  'DATASOURCE3': ['SEX.M', 'SEX.F', 'CIE10.C50'],
  "VS": ['TAMPS', 'CDMX', 'NL', 'MEXICO'],
  "VT": ['2023', '2024', '2025', '2026'],
  "VI": ['SEX.M', 'SEX.F', 'CIE10.C50']
};

const newTask = ref({
  name: '',
  privacy: '',
  dataSource: '',
  catalogs: [] as string[],
});

const toggleFullScreen = () => {
  // Obtenemos el contenedor del slide actual por su ID dinámico
  const element = document.getElementById(`container-${currentIndex.value}`);
  
  if (!element) return;

  if (!document.fullscreenElement) {
    // Entrar en pantalla completa
    element.requestFullscreen().catch(err => {
      console.error(`Error al intentar entrar en pantalla completa: ${err.message}`);
    });
  } else {
    // Salir de pantalla completa
    document.exitFullscreen();
  }
};

// Escuchar cambios de fullscreen para forzar el resize de Plotly
document.addEventListener('fullscreenchange', () => {
  // Al entrar o salir, notificamos a los iframes para que Plotly se ajuste
  const iframes = document.querySelectorAll('.plot-iframe');
  iframes.forEach((iframe) => {
    const win = (iframe as HTMLIFrameElement).contentWindow;
    if (win) {
      win.dispatchEvent(new Event('resize'));
    }
  });
});

const onSlideChange = (index: number) => {
  fetchIfNeeded(index);
  fetchIfNeeded(index + 1); // Adelantarse a la siguiente
};

const default_products= [
  "https://apix.tamps.cinvestav.mx/mictlanx/api/v4/buckets/contaminantes1/c97f6b2a9f042cf31f898ab0b50940383fd34024e82130c28d3bc9468621690c",
  "https://apix.tamps.cinvestav.mx/mictlanx/api/v4/buckets/tacometros/tacometrotacometro_benceno_71432_pos_26_state_10_durangopng_period20042022_ent10_eytall_iarc1_cas71432",
  "https://apix.tamps.cinvestav.mx/mictlanx/api/v4/buckets/c910_test8/product_heatmap_c910_2021_00_3_40_59_tasa_cruda_100k"
]

const fetchIfNeeded = async (index: number) => {
  if (index >= 0 && index < filteredProducts.value.length && !loadedData[index]) {
    // const data = await downloadStore.downloadFile(filteredProducts.value[index]);
    const randomUrl = default_products[Math.floor(Math.random() * default_products.length)];
    const data = await mictlanXStore.downloadFile(randomUrl);
    // console.log("Data descargada para el producto:", data);
    loadedData[index] = data;
  }
};

const openOverlay = (productList: ProductXDTO[], startAt: number) => {
  // filteredProducts.value = productList;
  currentIndex.value = startAt;
  showOverlay.value = true;
  onSlideChange(startAt);
};

const closeOverlay = () => {
  Object.values(loadedData).forEach(file => {
    if (file.url) {
      URL.revokeObjectURL(file.url);
    }
  });
  Object.keys(loadedData).forEach(key => delete loadedData[parseInt(key)]);
  showOverlay.value = false;
};

const handleCreateTask = () => {
  console.log("Nueva tarea configurada:", newTask.value);
  appStore.showSnackbar("Tarea creada exitosamente", 3000, SnackbarColor.SUCCESS);
  showCreateDialog.value = false; // Cierra el diálogo después de manejar la creación
};

const openDetails = (product: ProductXDTO) => {
  openOverlay([product], 0); // Abre el overlay con el producto seleccionado

};

const validateDsl = (v: string): true | string => {
  // 1. Allow it to be empty (if you want users to be able to clear the search)
  if (!v) return true;

  // 2. Must start exactly with the version prefix
  if (!v.startsWith('jub.v1.')) {
    return "La consulta debe iniciar con 'jub.v1.'";
  }

  // 3. Extract the core query after the prefix
  const coreQuery = v.substring(7).trim();
  if (coreQuery.length === 0) {
    return "Debes incluir al menos un catálogo (VS, VT o VI)";
  }

  // 4. Regex to validate the structure:
  // - (?:VS|VT|VI) : Strictly allows only VS, VT, or VI
  // - \([^)]+\)    : Requires parentheses with some content inside (e.g., "(2024)")
  // - (?:\s*(?:AND)?\s*)? : Optionally allows spaces or the word "AND" between functions
  // - ^ ... +$     : Ensures the ENTIRE string matches this pattern, preventing garbage characters
  const isValidStructure = /^(?:(?:VS|VT|VI)\([^)]+\)(?:\s*(?:AND|\.)?\s*)?)+$/.test(coreQuery);

  if (!isValidStructure) {
    return "Formato inválido. Solo usa VS(...), VT(...) o VI(...) con sus condiciones.";
  }

  // Passed all validations
  return true;
};

const dslRules: Array<(v: string) => true | string> = [validateDsl];



const executeSearch = async () => {
  // Por ejemplo, podrías llamar a un método en tu JubStore que procese el DSL y devuelva resultados.
  searchCounter.value += 1; // Solo para mostrar que se ejecutó la búsqueda
  const validationResult = validateDsl(searchQuery.value);

  if (validationResult === true) {
    const result = await jubStore.search(
      searchQuery.value,
      route.params.observatory_id as string,
      currentPage,
      itemsPerPage
    );
    console.log("Resultados de la búsqueda:", result);
    filteredProducts.value = result; // Actualiza la lista de observatorios mostrados  


  } else {
    // If it's invalid, Vuetify is already showing the red error text, 
    // so we just stop the function from making a bad API call.
    console.warn("La consulta tiene errores:", validationResult);
  }

};
// 1. State for the autocomplete

// 2. Mock Data (Replace this with calls to your JubStore or Repositories)
// These represent the possible valid tags for each catalog.

// 3. Detect what the user is typing
const handleTyping = (val: string) => {
  if (!val) {
    showAutocomplete.value = false;
    return;
  }

  // Regex Magic: Looks for VS(, VT(, or VI( followed by anything that IS NOT a closing parenthesis.
  // This means the user's cursor is currently inside one of the functions.
  const activeContextMatch = val.match(/(VS|VT|VI)\([^)]*$/);

  if (activeContextMatch) {
    const activeCatalog = activeContextMatch[1] as 'VS' | 'VT' | 'VI'; // e.g., 'VS'

    // Extract what they have typed inside the parentheses so far (e.g., if "VS(TA", extracts "TA")
    const typedInsideParentheses = val.substring(activeContextMatch.index! + activeCatalog.length + 1);

    // Get the correct array of items based on the active catalog
    const availableItems = catalogData[activeCatalog] || [];

    // Filter the items to match what they are typing
    dynamicSuggestions.value = availableItems.filter(item =>
      item.toLowerCase().includes(typedInsideParentheses.toLowerCase())
    );

    // Show the menu if we found matches
    showAutocomplete.value = dynamicSuggestions.value.length > 0;
  } else {
    // User is not actively typing inside a catalog function
    showAutocomplete.value = false;
  }
};

// 4. Inject the selection into the string
const insertSuggestion = (selectedItem: string) => {
  // Find the open function again
  const activeContextMatch = searchQuery.value.match(/(.*)(VS|VT|VI)\([^)]*$/);

  if (activeContextMatch) {
    const textBeforeFunction = activeContextMatch[1]; // e.g., "jub.v1."
    const activeCatalog = activeContextMatch[2];      // e.g., "VS"

    // Rebuild the string: Text Before + Catalog + ( + Selected Item + ).
    // We automatically add the closing parenthesis and a dot so they can start typing the next one!
    searchQuery.value = `${textBeforeFunction}${activeCatalog}(${selectedItem}).`;

    // Close the menu and trigger validation
    showAutocomplete.value = false;
  }
};




onMounted(async () => {
  // jubStore.fetchObservatories();
  // filteredObservatories.value = await jubStore.get_observatories()
  await executeSearch(); // Carga inicial con la consulta por defecto
});




</script>
<style scoped>
/* Estilo cuando el contenedor está en pantalla completa */
div[id^="container-"]:fullscreen {
  width: 100vw !important;
  height: 100vh !important;
  background-color: white !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.plot-iframe {
  transition: all 0.3s ease;
}
:deep(.v-window__container) {
  height: 100% !important;
}

:deep(.v-carousel__item) {
  height: 100% !important;
}

/* Para que el iframe realmente use todo el espacio disponible */
.full-size-iframe {
  display: block;
  flex: 1 1 auto;
}
</style>