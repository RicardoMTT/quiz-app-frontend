import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
const AUTH_API = 'http://localhost:8080/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class CuestionarioService {
  constructor(private http: HttpClient) {}

  getTypeQuestionario() {
    console.log('here');

    return this.http.get(AUTH_API + 'lista-tipos', httpOptions);
  }

  createQuiz(quiz) {
    return this.http.post(AUTH_API + 'add-cuestionario', quiz);
  }
}
