import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//import user
import {UserEditComponent} from './components/user-edit.component';
//Home
import { HomeComponent } from "./components/home.component";
//Artist
import { ArtistListComponent } from "./components/artist-list.component"
import { ArtistAddComponent } from "./components/artist-add.component"
import { ArtistEditComponent } from "./components/artist-edit.component"
import {ArtistDetailComponent} from "./components/artist-detail.component";

//album
import {AlbumAddComponent} from "./components/album-add.component";


const appRoutes: Routes = [
    {path: '', component: HomeComponent},

    {path: 'crear-artista', component: ArtistAddComponent},
    {path: "crear-album/:artist", component: AlbumAddComponent},
    {path: 'editar-artista/:id', component: ArtistEditComponent},
    {path: 'artistas/:page', component: ArtistListComponent},
    {path: "artista/:id", component: ArtistDetailComponent},
    {path:'mis-datos',component:UserEditComponent},
    {path:'**',component:UserEditComponent},
    
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
