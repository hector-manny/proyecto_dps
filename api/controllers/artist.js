'use strict'
var path = require('path');
var fs =require('fs');
var mongoosePaginate = require('mongoose-pagination')

var Artist= require('../models/artist');
var Album= require('../models/album');
var Song= require('../models/song');
const artist = require('../models/artist');

function getArtist(req, res){
    var artistId = req.params.id;

    Artist.findById(artistId, (err,artist)=>{
       if(err){
        res.status(500).send({message:'error en la peticion'});
       } else{
           if(!artist){
            res.status(404).send({message:'El artista no existe'});
           }else{
            res.status(200).send({artist});
           }
       }
    });
   
}

function getArtists(req, res){
    if(req.params.page){
        var page = req.params.page;
    }else{
        var page = 1;
    }

    var itemsPerPage = 3;

    Artist.find().sort('name').paginate(page, itemsPerPage, function (err, artists, total){
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!artists){
                res.status(404).send({message: 'No hay Artistas!!!'});
            }else{
                return res.status(200).send({
                    page: total,
                    artists: artists
                });
            }
        }

    });
}

function saveArtist(req, res){
    var artist = new Artist();
    var params = req.body;
    artist.name = params.name;
    artist.description = params.description;
    artist.image = params.image;
    artist.image='null';

    artist.save((err, artistStored)=>{
        if(err){
            res.status(500).send({message:'error al guardar artista'});
        }else{
            if(!artistStored){
                res.status(404).send({message:'El artista no ha sido Guardado '});
            }else{
                res.status(200).send({artist: artistStored});
            }
        }
    });



}

function updateArtist(req,res){
    var artistId = req.params.id;
    var update = req.body;

    Artist.findByIdAndUpdate(artistId, update,(err,artistUpdated)=>{
        if(err){
            res.status(500).send({message:'error al actualizar artista'});
        }else{
            if(!artistUpdated){
                res.status(404).send({message:'El artista no ha sido Actualizado '});
            }else{
                res.status(200).send({artist: artistUpdated});
            }
        }
    });
}



function deleteArtist(req,res){
    var artistId = req.params.id;

    Artist.findByIdAndRemove(artistId, (err,artistRemoved)=>{
        if(err){
            res.status(500).send({message:'error al eliminar el artista'});
        }else{
            if(!artistRemoved){
                res.status(404).send({message:'El artista no ha sido Eliminado '});
            }else{
                

                Album.find({artist: artistRemoved._id}).remove((err,albumRemoved)=>{
                    if(err){
                        res.status(500).send({message:'error al eliminar el album'});
                    }else{
                        if(!albumRemoved){
                            res.status(404).send({message:'El album no ha sido Eliminado '});
                        }else{
                            Song.find({album: albumRemoved._id}).remove((err,songRemoved)=>{
                                if(err){
                                    res.status(500).send({message:'error al eliminar la cancion'});
                                }else{
                                    if(!songRemoved){
                                        res.status(404).send({message:'La cancion no ha sido Eliminada '});
                                    }else{
                                        res.status(200).send({artist: artistRemoved});
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }


    });
}



function uploadImage(req, res){
    var artistId=req.params.id;
    var file_name='No subido..';
    if (req.files) {
        var file_path=req.files.image.path;
        var file_split=file_path.split('\\');
        var file_name=file_split[2];

        var ext_split=file_name.split('.');
        var file_ext=ext_split[1];

        if (file_ext=='png' ||  file_ext=='jpg' || file_ext=='jpge' || file_ext=='gif') {
            Artist.findByIdAndUpdate(artistId, {image:file_name}, (err, artistUpdate) =>{
                if (!artistUpdate) {
                    res.status(404).send({message:'No se ha podidio actualizar el usuario'});
                }
                else{
                    res.status(200).send({image:file_name,artist: artistUpdate});
                }
            });
        } else {
            res.status(200).send({message:'Formato invalido de imagen'});
        }

        console.log(file_split);
    } else {
        res.status(200).send({message:'No se ha subido ninguna imagen'});
    }
}

function getImageFile(req, res){
    var imageFile=req.params.imageFile;
    var path_file='./uploads/artists/'+imageFile;
    fs.exists(path_file,function(exists){
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({message:'No existe la imagen'});
        }
    });
}

module.exports={
    getArtist,
    saveArtist,
    getArtists,
    updateArtist,
    uploadImage,
    getImageFile,
    deleteArtist
};