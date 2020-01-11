import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  tasks: any;
  showDetails: boolean;
  details: any;
  taskToEdit: any;
  taskToEditId: string;
  taskToDelete: any;
  constructor(private titleService: Title, private _httpService: HttpService) { }
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
  ngOnInit() {
    this.titleService.setTitle("RESTFUL TASKS API");
    this.getTasksFromService();
  }
  getTasksFromService() {
    let observable = this._httpService.getTasks();
    observable.subscribe(data => {
      console.log("Tasks retrieved!", data)
      this.tasks = data;
    });
  }
  getTaskDetails(id: string) {
    let observable = this._httpService.getOneTask(id);
    observable.subscribe(data => {
      console.log("Single task retrieved!", data)
      this.showDetails = true;
      this.details = data;
    })
  }
  editTask(id: string) {
    this.taskToEdit = id;
    //HOW THE HELL DO I SPECIFY WHICH TASK TO EDIT
    let observable = this._httpService.editTask(this.taskToEdit);
    observable.subscribe(data => {
      console.log("Task edited!", data, this.taskToEdit)
      this.showDetails = false;
      this.taskToEdit = null;
    })
  }
  deleteTask(id: string) {
    let observable = this._httpService.deleteTask(this.taskToDelete);
    observable.subscribe(data => {
      console.log("Task deleted!", data)
    })
  }
}
