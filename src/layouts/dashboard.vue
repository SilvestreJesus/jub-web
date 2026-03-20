<template>
  <dashboard-drawer :model-value="drawer" />

  <v-app-bar app color="white" elevation="0" height="72" class="px-2 border-b">
    <template v-slot:prepend>
      <v-btn @click="onBack" icon="mdi-arrow-left"></v-btn>
    </template>
    
    <template v-slot:append>
      
      <v-menu 
        v-model="showNotifications" 
        :close-on-content-click="false" 
        location="bottom end" 
        offset="10"
        transition="scale-transition"
      >
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props" variant="text" color="grey-darken-2" class="mr-2">
            <v-badge 
              :content="unreadCount" 
              :model-value="unreadCount > 0" 
              color="error" 
              max="99"
            >
              <v-icon>mdi-bell-outline</v-icon>
            </v-badge>
          </v-btn>
        </template>

        <v-card width="380" max-height="500" rounded="xl" elevation="6" class="d-flex flex-column overflow-hidden border">
          
          <v-toolbar color="white" density="compact" class="border-b px-2">
            <v-toolbar-title class="text-subtitle-1 font-weight-bold">Notificaciones</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip text="Marcar todas como leídas" location="bottom">
              <template v-slot:activator="{ props }">
                <v-btn 
                  v-bind="props" 
                  icon="mdi-check-all" 
                  variant="text" 
                  size="small" 
                  color="primary"
                  :disabled="unreadCount === 0"
                  @click="markAllAsRead"
                ></v-btn>
              </template>
            </v-tooltip>
          </v-toolbar>

          <v-list lines="three" class="pa-0 overflow-y-auto" bg-color="white">
            <template v-for="(notification, index) in notifications" :key="notification.id">
              
              <v-list-item 
                :class="{'bg-blue-lighten-5': !notification.read}" 
                class="px-4 py-3 transition-swing cursor-pointer"
                @click="markAsRead(notification.id)"
                hover
              >
                <template v-slot:prepend>
                  <v-avatar :color="notification.color" variant="tonal" size="40" class="mr-3 mt-1 align-self-start">
                    <v-icon size="small">{{ notification.icon }}</v-icon>
                  </v-avatar>
                </template>

                <v-list-item-title :class="{'font-weight-bold text-grey-darken-4': !notification.read, 'font-weight-medium text-grey-darken-2': notification.read}" class="text-body-2 mb-1">
                  {{ notification.title }}
                </v-list-item-title>
                
                <v-list-item-subtitle class="text-caption text-grey-darken-1 text-wrap mb-1" style="line-height: 1.3;">
                  {{ notification.message }}
                </v-list-item-subtitle>
                
                <div class="d-flex align-center mt-2">
                  <span class="text-caption text-grey font-weight-medium">{{ notification.time }}</span>
                  <v-spacer></v-spacer>
                  <div v-if="!notification.read" style="width: 8px; height: 8px; border-radius: 50%; background-color: rgb(var(--v-theme-primary));"></div>
                </div>
              </v-list-item>

              <v-divider v-if="index < notifications.length - 1"></v-divider>
            </template>

            <div v-if="notifications.length === 0" class="pa-6 text-center">
              <v-icon size="48" color="grey-lighten-2" class="mb-2">mdi-bell-sleep-outline</v-icon>
              <div class="text-body-2 text-grey-darken-1">No tienes notificaciones nuevas.</div>
            </div>
          </v-list>

          <v-card-actions class="bg-grey-lighten-4 justify-center py-2 border-t">
            <v-btn variant="text" color="black" class="text-none font-weight-bold text-caption" size="small">
              Ver todo el historial
            </v-btn>
          </v-card-actions>
          
        </v-card>
      </v-menu>

      <v-app-bar-nav-icon @click="drawer = !drawer" variant="text" color="grey-darken-2"></v-app-bar-nav-icon>
      
    </template>
  </v-app-bar>

  <v-main>
    <router-view />
  </v-main>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const drawer = ref(true);
const router = useRouter();

const onBack = () => {
  router.back();
};

const showNotifications = ref(false);

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'success' | 'info' | 'warning' | 'error';
  icon: string;
  color: string;
}

const notifications = ref<Notification[]>([
  {
    id: 'notif_1',
    title: 'Observatorio Generado',
    message: 'El Observatorio de Salud Pública NL ha terminado de procesar sus catálogos.',
    time: 'Hace 5 min',
    read: false,
    type: 'success',
    icon: 'mdi-check-circle-outline',
    color: 'success'
  },
  {
    id: 'notif_2',
    title: 'Error en Producto',
    message: 'Falló la generación de la gráfica "Distribución CIE-10" por un timeout en la API.',
    time: 'Hace 45 min',
    read: false,
    type: 'error',
    icon: 'mdi-alert-circle-outline',
    color: 'error'
  },
  {
    id: 'notif_3',
    title: 'Nuevo Catálogo Disponible',
    message: 'Se ha agregado el catálogo espacial de Municipios de Tamaulipas (Nivel 2).',
    time: 'Ayer',
    read: true,
    type: 'info',
    icon: 'mdi-database-plus-outline',
    color: 'secondary-blue'
  },
  {
    id: 'notif_4',
    title: 'Exportación Lista',
    message: 'Tu archivo CSV de 15,000 registros ya está listo para descargar.',
    time: 'Hace 2 días',
    read: true,
    type: 'success',
    icon: 'mdi-file-delimited-outline',
    color: 'success'
  }
]);

const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.read).length;
});

const markAsRead = (id: string) => {
  const notif = notifications.value.find(n => n.id === id);
  if (notif && !notif.read) {
    notif.read = true;
    // Call : jubStore.markNotificationAsRead(id)
  }
};

// Marcar todas como leídas
const markAllAsRead = () => {
  notifications.value.forEach(n => n.read = true);
  // Call : jubStore.markAllNotificationsAsRead()
};
</script>

<style scoped>
.v-list-item {
  transition: background-color 0.2s ease;
}
</style>