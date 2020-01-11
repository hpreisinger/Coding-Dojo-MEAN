import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpService } from './http.service';
import { observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  gold: number;
  log: any;
  constructor(private titleService: Title, private _httpService: HttpService){}
  public setTitle( newTitle: string){
    this.titleService.setTitle( newTitle );
  }
  ngOnInit() {
    console.log("Setting page title...");
    this.titleService.setTitle("Ninja Gold 2");
    console.log("Setting starting variables...");
    this.gold = 0;
    this.log = [];
    console.log("Gold is", this.gold);
    console.log("Log is", this.log);
  }
  getRandInt(min: number, max: number) {
    console.log("Generating random number...");
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log("The number is", num);
    return num;
  }
  updateLog(newEntry: string){
    console.log("Updating log...");
    this.log.unshift(newEntry);
    console.log("Log updated!", newEntry);
  }
  clickedFarm(){
    console.log("Farm has been clicked!");
    var num = this.getRandInt(10,20);
    this.gold += num;
    console.log("Gold is now", this.gold);
    var entry = `You earned ${num} gold at the farm.`;
    this.updateLog(entry);
  }
  clickedCave(){
    console.log("Cave has been clicked!");
    var num = this.getRandInt(5,10);
    this.gold += num;
    console.log("Gold is now", this.gold);
    var entry = `You earned ${num} gold at the cave.`;
    this.updateLog(entry);
  }
  clickedHouse(){
    console.log("House has been clicked!");
    var num = this.getRandInt(2,5);
    this.gold += num;
    console.log("Gold is now", this.gold);
    var entry = `You earned ${num} gold at the house.`;
    this.updateLog(entry);
  }
  clickedCasino(){
    console.log("Casino has been clicked!");
    var num = this.getRandInt(-50,50);
    this.gold += num;
    console.log("Gold is now", this.gold);
    if (num >= 0){
      var entry = `You earned ${num} gold at the casino.`;
    };
    if (num < 0){
      num = num * -1;
      var entry = `You lost ${num} gold at the casino.`;
    };
    this.updateLog(entry);
  }
}
