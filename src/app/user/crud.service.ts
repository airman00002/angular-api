import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { postData } from './data.model';

@Injectable({ providedIn: 'root' })
export class CrudService {
  dataChanged = new Subject<postData[]>();

  private data: postData[] = [
    new postData(
      'https://travel.thaivisa.com/wp-content/uploads/2021/02/141_20201013185512_Consumer-Survey-Finds-70-Percent-of-Travelers-Plan-to-Holiday-in-2021.jpg',
      'Test 1',
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
    ),
    new postData(
      'https://assets.brandinside.asia/uploads/2018/02/Bitcoin-1.jpg',
      'Bitcoin',
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
    ),
    new postData(
      'https://www.aljazeera.com/wp-content/uploads/2021/05/AP21110564598724.jpg?resize=770%2C513',
      'Doge Coin',
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
    ),
    new postData(
      'https://lh3.googleusercontent.com/proxy/h4ik1lHgL66hcbOMvVLESPlysYVU0edL7cbZ6tJiwImotUeJx5EjkegHMzW6FmK2Cq8ER3tdB4SkHEjSRSOaHNF87ej6w19L4MnFD6otwNiaSdbxcw',
      'New Zealand',
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
    ),
    new postData(
      'http://www.efinancethai.com/news/picture/2021/4/28/T/5723398.jpg',
      'Test 2',
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
    ),
  ];
  constructor() {}

  getData() {
    // return this.dataChanged.next(this.data.slice());
    return this.data.slice();
  }
  getDataById(index: number) {
    return this.data[index];
  }
  addData(data: postData) {
    this.data.push(data);
    this.dataChanged.next(this.data.slice());
  }

  updateData(index: number, newData: postData) {
    this.data[index] = newData;
    this.dataChanged.next(this.data.slice());
  }

  deleteData(index: number) {
    this.data.splice(index, 1);
    this.dataChanged.next(this.data.slice());
  }

}
