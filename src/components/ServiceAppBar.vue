<template>

  <v-navigation-drawer v-model="drawer" temporary location="right">
        <v-list nav>
          <template v-for="item in menuItems" :key="item.title">
            
            <v-list-group v-if="item.hasDropdown" :value="item.title">
              
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  :title="item.title"
                  class="font-weight-medium"
                ></v-list-item>
              </template>
              
              <v-list-item
                v-for="subItem in item.items"
                :key="`mobile_${subItem.title}`"
                :title="subItem.title"
                :value="subItem.title"
                @click="onMenuClick(subItem)"
                class="ml-4" 
              ></v-list-item>
              </v-list-group>

            <v-list-item 
              v-else
              :title="item.title"
              :value="item.title"
              @click="onMenuClick(item)"
              class="font-weight-medium"
            ></v-list-item>

          </template>
        </v-list>
  </v-navigation-drawer>    



  <v-app-bar app :color="props.color" elevation="1" height="80" class="px-6">
    <v-btn color="white" variant="outlined" rounded class="text-none font-weight-bold" @click="router.push('/')">
      Prueba
    </v-btn>
    <!-- <v-avatar size="60"> -->
      <!-- <v-img src="@/assets/logo.svg" alt="JUB Logo"></v-img> -->
    <!-- </v-avatar> -->
      <v-spacer></v-spacer>
      <div class="d-none d-md-flex align-center">
          <v-btn 
            v-for="item in menuItems" 
            :key="item.title"
            :append-icon="item.hasDropdown ? 'mdi-menu-down' : undefined"
            variant="text" 
            class="text-none font-weight-medium mx-1"
            @click="onMenuClick(item)"
          >
            {{ item.title }}
            <v-menu v-if="item.hasDropdown" offset-y activator="parent">
              <v-list>
                <v-list-item v-for="subItem in item.items" :key="`_${subItem.title}`" @click="onMenuClick(subItem)" >
                  <v-list-item-title>{{ subItem.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-btn>
      </div>
    

      <v-app-bar-nav-icon class="d-md-none ml-2" variant="text" @click="drawer = !drawer" color="white"/>
  </v-app-bar>    
    
</template>
<script lang="ts" setup>
interface MenuItem {
  title: string;
  hasDropdown: boolean;
  items?: MenuItem[]; // For dropdown items
  route: string; // Added route for navigation
}
const router = useRouter();

const menuItems: MenuItem[] = [
  { title: 'Inicio', hasDropdown: false, route: '/' },
  { 
    title: 'Servicios',
    hasDropdown: true,
    route: '/services',
    items: [
      { title: 'Xelhua', hasDropdown: false, route: '/services/xelhua' },
      { title: 'Nez', hasDropdown: false, route: '/services/nez' },
      { title: 'MictlanX', hasDropdown: false, route: '/services/mictlanx' },
    ],
  },
  {
    title: "Observatorios",
    hasDropdown: true,
    route: '/observatory',
    items: [
      { title: 'Azomalli', hasDropdown: false, route: '/observatories/azomalli' },
      { title: 'IMA', hasDropdown: false, route: '/observatories/ima' },
    ],

  },
  { title: 'Contacto', hasDropdown: false, route: '/contact' },
];



const props = defineProps({
  color: {
    type: String,
    default: 'black',
  },
});


const drawer = ref(false);


function onMenuClick(item: MenuItem) {
  if (item.hasDropdown) {
    // If it's a dropdown, we don't navigate, just toggle the menu
    return;
  }
  router.push(item.route);  
} 
</script>