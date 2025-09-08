import { ref } from "vue";
import crudDataService from "../Services/crudDataService.js";

export function useDistrictsApi() {
  const districts = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchDistricts = async (page = 1, limit = 10) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await crudDataService.getAll(
        `districts?page=${page}&limit=${limit}`
      );

      if (response.data.status === 200) {
        districts.value = response.data.data.data || response.data.data;
      } else {
        error.value = response.data.message || "خطأ في استرجاع البيانات";
      }
    } catch (err) {
      error.value = err.response?.data?.message || "خطأ في الاتصال بالخادم";
      console.error("Error fetching districts:", err);
    } finally {
      loading.value = false;
    }
  };

  const getDistrictById = async (id) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await crudDataService.getAll(`districts/${id}`);

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

  const createDistrict = async (data) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await crudDataService.create("districts", data);

      if (response.data.status === 200) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || "خطأ في إنشاء الحي");
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

  const updateDistrict = async (id, data) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await crudDataService.create(
        `districts/${id}?_method=put`,
        data
      );

      if (response.data.status === 200) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || "خطأ في تحديث الحي");
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

  const deleteDistrict = async (id) => {
    loading.value = true;
    error.value = null;

    try {
      await crudDataService.delete("districts", id);
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
    districts,
    loading,
    error,
    fetchDistricts,
    getDistrictById,
    createDistrict,
    updateDistrict,
    deleteDistrict,
  };
}
