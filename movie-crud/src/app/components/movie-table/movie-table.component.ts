import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Movie } from 'src/app/models/Movie';
import { MovieService } from 'src/app/services/movieService';

@Component({
  selector: 'app-movie-table',
  templateUrl: './movie-table.component.html',
  styleUrls: ['./movie-table.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class MovieTableComponent implements OnInit {
  movieDialog: boolean;

  movies: Movie[];

  movie: Movie;

  selectedMovies: Movie[];

  submitted: boolean;

  constructor(
    private movieService: MovieService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.movieService.getMovies().then((data) => (this.movies = data));
  }

  openNew() {
    this.movie = {};
    this.submitted = false;
    this.movieDialog = true;
  }

  deleteSelectedMovies() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected movies?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.movies = this.movies.filter(
          (val) => !this.selectedMovies.includes(val)
        );
        this.selectedMovies = null!;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Movies Deleted',
          life: 3000,
        });
      },
    });
  }

  editMovie(movie: Movie) {
    this.movie = { ...movie };
    this.movieDialog = true;
  }

  deleteMovie(movie: Movie) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + movie.title + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.movies = this.movies.filter((val) => val.id !== movie.id);
        this.movie = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Movie Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.movieDialog = false;
    this.submitted = false;
  }

  saveMovie() {
    this.submitted = true;

    if (this.movie.title.trim()) {
      if (this.movie.id) {
        this.movies[this.findIndexById(this.movie.id)] = this.movie;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Movie Updated',
          life: 3000,
        });
      } else {
        this.movie.id = this.createId();
        this.movie.poster = 'product-placeholder.svg';
        this.movies.push(this.movie);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Movie Created',
          life: 3000,
        });
      }

      this.movies = [...this.movies];
      this.movieDialog = false;
      this.movie = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.movies.length; i++) {
      if (this.movies[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
