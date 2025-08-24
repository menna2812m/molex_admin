import http from "@/http-common";
import axios from "axios";

class crudDataService {
  getAll(table_name, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString
      ? `/${table_name}?${queryString}`
      : `/${table_name}`;
    return http.get(url);
  }

  get(table_name, id) {
    return http.get(`/${table_name}/${id}`);
  }

  search(table_name, term) {
    return http.get(`/${table_name}${term}`);
  }

  create(table_name, data, config = {}) {
    return http.post(`/${table_name}`, data, config);
  }

  put(table_name, data, config = {}) {
    return http.put(`/${table_name}`, data, config);
  }

  update(table_name, id, data, config = {}) {
    return http.put(`/${table_name}/${id}`, data, config);
  }

  // Method for updating with form data (for file uploads)
  updateWithFormData(table_name, id, data, config = {}) {
    const formData = new FormData();

    // Add _method field for Laravel method spoofing
    formData.append("_method", "PUT");

    // Append all data to FormData
    Object.keys(data).forEach((key) => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });

    return http.post(`/${table_name}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...config.headers,
      },
    });
  }

  delete(table_name, id) {
    return http.delete(`/${table_name}/${id}`);
  }

  deleteAll(table_name) {
    return http.delete(`/${table_name}`);
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }

  get_request(url) {
    return http.get(`/${url}`);
  }

  // Announcements specific methods
  getAnnouncements(filters = {}) {
    return this.getAll("announcements", filters);
  }

  getAnnouncement(id) {
    return this.get("announcements", id);
  }

  createAnnouncement(data) {
    return this.create("announcements", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  updateAnnouncement(id, data) {
    return this.updateWithFormData("announcements", id, data);
  }

  deleteAnnouncement(id) {
    return this.delete("announcements", id);
  }

  toggleAnnouncementStatus(id) {
    return this.create(`announcements/${id}/toggle`, {});
  }

  // Public announcements API (no auth required)
  getPublicAnnouncements() {
    return axios.get("/api/announcements");
  }
}

export default new crudDataService();
