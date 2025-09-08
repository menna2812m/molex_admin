import { ref } from "vue";
import crudDataService from "../Services/crudDataService.js";

export function useRegionsApi() {
  const regions = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchRegions = async (page = 1, limit = 10, countryId = null) => {
    loading.value = true;
    error.value = null;

    try {
      let url = `regions?page=${page}&limit=${limit}`;

      if (countryId) {
        url += `&country_id=${countryId}`;
      }

      const response = await crudDataService.getAll(url);

      if (response.data.status === 200) {
        regions.value = response.data.data.data || response.data.data;
      } else {
        error.value = response.data.message || "خطأ في استرجاع البيانات";
      }
    } catch (err) {
      error.value = err.response?.data?.message || "خطأ في الاتصال بالخادم";
      console.error("Error fetching regions:", err);
    } finally {
      loading.value = false;
    }
  };

  const getRegionById = async (id) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await crudDataService.getAll(`regions/${id}`);

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

  const createRegion = async (data) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await crudDataService.create("regions", data);

      if (response.data.status === 200) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || "خطأ في إنشاء المنطقة");
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

  const updateRegion = async (id, data) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await crudDataService.create(
        `regions/${id}?_method=put`,
        data
      );

      if (response.data.status === 200) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || "خطأ في تحديث المنطقة");
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

  const deleteRegion = async (id) => {
    loading.value = true;
    error.value = null;

    try {
      await crudDataService.delete("regions", id);
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
    regions,
    loading,
    error,
    fetchRegions,
    getRegionById,
    createRegion,
    updateRegion,
    deleteRegion,
  };
}
