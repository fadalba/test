import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { Observable, Subscriber } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RemplissageService {
  rempli: any;
  endpoint: any;
  httpClient: any;

  constructor(private socket: Socket, private http: HttpClient, private route: Router) {}
  tapisON() {
    this.socket.emit('systeme', '4')
  }
  tapisoff() {
    this.socket.emit('systeme', '5')
  }
  remplirOn(){
    this.socket.emit('systeme', '6')
  }
  remplirOff(){
    this.socket.emit('systeme', '7')
  }
  bouchonON() {
    this.socket.emit('systeme', '8' )
  }
  bouchonOff() {
    this.socket.emit('systeme', '9' )
  }
  rebotOn() {
    this.socket.emit('systeme', '10' )
  }
  rebotOff() {
    this.socket.emit('systeme', '11' )
  }



   remplir(){
    return new Observable( observer => {
      this.socket.on('connecte',(data:any) => {
       observer.next(data);
          })
     })

  }

  login(user: any) {
    return this.http.post('http://localhost:3001/auth/login', user);
  }

  getUser() {

    return this.http.get('http://localhost:3001/auth/profile', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ localStorage.getItem('token')
      }
    });
  }
  getToken() {
    return localStorage.getItem('token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('token');
    return authToken !== null ? true : false;
  }


  updatePassword(email: any, data: any): Observable<any> {

const donnee = { "newPassword": data.newPass, "password": data.actuelPass }

    return this.http.patch(`http://localhost:3001/user/${email}`,  donnee , {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });

  }


 getremplissage(){

  return this.http.get(`http://localhost:3001/remplissage`)
}
}
