import axios from 'axios';

// Add a request interceptor
axios.interceptors.request.use( config => {
  const user = JSON.parse(localStorage.getItem('user'));

  if(user && user.accessToken){
    const token = 'Bearer ' + user.accessToken;
    config.headers.Authorization =  token;
  }

  return config;
});

class BackendService {
  async getUserBoard() {
    return await axios.get("/api/test/user");
  }


  async getAdminBoard() {
    return await axios.get("/api/test/admin");
  }

  async getThemeList() {
    return await axios.get("/api/collection/theme");
  }
  async addNewCollection(data) {
    return await axios.post("/api/collection/new",data);
  }

  async createUserCollection(id,data) {
    return await axios.post(`/api/collection/new/${id}`,data);
  }

  async getCurrentUserCollections() {
    return await axios.get("/api/collection/user");
  }

  async getUserCollections(id) {
    return await axios.get(`/api/collection/user/${id}`);
  }

  async removeCollectionById(id){
    return await axios.delete(`/api/collection/delete/${id}`);
  }

  async getCollectionById(id){
    return await axios.get(`/api/collection/edit/${id}`);
  }

  async editCollection(id,data) {
    return await axios.post(`/api/collection/sendEdit/${id}`,data);
  }

  async addNewItem(id,data) {

    return await axios.post(`/api/collection/${id}/newItem`,data);
  }

  async getItemByCollectionId(id) {

    return await axios.get(`/api/collection/${id}/getItems`);
  }

  async getItemById(id) {

    return await axios.get(`/api/collection/editItem/${id}`);
  }

  async editItem(id,data) {
    return await axios.post(`/api/collection/editItem/${id}`,data);
  }

  async removeItemById(id){
    return await axios.delete(`/api/collection/deleteItem/${id}`);
  }

  async addComment(data){
    return await axios.post("/api/collection/addComment",data);
  }

  async addLike(id){
    return await axios.post(`/api/collection/addLike/${id}`);
  }

  async addAdmin(id){
    return await axios.post(`/api/addAdmin/${id}`);
  }

  async setActive(id){
    return await axios.post(`/api/addActive/${id}`);
  }

  async removeUserById(id){
    return await axios.delete(`/user/${id}`);
  }

  async getUserInById(id) {

    return await axios.get(`/profile/${id}`);
  }

  async getLastAddedItems() {
    return await axios.get("/api/collection/home/lastAddedItems");
  }

  async getLargestCollections() {
    return await axios.get("/api/collection/home/largestCollections");
  }
}

export default new BackendService();