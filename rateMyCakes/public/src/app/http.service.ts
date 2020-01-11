import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  constructor(private _http: HttpClient) { }

  getAllCakesService() {
    return this._http.get("/api/cakes")
  };

  getOneCakeService(id) {
    return this._http.get(`/api/cakes/${id}`)
  };

  createCakeService(newCake) {
    return this._http.post("/api/cakes/create", newCake)
  };

  addCommentService(id, newComment) {
    return this._http.put(`/api/cakes/${id}/comment`, newComment)
  };

}
