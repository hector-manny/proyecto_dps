import { Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";

import { GLOBAL } from "../services/global";
import { UserService } from "../services/user.service";
import { ArtistService } from "../services/artist.service";
import { AlbumService } from "../services/album.service";
import { Artist } from "../models/artist";
import { Album } from "../models/album";


@Component({
  selector: "album-add",
  templateUrl: "../views/album-add.html",
  providers: [UserService, ArtistService, AlbumService]
})

export class AlbumAddComponent implements  OnInit {
  public titulo: string;
  public artist: Artist;
  public album: Album;
  public identity;
  public token;
  public url: string;
  public editArtistFormMessage;
  public filesToUpload: Array<File>;
  public isEdit = true;
  public alertMessage;

  constructor(private _route: ActivatedRoute, 
             private _router: Router,
             private _userService: UserService,
             private _artistService: ArtistService,
             private _albumService: AlbumService,
             ) {
    this.titulo = "Crear nuevo album";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.album = new Album('', '', '2020', '', '');
  }

  ngOnInit() {
    console.log( 'album-add.component.ts cargado' );
  }
  
  onSubmit(){
    let success = function (response) {

        if(!response.album){
          this.alertMessage = "Error en el servidor";
        }
        else {
          this.album = response.album;
         // this._router.navigate(["/editar-artista", response.artist._id]);
  
          this.alertMessage = "El album fue creado con éxito";
        }
      };
  
      let error = function (error){
        let errorMessage = <any>error;
        if(errorMessage){ this.alertMessage = JSON.parse(errorMessage._body).message;
        } 
      };

      this._albumService.addAlbum(this.token, this.album).subscribe(success.bind(this), error.bind(this));
    }

}
