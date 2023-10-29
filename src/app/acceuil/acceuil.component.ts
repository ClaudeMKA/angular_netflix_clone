import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MovieService } from '../movie.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GENRES } from './genre';
import { GlobalStateService } from '../globalstateservice.service';
declare var YT: any; // Déclarer la variable YT





@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss']
})
export class AcceuilComponent implements OnInit, AfterViewInit{
  genres = GENRES;
  movies: any[] = [];
  movieVideos: { [id: number]: any[] } = {};
  tmdbImageUrl: string = 'https://image.tmdb.org/t/p/w500';
  tmdbBackdropUrl: string = 'https://image.tmdb.org/t/p/original';
  @ViewChild('image', { static: true }) imageElement!: ElementRef;
  @ViewChild('carouselbox', { static: true }) carouselbox!: ElementRef;

  videoUrl: SafeResourceUrl | undefined; // Initialisation ajoutée

  adventureMovies: any[] = [];
  page2: any[] = [];
  category2Movies: any[] = [];
  category3Movies: any[] = [];
  category4Movies: any[] = [];
  category5Movies: any[] = [];
  category6Movies: any[] = [];
  category7Movies: any[] = [];
  category8Movies: any[] = [];
  category9Movies: any[] = [];
  category10Movies: any[] = [];
  category11Movies: any[] = [];
  getGenreName: any[] = [];
  similarMovies: any[] = [];
  currentIndex: any = [];  // Ajoutez cette ligne pour déclarer currentIndex
  currentIndex3: any = [];  // Ajoutez cette ligne pour déclarer currentIndex

  hoverStates: { [key: string]: boolean } = {};
  currentIndex2: string | null = null;


  isHovered: boolean = false;
  firstVideoKey: string | null = null;


  constructor(
    private movieService: MovieService,
    private sanitizer: DomSanitizer,
    private globalStateService: GlobalStateService,
    private cdr: ChangeDetectorRef // Ajoutez le ChangeDetectorRef ici
  ) {}

  ngOnInit() {
    this.fetchMovies();
  }

  ngAfterViewInit() {
    this.addParallaxEffect();
  }

  loadSimilarMovies(movieId: string): void {
    console.log('dd')
  }

  addParallaxEffect() {
    const background = this.imageElement.nativeElement;

    window.addEventListener('scroll', () => {
      const yOffset = window.pageYOffset;
      background.style.transform = `translate3d(0, ${yOffset * 0.5}px, 0)`;
    });
  }

  async fetchMovies() {
    try {
      const data: any = await this.movieService.getMovies();
      this.movies = data.results;
      // Récupérer les vidéos pour chaque film
      for (const movie of this.movies) {
        const movieId = movie.id;
       const movietitle = movie.title
        const videoData: any = await this.movieService.getMovieVideos(movieId);
        this.adventureMovies = await this.movieService.getAllMovies(2);
        this.category2Movies = await this.movieService.getAllMovies(3);
        this.category3Movies = await this.movieService.getAllMovies(4);
        this.category4Movies = await this.movieService.getAllMovies(5);
        this.category5Movies = await this.movieService.getAllMovies(6);
        this.category6Movies = await this.movieService.getAllMovies(7);
        this.category7Movies = await this.movieService.getAllMovies(8);
        this.category8Movies = await this.movieService.getAllMovies(9);
        this.category9Movies = await this.movieService.getAllMovies(11);
        this.category10Movies = await this.movieService.getAllMovies(12);
        this.category11Movies = await this.movieService.getAllMovies(13);
        // Appel à la fonction getMoviessimilar

        this.movieVideos[movieId] = videoData.results;
        this.cdr.detectChanges(); // Déclencher la détection des modifications ici

        // Récupérer les films de genre pour le film
      }

      // Construire l'URL de la vidéo YouTube
      if (this.movieVideos[this.movies[0].id] && this.movieVideos[this.movies[0].id][0]) {
        const videoKey = this.movieVideos[this.movies[0].id][0].key;
        const youtubeUrl = `https://www.youtube.com/embed/${videoKey}`;
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(youtubeUrl);
      }

      // Récupérer les films de genre "Aventure"
      this.adventureMovies = await this.movieService.getAllMovies(2);
      this.page2 = await this.movieService.getAllMovies(3);
    } catch (error) {
      console.error('Une erreur s\'est produite :', error);
    }
  }

