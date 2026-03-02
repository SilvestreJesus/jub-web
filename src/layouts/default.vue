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
    
    
   

    <v-app-bar app color="white" elevation="1" height="80" class="px-6">

      <!-- Navigation Drawer Toggle -->

      <div class="d-flex align-center">
        <v-avatar color="grey-lighten-3" size="50" class="mr-4">
          <v-img src="@/assets/cinvestav.svg" contain></v-img>
          <!-- <span class="text-caption">Logo 1</span> -->
        </v-avatar>
        <v-img width="200" src="@/assets/secihti.svg" contain></v-img>
 
      </div>

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
    

      <v-app-bar-nav-icon class="d-md-none ml-2" variant="text" @click="drawer = !drawer" color="black"/>
    </v-app-bar>    
    
    <v-main>
        <router-view />
    </v-main>

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
    route: '/observatory'
    , items: [
      { title: 'Azomalli', hasDropdown: false, route: '/observatories/azomalli' },
      { title: 'IMA', hasDropdown: false, route: '/observatories/ima' },
      // { title: 'Tlalocan', hasDropdown: false, route: '/observatories/tlalocan' },
    ]
  },
  { title: 'Contacto', hasDropdown: false, route: '/contact' },
];
const drawer = ref(false);


function onMenuClick(item: MenuItem) {
  if (item.hasDropdown) {
    // Handle dropdown logic here (e.g., toggle submenu)
    return;
  }
  router.push(item.route);
  drawer.value = false; // Close the drawer after navigation
}

</script>