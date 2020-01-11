import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  newCake: any;
  newComment: any;
  allCakes: any;
  focusCake: any;
  searchResults: any;
  focusCakeAverage: string;

  constructor(private titleService: Title, private _httpService: HttpService) { }
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit() {
    this.titleService.setTitle("Rate My Cakes");
    this.getAllCakesViaService();
    this.focusCake = { "baker": "", "imageURL": "", comments: [] };
    this.newCake = { "baker": "", "imageURL": "", comments: [] };
    this.newComment= { "content": "", "rating": "" };
  }

  getAllCakesViaService() {
    let observable = this._httpService.getAllCakesService();
    observable.subscribe(data => {
      console.log("All cakes retrieved!", data)
      this.allCakes = data;
      this.allCakes = this.allCakes.results;
    });
  }

  getOneCakeViaService(cakeID) {
    let observable = this._httpService.getOneCakeService(cakeID);
    observable.subscribe(data => {
      console.log("Cake retrieved!", data)
      this.focusCake = data;
      this.focusCake = this.focusCake.results;
      var ratings = [];
      for (var i in this.focusCake.comments){
        ratings.push(this.focusCake.comments[i].rating);
      }
      var sum = 0;
      for (var i in ratings){
        sum += ratings[i];
      }
      var ans = sum/ratings.length;
      this.focusCakeAverage = ans.toFixed(1);
    });
  }

  createCakeViaService() {
    let observable = this._httpService.createCakeService(this.newCake);
    observable.subscribe(data => {
      console.log("Cake created!", data)
      this.newCake = { "baker": "", "imageURL": "", comments: [] };
    });
    this.getAllCakesViaService();
  }

  addCommentViaService(cakeID) {
    let observable = this._httpService.addCommentService(cakeID, this.newComment);
    observable.subscribe(data => {
      console.log("Comment added!", data)
      this.newComment = { "content": "", "rating": "" };
    });
    this.getAllCakesViaService();
    this.getOneCakeViaService(cakeID);
  }

}
