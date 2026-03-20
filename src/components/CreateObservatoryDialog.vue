<template>
    <v-dialog :model-value="modelValue" @update:model-value="emit('update:modelValue',$event)" max-width="700" persistent>
  <v-card rounded="lg" elevation="10">
    <v-toolbar color="black" density="comfortable" flat>
      <v-toolbar-title class="text-body-1 font-weight-bold">
        <v-icon start>mdi-code-json</v-icon>
        Ingestar Configuración (YAML)
      </v-toolbar-title>
      <v-btn icon="mdi-close" :disabled="jubStore.isLoading" @click="emit('update:modelValue', false)"></v-btn>
    </v-toolbar>

    <v-tabs v-model="yamlMode" grow color="primary" bg-color="grey-lighten-4">
      <v-tab value="editor" class="text-none font-weight-bold">
        <v-icon start>mdi-console-line</v-icon> Editor YAML
      </v-tab>
      <v-tab value="file" class="text-none font-weight-bold">
        <v-icon start>mdi-file-upload-outline</v-icon> Subir Archivo
      </v-tab>
    </v-tabs>

    <v-card-text class="pa-6">
      <v-window v-model="yamlMode">
        
        <v-window-item value="editor">
          <p class="text-caption text-grey-darken-1 mb-2">
            Pega o escribe tu configuración YAML para Catalogos, Observatorios y Productos.
          </p>
          <v-textarea
            v-model="yamlText"
            variant="outlined"
            bg-color="grey-lighten-5"
            placeholder="catalogs:&#10;  - catalog_id: 'VS'&#10;..."
            rows="12"
            auto-grow
            hide-details
            class="font-monospace"
            style="font-family: monospace;"
          ></v-textarea>
        </v-window-item>

        <v-window-item value="file">
          <v-empty-state
            icon="mdi-file-document-outline"
            title="Selecciona un archivo .yml o .yaml"
            text="El archivo será validado contra el esquema de JubFile."
            class="mb-4"
          ></v-empty-state>
          
          <v-file-input
            v-model="yamlFile"
            label="Cargar archivo YAML"
            variant="outlined"
            accept=".yml,.yaml"
            prepend-icon=""
            prepend-inner-icon="mdi-paperclip"
            show-size
            density="comfortable"
          ></v-file-input>
        </v-window-item>

      </v-window>
    </v-card-text>

    <v-divider />

    <v-card-actions class="pa-4 bg-grey-lighten-5">
      <v-spacer />
      <v-btn variant="text" :disabled="jubStore.isLoading" @click="emit('update:modelValue', false)">Cancelar</v-btn>
      <v-btn 
        color="black" 
        class="px-6" 
        :loading="jubStore.isLoading"
        @click="handleCreateTask"
      >
        Procesar YAML
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script lang="ts" setup>
import { useJubStore } from '@/stores/jub';
import { useAppStore, SnackbarColor } from '@/stores/app';
import { ref } from 'vue';
const jubStore = useJubStore();
const appStore = useAppStore();
const yamlMode = ref<'editor' | 'file'>('editor');
const yamlText = ref('');
const yamlFile = ref<File[]>([]); 



const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'success'): void; 
}>();

const handleCreateTask = async () => {
  let payloadBlob: Blob | File;

  if (yamlMode.value === 'editor') {
    if (!yamlText.value.trim()) {
      appStore.showSnackbar("El editor YAML está vacío", 3000, SnackbarColor.ERROR);
      return;
    }
    payloadBlob = new Blob([yamlText.value], { type: 'application/x-yaml' });
  } else {
    const selectedFile = Array.isArray(yamlFile.value) ? yamlFile.value[0] : yamlFile.value;
    if (!yamlFile.value || yamlFile.value.length === 0) {
      appStore.showSnackbar("Selecciona un archivo primero", 3000, SnackbarColor.ERROR);
      return;
    }
    payloadBlob = selectedFile as File;
  }

  const success = await jubStore.upload_yaml(payloadBlob);
  console.log("Resultado de la ingesta YAML:", success, "Error:", jubStore.error);
  if (success) {
    appStore.showSnackbar("Configuración procesada e ingesta exitosa", 4000, SnackbarColor.SUCCESS);
    emit('update:modelValue', false);
    emit('success');
    
    yamlText.value = '';
    yamlFile.value = [];
    
  } else {
    appStore.showSnackbar(jubStore.error || "Error al procesar el YAML", 5000, SnackbarColor.ERROR);
  }
};
</script>