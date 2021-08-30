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
    return await axios.get("https://backendforproject.herokuapp.com/api/test/user");
  }


  async getAdminBoard() {
    return await axios.get("https://backendforproject.herokuapp.com/api/test/admin");
  }

  async getThemeList() {
    return await axios.get("https://backendforproject.herokuapp.com/api/collection/theme");
  }
  async addNewCollection(data) {
    return await axios.post("https://backendforproject.herokuapp.com/api/collection/new",data);
  }

  async createforUserCollection(id,data) {
    return await axios.post(`https://backendforproject.herokuapp.com/api/collection/new/${id}`,data);
  }

  async getCurrentUserCollections() {
    return await axios.get("https://backendforproject.herokuapp.com/api/collection/user");
  }

  async getUserCollections(id) {
    return await axios.get(`https://backendforproject.herokuapp.com/api/collection/user/${id}`);
  }

  async removeCollectionById(id){
    return await axios.delete(`https://backendforproject.herokuapp.com/api/collection/delete/${id}`);
  }

  async getCollectionById(id){
    return await axios.get(`https://backendforproject.herokuapp.com/api/collection/edit/${id}`);
  }

  async editCollection(id,data) {
    return await axios.post(`https://backendforproject.herokuapp.com/api/collection/sendEdit/${id}`,data);
  }

  async addNewItem(id,data) {

    return await axios.post(`https://backendforproject.herokuapp.com/api/collection/${id}/newItem`,data);
  }

  async getItemByCollectionId(id) {

    return await axios.get(`https://backendforproject.herokuapp.com/api/collection/${id}/getItems`);
  }

  async getItemById(id) {

    return await axios.get(`https://backendforproject.herokuapp.com/api/collection/getItem/${id}`);
  }

  async editItem(id,data) {
    return await axios.post(`https://backendforproject.herokuapp.com/api/collection/editItem/${id}`,data);
  }

  async removeItemById(id){
    return await axios.delete(`https://backendforproject.herokuapp.com/api/collection/deleteItem/${id}`);
  }

  async removeFieldItemById(id){
    return await axios.delete(`https://backendforproject.herokuapp.com/api/collection/deleteFieldItem/${id}`);
  }

  async addComment(data){
    return await axios.post("https://backendforproject.herokuapp.com/api/collection/addComment",data);
  }

  async addLike(id){
    return await axios.post(`https://backendforproject.herokuapp.com/api/collection/addLike/${id}`);
  }

  async addAdmin(id){
    return await axios.post(`https://backendforproject.herokuapp.com/api/addAdmin/${id}`);
  }

  async setActive(id){
    return await axios.post(`https://backendforproject.herokuapp.com/api/addActive/${id}`);
  }

  async removeUserById(id){
    return await axios.delete(`https://backendforproject.herokuapp.com/user/${id}`);
  }

  async getUserInById(id) {

    return await axios.get(`https://backendforproject.herokuapp.com/profile/${id}`);
  }

  async getLastAddedItems() {
    return await axios.get("https://backendforproject.herokuapp.com/api/collection/home/lastAddedItems");
  }

  async getLargestCollections() {
    return await axios.get("https://backendforproject.herokuapp.com/api/collection/home/largestCollections");
  }

  async getItemLike(id) {
    return await axios.get(`https://backendforproject.herokuapp.com/api/collection/getLike/${id}`);
  }
  async getTypeList() {
    return await axios.get("https://backendforproject.herokuapp.com/api/collection/type");
  }
}

export default new BackendService();