import { defineStore } from 'pinia';
export interface Dashboard {
    review: string;
    id: number;
    name: string;
    role: string[];
    image: string;
    bio: string;
    percentage: string;
}


export const useDashboardStore = defineStore('dashboard', () => {
    // Reactive state for team members and search query
    const dashboard = ref<Dashboard[]>([]);
    const searchQuery = ref('');

    // Computed property to filter members based on search query
    const filteredObservatory = computed(() => {
      if (!searchQuery.value) {
        return dashboard.value;
      }
      return dashboard.value.filter(member =>
        member.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });


    function initObservatory(){
        for (let i = 1; i <= 12; i++) {
          let random_letters = Math.random().toString(36).substring(2, 10);
          let random_percentage = Math.floor(Math.random() * 100) + 1;

          const default_contact: Dashboard = {
            review: "100",
            bio:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque justo enim, facilisis quis magna vitae, rhouncus congue diam. Aliquam lobortis neque eu sapien mollis tempor.",
            id: i,
            image: `https://tse1.mm.bing.net/th/id/OIP.MzzXW3JNswiQ42uaJwDm5wHaEK?rs=1&pid=ImgDetMain&o=7&rm=3?seed=${i}`,
            name: `${random_letters} ${i}`,
            role: ["tag1", "tag1"],
            percentage: `${random_percentage}`
          }
          dashboard.value= [...dashboard.value, default_contact];
          // members+=
      }
    }

    return {
      dashboard,
      searchQuery,
      filteredObservatory,
      initObservatory
    }
});