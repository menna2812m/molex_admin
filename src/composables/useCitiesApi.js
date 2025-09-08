import { ref } from "vue";
import crudDataService from "../Services/crudDataService.js";

export function useCitiesApi() {
  const cities = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchCities = async (page = 1, limit = 10, regionId = null) => {
    loading.value = true;
    error.value = null;

    try {
      let url = `cities?page=${page}&limit=${limit}`;
      if (regionId) {
        url += `&region_id=${regionId}`;
      }

      const response = await crudDataService.getAll(url);

      if (response.data.status === 200) {
        cities.value = response.data.data.data || response.data.data;
      } else {
        error.value = response.data.message || "خطأ في استرجاع البيانات";
      }
    } catch (err) {
      error.value = err.response?.data?.message || "خطأ في الاتصال بالخادم";
      console.error("Error fetching cities:", err);
    } finally {
      loading.value = false;
    }
  };

  const getCityById = async (id) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await crudDataService.getAll(`cities/${id}`);

      if (response.data.status === 200) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || "خطأ في استرجاع البيانات");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "خطأ في الاتصال بالخادم";
      error.value = errorMessage;
      throw new Error(errorMessage);
    } finally {
      loading.value = false;
    }
  };

  const createCity = async (data) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await crudDataService.create("cities", data);

      if (response.data.status === 200) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || "خطأ في إنشاء المدينة");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "خطأ في الاتصال بالخادم";
      error.value = errorMessage;
      throw new Error(errorMessage);
    } finally {
      loading.value = false;
    }
  };

  const updateCity = async (id, data) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await crudDataService.create(
        `cities/${id}?_method=put`,
        data
      );

      if (response.data.status === 200) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || "خطأ في تحديث المدينة");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "خطأ في الاتصال بالخادم";
      error.value = errorMessage;
      throw new Error(errorMessage);
    } finally {
      loading.value = false;
    }
  };

  const deleteCity = async (id) => {
    loading.value = true;
    error.value = null;

    try {
      await crudDataService.delete("cities", id);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "خطأ في الاتصال بالخادم";
      error.value = errorMessage;
      throw new Error(errorMessage);
    } finally {
      loading.value = false;
    }
  };

  return {
    cities,
    loading,
    error,
    fetchCities,
    getCityById,
    createCity,
    updateCity,
    deleteCity,
  };
}
