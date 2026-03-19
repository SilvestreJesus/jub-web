<template>
  <v-container max-width="1400" class="py-8">
    
    <v-row class="mb-6" align="center">
      <v-col cols="12" md="7">
        <h1 class="text-h4 font-weight-black mb-1">Galería de Productos</h1>
        <p class="text-body-1 text-grey-darken-1">Explora, visualiza y descarga los resultados de tus análisis.</p>
      </v-col>
      
      <v-col cols="12" md="5">
        <v-text-field
          v-model="searchQuery"
          variant="solo-filled"
          flat
          rounded="pill"
          prepend-inner-icon="mdi-magnify"
          placeholder="Buscar por nombre, etiqueta u observatorio..."
          hide-details
          clearable
          bg-color="surface"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="product in filteredProducts" :key="product.id" cols="12" sm="6" md="4" lg="3">
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            :elevation="isHovering ? 8 : 2"
            rounded="xl"
            class="h-100 transition-swing cursor-pointer d-flex flex-column"
            @click="openProductModal(product)"
          >
            <v-img 
              :src="product.thumbnail_url || 'https://placehold.co/600x400/eeeeee/999999?text=Sin+Vista+Previa'" 
              height="180" 
              cover 
              class="align-start bg-grey-lighten-4"
            >
              <div class="pa-2 d-flex justify-end w-100">
                <v-chip size="small" color="black" class="font-weight-bold text-white">
                  {{ product.chart_type }}
                </v-chip>
              </div>
            </v-img>

            <v-card-item class="pt-4 pb-2">
              <v-card-title class="text-subtitle-1 font-weight-bold text-wrap" style="line-height: 1.2;">
                {{ product.name }}
              </v-card-title>
              <v-card-subtitle class="text-caption mt-1">
                <v-icon size="small" class="mr-1">mdi-domain</v-icon>
                {{ product.observatory_name }}
              </v-card-subtitle>
            </v-card-item>

            <v-card-text class="flex-grow-1">
              <div class="d-flex flex-wrap ga-1">
                <v-chip 
                  v-for="tag in product.tags.slice(0, 3)" 
                  :key="tag" 
                  size="x-small" 
                  variant="tonal" 
                  color="secondary-blue"
                  class="font-weight-medium"
                >
                  {{ tag }}
                </v-chip>
                <span v-if="product.tags.length > 3" class="text-caption text-grey-darken-1 ml-1 align-self-center">
                  +{{ product.tags.length - 3 }}
                </span>
              </div>
            </v-card-text>

            <v-divider></v-divider>
            
            <v-card-actions class="pa-3 bg-grey-lighten-4 d-flex justify-space-between text-caption text-grey-darken-1">
              <span>{{ formatDate(product.created_at) }}</span>
              <v-icon size="small">mdi-open-in-new</v-icon>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <v-row v-if="filteredProducts.length === 0" justify="center" class="mt-10">
      <v-empty-state
        icon="mdi-chart-box-outline"
        title="No se encontraron productos"
        text="Ajusta tu búsqueda o genera nuevos productos desde tus observatorios."
      ></v-empty-state>
    </v-row>

    <v-dialog v-model="isModalOpen" max-width="1100" scrollable transition="dialog-bottom-transition">
      <v-card rounded="xl" v-if="selectedProduct" class="bg-surface">
        
        <v-toolbar color="primary-blue" class="text-white" density="comfortable">
          <v-toolbar-title class="text-subtitle-1 font-weight-bold">
            {{ selectedProduct.name }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          
          <v-tooltip text="Descargar Imagen" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" icon="mdi-image-download-outline" variant="text"></v-btn>
            </template>
          </v-tooltip>
          
          <v-tooltip text="Descargar CSV" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" icon="mdi-file-delimited-outline" variant="text"></v-btn>
            </template>
          </v-tooltip>

          <v-btn icon="mdi-close" variant="text" @click="isModalOpen = false"></v-btn>
        </v-toolbar>

        <v-tabs v-model="activeTab" color="primary" bg-color="grey-lighten-4" grow>
          <v-tab value="visual" class="text-none font-weight-bold"><v-icon start>mdi-chart-bar</v-icon> Visualización</v-tab>
          <v-tab value="data" class="text-none font-weight-bold"><v-icon start>mdi-table</v-icon> Datos (CSV)</v-tab>
          <v-tab value="meta" class="text-none font-weight-bold"><v-icon start>mdi-information-outline</v-icon> Metadatos</v-tab>
        </v-tabs>

<v-card-text class="pa-0" style="height: 600px;">
          <div class="h-100">
            
            <div v-if="activeTab === 'visual'" class="h-100 pa-6 d-flex align-center justify-center bg-grey-lighten-5">
              <v-img 
                :src="selectedProduct.image_url" 
                max-height="500" 
                fit="contain"
              >
                <template v-slot:placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                  </div>
                </template>
              </v-img>
            </div>

            <div v-if="activeTab === 'data'" class="h-100 overflow-y-auto">
              <v-table density="comfortable" hover>
                <thead class="bg-grey-lighten-4">
                  <tr>
                    <th v-for="header in selectedProduct.csv_data.headers" :key="header" class="text-left font-weight-bold text-uppercase text-caption">
                      {{ header }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in selectedProduct.csv_data.rows" :key="index">
                    <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
                  </tr>
                </tbody>
              </v-table>
              <div class="pa-4 text-center">
                <v-btn color="black" prepend-icon="mdi-download" rounded="lg" class="text-none">
                  Descargar CSV Completo
                </v-btn>
              </div>
            </div>

            <div v-if="activeTab === 'meta'" class="h-100 pa-6 overflow-y-auto">
              <v-row>
                <v-col cols="12" md="6">
                  <h3 class="text-h6 font-weight-bold mb-4">Contexto de Origen</h3>
                  <v-list lines="two" bg-color="transparent" class="pa-0">
                    <v-list-item class="px-0">
                      <v-list-item-title class="font-weight-bold">ID del Producto</v-list-item-title>
                      <v-list-item-subtitle class="font-monospace text-primary">{{ selectedProduct.product_id }}</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item class="px-0">
                      <v-list-item-title class="font-weight-bold">Observatorio Padre</v-list-item-title>
                      <v-list-item-subtitle>{{ selectedProduct.observatory_name }} ({{ selectedProduct.obs_id }})</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item class="px-0">
                      <v-list-item-title class="font-weight-bold">Descripción</v-list-item-title>
                      <v-list-item-subtitle class="text-wrap">{{ selectedProduct.description }}</v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-col>
                
                <v-col cols="12" md="6">
                  <h3 class="text-h6 font-weight-bold mb-4">Parámetros de Consulta (DSL)</h3>
                  <v-card variant="tonal" color="grey-darken-3" class="pa-4 rounded-lg font-monospace text-body-2">
                    {{ selectedProduct.query_dsl }}
                  </v-card>
                  
                  <h3 class="text-h6 font-weight-bold mt-6 mb-2">Etiquetas</h3>
                  <div class="d-flex flex-wrap ga-2">
                    <v-chip v-for="tag in selectedProduct.tags" :key="tag" color="secondary-blue" variant="flat" size="small">
                      {{ tag }}
                    </v-chip>
                  </div>
                </v-col>
              </v-row>
            </div>

          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

definePage({
  name: 'Products',
  meta: {
    requiresAuth: true,
    layout: 'dashboard',
  },
});

const searchQuery = ref('');
const isModalOpen = ref(false);
const activeTab = ref('visual');
const selectedProduct = ref<ProductDetailDTO | null>(null);

// ==========================================
// INTERFACES (Simulando tu backend)
// ==========================================
interface ProductDetailDTO {
  id: string;
  product_id: string;
  obs_id: string;
  observatory_name: string;
  name: string;
  description: string;
  tags: string[];
  chart_type: string;
  thumbnail_url: string;
  image_url: string;
  created_at: string;
  query_dsl: string;
  // Simulación de los datos del CSV parseados para la tabla
  csv_data: {
    headers: string[];
    rows: (string | number)[][];
  };
}

// ==========================================
// MOCK DATA
// ==========================================
const products = ref<ProductDetailDTO[]>([
  {
    id: 'prod_1',
    product_id: 'PRD-DEMO-2025-01',
    obs_id: 'OBS-TAMPS-01',
    observatory_name: 'Observatorio de Salud Pública NL',
    name: 'Distribución CIE-10 por Edad',
    description: 'Análisis de frecuencias de enfermedades clasificadas por la CIE-10 cruzadas con los grupos de edad estándar.',
    tags: ['CIE10', 'EDAD', 'SALUD', '2025'],
    chart_type: 'Bar Chart',
    thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop',
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    created_at: '2026-03-15T10:30:00Z',
    query_dsl: 'jub.v1.VS(NL).VT(2025).VI(CIE10.*)',
    csv_data: {
      headers: ['Estado', 'Año', 'CIE-10', 'Casos'],
      rows: [
        ['Nuevo León', 2025, 'A00-A09', 1450],
        ['Nuevo León', 2025, 'J00-J99', 3200],
        ['Nuevo León', 2025, 'E10-E14', 890],
      ]
    }
  },
  {
    id: 'prod_2',
    product_id: 'PRD-ECON-2024-05',
    obs_id: 'OBS-MX-ECON',
    observatory_name: 'Indicadores Económicos Nacionales',
    name: 'Evolución del PIB per cápita',
    description: 'Serie de tiempo mostrando el crecimiento económico en contraste con la inflación.',
    tags: ['PIB', 'MX', 'INFLACION', 'TIEMPO'],
    chart_type: 'Line Chart',
    thumbnail_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop',
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    created_at: '2026-02-28T14:15:00Z',
    query_dsl: 'jub.v1.VS(MEXICO).VT(2020:2025).VI(PIB_PER_CAPITA)',
    csv_data: {
      headers: ['País', 'Año', 'PIB (USD)', 'Inflación (%)'],
      rows: [
        ['México', 2023, 11400, 4.6],
        ['México', 2024, 11800, 3.8],
        ['México', 2025, 12100, 3.2],
      ]
    }
  }
]);

// ==========================================
// LÓGICA
// ==========================================
const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value;
  const query = searchQuery.value.toLowerCase();
  
  return products.value.filter(p => 
    p.name.toLowerCase().includes(query) || 
    p.observatory_name.toLowerCase().includes(query) ||
    p.tags.some(tag => tag.toLowerCase().includes(query))
  );
});

const openProductModal = (product: ProductDetailDTO) => {
  selectedProduct.value = product;
  activeTab.value = 'visual'; // Siempre abre en la gráfica primero
  isModalOpen.value = true;
};

const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat('es-MX', { 
    day: 'numeric', month: 'short', year: 'numeric'
  }).format(new Date(dateString));
};
</script>

<style scoped>
/* Altura fija para el contenido de las pestañas para que el modal no brinque al cambiar */
.v-window__container {
  height: 100%;
}
</style>