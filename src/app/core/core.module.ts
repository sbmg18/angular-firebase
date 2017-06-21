import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import { AuthService } from '../auth/auth.service';
import { CanDeactivateGuard } from '../recipes/recipe-edit/can-deactivate-guard.service';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { SharedModule } from '../shared/shared.module';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
    declarations: [
        HeaderComponent,
        NotFoundComponent,
        HomeComponent
    ],
    imports: [
        SharedModule,
        AppRoutingModule
    ],
    exports: [
        HeaderComponent,
        AppRoutingModule
    ],
    providers: [
        ShoppingListService,
        RecipeService,
        CanDeactivateGuard,
        DataStorageService,
        AuthService
    ]
})
export class CoreModule {
}
