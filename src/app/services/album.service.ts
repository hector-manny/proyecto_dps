import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import "rxjs/add/operator/map";
import { GLOBAL } from "./global";
import {Album} from "../models/album";
import { Observable } from 'rxjs/Observable'

@Injectable()
export class AlbumService {
  public url: string;

  constructor( public http: HttpClient) {
    this.url = GLOBAL.url;
  }

  addAlbum(token, album: Album) {
    let params = JSON.stringify(album);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": token
    });

    return this.http.post(this.url+"album", params, {headers: headers})
  }
}