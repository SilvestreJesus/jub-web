import { defineStore } from 'pinia';
export interface Contact {
    id: number;
    name: string;
    phone: string;
    role: string[];
    image: string;
    country: string;
    bio: string;
}


export const useContactStore = defineStore('contact', () => {
    // Reactive state for team members and search query
    const contacts = ref<Contact[]>([]);
    const searchQuery = ref('');

    // Computed property to filter members based on search query
    const filteredContacts = computed(() => {
      if (!searchQuery.value) {
        return contacts.value;
      }
      return contacts.value.filter(member =>
        member.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });


    function initContacts(){
        for (let i = 1; i <= 12; i++) {
          let random_letters = Math.random().toString(36).substring(2, 10);


          const default_contact: Contact = {
            bio:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel sapien eget nunc efficitur varius. Sed at felis ac nisl convallis tincidunt. Curabitur a ligula id enim efficitur commodo.",
            country: "México",
            id: i,
            image: `https://api.dicebear.com/9.x/bottts/svg?seed=${i}`,
            name: `${random_letters} ${i}`,
            phone: `+52 55 1234 567${i}`,
            role: ["Desarrollador", "Diseñador"]
          }
          contacts.value= [...contacts.value, default_contact];
          // members+=
      }
    }

    return {
      contacts,
      searchQuery,
      filteredContacts,
      initContacts
    }
});