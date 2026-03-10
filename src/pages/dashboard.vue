<template>
  <v-container class="py-10">
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

    <v-row v-if="viewMode === 'grid'">
      <v-col v-for="observatory in filteredObservatories" :key="observatory.observatory_id" cols="12" sm="6" md="6">
        <ObservatoryCard :observatory="observatory" @show-details="goToDetails" />
      </v-col>
    </v-row>

    <v-row v-else-if="viewMode === 'table'">
      <v-col cols="12">
        <ObservatoryTables :items="filteredObservatories" @show-details="goToDetails" />
      </v-col>
    </v-row>

    <!-- <ObservatoryDialog v-model="showDialog" :observatory="selectedobservatory" /> -->
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
// import { useDashboardStore, type Dashboard } from '@/stores/dashboard';
import { type ObservatoryDTO } from '@/types/index.types';
import { useJubStore } from '@/stores/jub';
import { useRouter } from 'vue-router'


definePage({
  name: 'Dashboard',
  meta: {
    requiresAuth: false,
    layout: 'dashboard',
  },
});

// const dashboardStore = useDashboardStore();
// dashboardStore.initObservatory();
const router = useRouter();
const jubStore = useJubStore();
const filteredObservatories = ref<ObservatoryDTO[]>([]);
const viewMode = ref<'grid' | 'table'>('grid');
const searchQuery = ref('jub.v1.');
const showAutocomplete = ref(false);
const dynamicSuggestions = ref<string[]>([]);
const catalogData = {
  VS: ['TAMPS', 'CDMX', 'NL', 'MEXICO'],
  VT: ['2023', '2024', '2025', '2026'],
  VI: ['SEX.M', 'SEX.F', 'CIE10.C50']
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
  const validationResult = validateDsl(searchQuery.value);

  if (validationResult === true) {
    const result = await jubStore.search_observatories(searchQuery.value);
    console.log("Resultados de la búsqueda:", result);
    filteredObservatories.value = result; // Actualiza la lista de observatorios mostrados  


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


const goToDetails = (observatory: ObservatoryDTO) => {
  router.push({ name: 'ObservatoryDetails', params: { observatory_id: observatory.observatory_id } });

};


onMounted(async () => {
  // jubStore.fetchObservatories();
  filteredObservatories.value = await jubStore.get_observatories()
});




</script>