<template>
<v-navigation-drawer  app permanent v-model="drawer" rail>
   <v-list>
          <v-list-item
            class="cursor-pointer"
            prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
            title="John Leider"
            :to="{'name': 'UserProfile'}"
          >
            <template v-slot:append>
              <v-btn
                icon="mdi-chevron-left"
                variant="text"
              ></v-btn>
            </template>
          </v-list-item>
          
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-home-city"
            title="Observatories"
            value="observatories"
            :to="{'name':'Dashboard'}"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-book-open"
            title="Catalogs"
            value="catalogs"
            :to="{'name':'Catalogs'}"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-graph"
            title="Products"
            value="products"
            :to="{'name':'Products'}"
          ></v-list-item>
            <v-list-item
            prepend-icon="mdi-cog"
            title="Settings"
            value="settings"
            :to="{'name':'Settings'}"
          ></v-list-item>
        <v-list-item
            prepend-icon="mdi-logout"
            title="Logout"
            value="logout"
            @click="logout"
          ></v-list-item>
        </v-list>
  </v-navigation-drawer>
</template>
<script lang="ts" setup>
import {useRouter} from 'vue-router'
const drawer = ref(true)
const router = useRouter()

const logout = () => {
    console.log(`Logout`)
    router.push({"name":"Home"})
}
</script>