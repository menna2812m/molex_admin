import http from '@/http-common'
import axios from 'axios';
class crudDataService {
  getAll(table_name){
      return http.get(`/${table_name}`);
  }

  get(table_name, id){
    return http.get(`/${table_name}/${id}`);
  }
  search(table_name, term){
    return http.get(`/${table_name}${term}`);
  }
  create(table_name, data,headers) {
    return http.post(`/${table_name}`, data,headers);
  }
  put(table_name, data,headers) {
    return http.put(`/${table_name}`, data,headers);
  }
  update(table_name, id, data) {
    return http.put(`/${table_name}/${id}`, data);
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

  get_request(url){
    return http.get(`/${url}`);
  }update
}

export default new crudDataService();