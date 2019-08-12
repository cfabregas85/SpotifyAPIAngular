
import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { SearchComponent } from "./components/search/search.component";
import { ArtistComponent } from './components/artist/artist.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';



export const ROUTES:Routes=[
   { path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
   { path: 'login', component: LoginComponent},
   { path: 'register', component: RegisterComponent},
   { path: 'search', component: SearchComponent,canActivate:[AuthGuard]},
   { path: 'artist/:id', component: ArtistComponent},
   { path: '', pathMatch:'full',redirectTo:'home'},
   { path: '**', pathMatch:'full',redirectTo:'home'}
];
