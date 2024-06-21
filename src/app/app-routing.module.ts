import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { BindingComponent } from './components/demos/binding/binding.component';
import { PipeComponent } from './components/demos/pipe/pipe.component';
import { ChronometreComponent } from './components/exos/chronometre/chronometre.component';
import { DirectivesComponent } from './components/demos/directives/directives.component';
import { ListeProduitsComponent } from './components/exos/liste-produits/liste-produits.component';
import { ParentComponent } from './components/demos/inputOutput/parent/parent.component';
import { ShoppingComponent } from './components/exos/shoppingList/shopping/shopping.component';
import { LivreServiceComponent } from './components/demos/livre-service/livre-service.component';
import { ShoppingListServiceComponent } from './components/exos/shopping-list-service/shopping-list-service.component';
import { FormulaireComponent } from './components/demos/formulaire/formulaire.component';
import { RoutingComponent } from './components/demos/routing/routing/routing.component';
import { ProfilUtilisateurComponent } from './components/demos/routing/profil-utilisateur/profil-utilisateur.component';
import { authGuard } from './tools/guards/auth.guard';
import { GetFansComponent } from './components/recap/get-fans/get-fans.component';
import { GetFanComponent } from './components/recap/get-fan/get-fan.component';
import { CreateFanComponent } from './components/recap/create-fan/create-fan.component';
import { UpdateFanComponent } from './components/recap/update-fan/update-fan.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    {
        path: 'demos',
        children: [
            { path: 'binding', component: BindingComponent },
            { path: 'pipe', component: PipeComponent },
            { path: 'directive', component: DirectivesComponent },
            { path: 'inputOutput', component: ParentComponent },
            { path: 'service', component: LivreServiceComponent },
            { path: 'formulaire', component: FormulaireComponent },
            {
                path: 'profil/:idUtilisateur',
                component: ProfilUtilisateurComponent,
                canActivate: [authGuard],
            },
            { path: 'routing', component: RoutingComponent },
        ],
    },
    {
        path: 'exos',
        children: [
            { path: 'chronometre', component: ChronometreComponent },
            { path: 'listeProduits', component: ListeProduitsComponent },
            { path: 'shopping', component: ShoppingComponent },
            {
                path: 'shoppingService',
                component: ShoppingListServiceComponent,
            },
        ],
    },
    {
        path: 'fan',
        children: [
            { path: 'fans', component: GetFansComponent },
            { path: 'fan/:id', component: GetFanComponent },
            { path: 'create', component: CreateFanComponent },
            { path: 'update/:id', component: UpdateFanComponent },
        ],
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirection par défault
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
