import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 
    //'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem('auth'), 
  })
};
@Injectable({
  providedIn: "root"
})
export class QuizService {

  constructor(private http: HttpClient) { }

  //rootURL = 'http://127.0.0.1:8000/api';
  rootURL = 'https://backend.itlit.in/api';

  get(url: string) {
    return this.http.get(url);
  }

  getAll() {
    return [
      { id: 'data/javascript.json', name: 'JavaScript' },
      { id: 'data/aspnet.json', name: 'Asp.Net' },
      { id: 'data/csharp.json', name: 'C Sharp' },
      { id: 'data/designPatterns.json', name: 'Design Patterns' }
    ];
  }

  getQuestions(userId: any) {
    return this.http.get(this.rootURL + '/exam/student/' + userId, httpOptions);
  }

  login(data: any) {
    return this.http.post(this.rootURL + '/student/login', data);
  }

}
