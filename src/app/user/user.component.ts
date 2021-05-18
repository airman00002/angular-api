import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { CrudService } from './crud.service';
import { postData } from './data.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private crudService: CrudService) {}

  Data: postData[] = [];
  DataSubscription!: Subscription;

  ngOnInit() {
    this.DataSubscription = this.crudService.getData();
    this.DataSubscription = this.crudService.dataChanged.subscribe(
      (data: postData[]) => {
        this.Data = data;
      }
    );
  }

  onCreatePage() {
    this.router.navigate(['create']);
  }
  onEditPage() {
    this.router.navigate(['edit']);
  }

  onDelete(id: any, index: any) {
    if (window.confirm('Are you sure you want to delete')) {
      console.log('id : ' + id);
      this.crudService.deleteData(id, index);
    }
  }

  ngOnDestroy() {
    this.DataSubscription.unsubscribe();
  }
}
