import { ref } from "vue";
import crudDataService from "../Services/crudDataService.js";

export function useCountriesApi() {
  const countries = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchCountries = async (page = 1, limit = 100) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await crudDataService.getAll(
        `countries?page=${page}&limit=${limit}`
      );

      if (response.data.status === 200) {
        countries.value = response.data.data.data || response.data.data;
      } else {
        error.value = response.data.message || "خطأ في استرجاع البيانات";
      }
    } catch (err) {
      error.value = err.response?.data?.message || "خطأ في الاتصال بالخادم";
      console.error("Error fetching countries:", err);
    } finally {
      loading.value = false;
    }
  };

  return {
    countries,
    loading,
    error,
    fetchCountries,
  };
}
