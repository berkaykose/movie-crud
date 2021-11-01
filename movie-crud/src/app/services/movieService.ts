import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Movie } from '../models/Movie';

@Injectable()
export class MovieService {

    movieNames: string[] = [
        "The Lake House", 
        "The Lake House", 
        "The Lake House", 
        "The Lake House", 
        "The Lake House", 
        "The Lake House", 
        "The Lake House", 
    ];

    constructor(private http: HttpClient) { }

    // getProductsSmall() {
    //     return this.http.get<any>('assets/products-small.json')
    //     .toPromise()
    //     .then(res => <Movie[]>res.data)
    //     .then(data => { return data; });
    // }

    getMovies() {
        return this.http.get<any>('assets/movies.json')
        .toPromise()
        .then(res => <Movie[]>res.data)
        .then(data => { return data; });
    }

    // getProductsWithOrdersSmall() {
    //     return this.http.get<any>('assets/products-orders-small.json')
    //     .toPromise()
    //     .then(res => <Movie[]>res.data)
    //     .then(data => { return data; });
    // }

    generateMovie(): Movie {
        const movie: Movie =  {
            id: this.generateId(),
            title: this.generateTitle(),
            description: "Product Description",
            publishYear: this.generateYear(),
            category: "Product Category",
            director: this.generateDirector(),
            imdbScore: this.generateRating()
        };

        movie.poster = movie.title?.toLocaleLowerCase().split(/[ ,]+/).join('-')+".jpg";
        return movie;
    }

    generateId() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
        for (var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        
        return text;
    }

    generateTitle() {
        return this.movieNames[Math.floor(Math.random() * Math.floor(30))];
    }

    generateDirector() {
        return this.movieNames[Math.floor(Math.random() * Math.floor(30))];
    }

    generateYear() {
        return 2020;
    }

    generateRating() {
        return Math.floor(Math.random() * Math.floor(5)+1);
    }
}