  slide(direction: number, classe: string, carouselbox: any) {
    const container = carouselbox;
    const items = container.getElementsByClassName(classe);
    const itemWidth = 310;

    if (direction === 1) {
      this.currentIndex = (this.currentIndex === items.length - 1) ? 0 : this.currentIndex + 1;
    } else if (direction === -1) {
      this.currentIndex = (this.currentIndex === 0) ? items.length - 1 : this.currentIndex - 1;
    }

    // Calcul de la marge négative pour déplacer les éléments
    const negativeMargin = -this.currentIndex * (itemWidth);

    // Appliquer la marge négative pour déplacer les éléments
    container.style.marginLeft = negativeMargin + 'px';
  }

  onHover(hover: boolean, index: number) {
    this.hoverStates[index] = hover;
  }
  onHover2(hover: boolean, uniqueID: string) {
    this.hoverStates[uniqueID] = hover;
    this.currentIndex2 = uniqueID;
  }

  onHover3(hover: boolean, movieId: number) {
    this.hoverStates[movieId] = hover;
    this.currentIndex3 = movieId;
  }

  toggleModal(event: Event, movieId : string) {

    const targetElement = event.target as HTMLElement;
    const parentElement = targetElement.closest('.carousel-item');
    const parentElement2 = targetElement.closest('.modal-open.crsl2');

    if (parentElement) {
      parentElement.classList.toggle('modal-open');
    }
    console.log(movieId)
    this.movieService.getMoviessimilar(movieId).subscribe(
      (data) => {
        this.similarMovies = data.results;
        // Journal des données, même si elles sont vides
        console.log('similarMovies :', this.similarMovies);
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des films similaires :', error);
      }
    );


    // Get the modal backdrop element
    const modalBackdrop = document.querySelector('.modal-backdrop') as HTMLElement;

    // Toggle its display property
    if (parentElement?.classList.contains('modal-open')) {
      modalBackdrop.style.display = 'block';
      document.body.classList.add('modal-open');
    } else {
      modalBackdrop.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
    this.cdr.detectChanges(); // Déclencher la détection des modifications ici

  }


  isModalOpen(): boolean {
    const bodyElement = document.querySelector('body');
    return bodyElement?.classList.contains('modal-open') || false;

  }
  generateRandomPercentage(): number {
    return Math.floor(Math.random() * (90 - 70 + 1)) + 70;
  }

  getYearFromDate(date: string): string {
    return new Date(date).getFullYear().toString();
  }



  toggleBackgroundDetails() {
    const backgroundDetails = document.querySelector('.background-details') as HTMLElement;

    // Utilisez setTimeout pour différer l'exécution de la vérification de l'élément
    setTimeout(() => {
      const modalOpenCarouselItem = document.querySelector('.carousel-item.carousel-liste2.crsl2.modal-open.no-hover-effect');

      if (backgroundDetails.style.display === 'block' && modalOpenCarouselItem) {
        modalOpenCarouselItem.classList.remove('crsl2');
      } else if (modalOpenCarouselItem) {
        modalOpenCarouselItem.classList.add('crsl2');
      }
;
    }, 1000); // Attendre 1 seconde (1000 millisecondes) avant d'exécuter la vérification
  }


  onPlayButtonClicked(movieid: any) {
    const movieId = movieid;
    this.movieService.getMovieVideos(movieId)
      .then((videos) => {
        if (videos && videos.results && videos.results.length > 0) {
          const videoUrl = 'https://www.youtube.com/embed/' + videos.results[0].key + '?autoplay=1';
          window.location.href = videoUrl; // Redirection vers la nouvelle URL
        }
      })
      .catch((error) => {
        console.error('Une erreur s\'est produite lors de la récupération des vidéos :', error);
      });
  }

  openFullscreen(videoKey: string) {
    const iframe = document.getElementById(`video-${videoKey}`) as HTMLIFrameElement;
    if (iframe) {
      const player = new YT.Player(iframe);
      player.playVideo(); // Lecture automatique de la vidéo
      player.mozRequestFullScreen(); // Pour Firefox
      player.webkitRequestFullscreen(); // Pour Chrome, Safari, etc.
    }
  }



  generateUniqueID() {
    return 'uniqueID_' + Math.floor(Math.random() * 1000000);
  }




}
