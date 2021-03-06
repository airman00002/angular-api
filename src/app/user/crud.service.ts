import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { postData } from './data.model';

@Injectable({ providedIn: 'root' })
export class CrudService {
  dataChanged = new Subject<postData[]>();

  // private data: postData[] = [
  //   new postData(
  //     'https://travel.thaivisa.com/wp-content/uploads/2021/02/141_20201013185512_Consumer-Survey-Finds-70-Percent-of-Travelers-Plan-to-Holiday-in-2021.jpg',
  //     'Test 1',
  //     'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
  //   ),
  //   new postData(
  //     'https://assets.brandinside.asia/uploads/2018/02/Bitcoin-1.jpg',
  //     'Bitcoin',
  //     'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
  //   ),
  //   new postData(
  //     'https://www.aljazeera.com/wp-content/uploads/2021/05/AP21110564598724.jpg?resize=770%2C513',
  //     'Doge Coin',
  //     'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
  //   ),
  //   new postData(
  //     'http://www.efinancethai.com/news/picture/2021/4/28/T/5723398.jpg',
  //     'Test 2',
  //     'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
  //   ),
  // ];

  //   var reqHeader = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('mpManagerToken'))
  //  });

  // httpHeaders = new Headers({'Content-Type': 'application/json','Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYyMTc4NjA4N30.GHXP63B3lkgyy5zbMMMlrINjafB8QUZCsKYUJK53qLE'});

  private data: postData[] = [];
  REST_API: string = 'http://localhost:8080/blog';
  // httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  Token:any = localStorage.getItem('token');
  httpHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization:
      `Bearer ${this.Token}`,
  });

  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get<postData[]>(this.REST_API).subscribe((data) => {
      this.data = data;
      return this.dataChanged.next(this.data.slice());
      // console.log(data);
    });
  }

  getDataById(id: any) {
    let URL_PATH = `${this.REST_API}/getById/${id}`;
    return this.http.get<postData>(URL_PATH, {
      headers: this.httpHeader,
    });
  }

  createData(data: postData) {
    let URL_PATH = `${this.REST_API}/create`;
    this.http
      .post<postData[]>(URL_PATH, data, { headers: this.httpHeader })
      .subscribe(() => {
        this.data.push(data);
        this.dataChanged.next(this.data.slice());
        console.log('successfully created');
      });
  }

  updateData(id: number, newData: postData) {
    let URL_PATH = `${this.REST_API}/update/${id}`;
    this.http
      .put<postData[]>(URL_PATH, newData, {
        headers: this.httpHeader,
      })
      .subscribe(() => {
        this.data.forEach((val) => {
          val.id == id
            ? [
                (val.name = newData.name),
                (val.image = newData.image),
                (val.description = newData.description),
              ]
            : val;
        });
        this.dataChanged.next(this.data.slice());
        console.log('successfully updated');
      });
  }

  deleteData(id: any, index: any) {
    let URL_PATH = `${this.REST_API}/delete/${id}`;
    this.http
      .delete(URL_PATH, {
        headers: this.httpHeader,
      })
      .subscribe(() => {
        this.data.splice(index, 1);
        this.dataChanged.next(this.data.slice());
        console.log('successfully deleted');
      });
  }
}
