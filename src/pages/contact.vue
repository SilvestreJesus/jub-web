<template>
  <v-container class="py-10">
    <div class="text-center mb-10">
      <h1 class="text-h3 font-weight-bold mb-4">Contacta al equipo</h1>
      
      <v-responsive max-width="600" class="mx-auto">
        <v-combobox 
            v-model:search="contactStore.searchQuery"
            placeholder="Busca un miembro del equipo..." 
            variant="solo-filled" 
            rounded="pill" 
            flat 
            bg-color="grey-lighten-3" 
            :items="contactStore.contacts" 
            item-title="name"
            persistent-search
            clearable
            hide-no-data
            :return-object="false"
          />

        <p class="text-caption text-grey mt-2">
          Si no encuentras con quién comunicarte, escríbenos a 
          <a href="mailto:jub@cinvestav.mx" class="text-grey font-weight-bold text-decoration-none">jub@cinvestav.mx</a>
        </p>
      </v-responsive>
    </div>

    <v-row>
      <v-col v-for="member in contactStore.filteredContacts" :key="member.id" cols="12" sm="6" md="4">
        <ContactCard :member="member" @show-details="openDialog" />
      </v-col>
    </v-row>

    <ContactDialog v-model="showDialog" :member="selectedMember" />
  </v-container>
</template>

<script lang="ts" setup>
import { ref} from 'vue';
import { useContactStore, type Contact } from '@/stores/contacts';

definePage({
    name: 'Contact',
    meta: {
        requiresAuth: false,
        layout: 'default',
    },
});





const contactStore      = useContactStore();
contactStore.initContacts();


// teamStore.members =
const showDialog     = ref(false);
const selectedMember = ref<Contact | null>(null);

const openDialog = (member: Contact) => {
  selectedMember.value = member;
  showDialog.value = true;
};


</script>

<style scoped lang="sass">
</style>