import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CrudService } from '../user/crud.service';
import { postData } from '../user/data.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  Data: postData[] = [];
  DataSubscription!: Subscription;

  constructor(private crudService: CrudService) {}

  ngOnInit() {
    this.DataSubscription = this.crudService.dataChanged.subscribe(
      (data: postData[]) => {
        this.Data = data;
      }
    );
    this.Data = this.crudService.getData();
  }
}
