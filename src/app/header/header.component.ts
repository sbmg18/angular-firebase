import { AuthService } from './../auth/auth.service';
import { Recipe } from './../recipes/recipe.model';
import { Component, Output, EventEmitter } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Response } from '@angular/http';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    constructor(public authService: AuthService, private dataStorageService: DataStorageService) { }

    onSaveData() {
        this.dataStorageService.storeRecipes()
            .subscribe((response: Response) => {
                console.log(response);
            }, (error) => console.log(error));
    }

    onFetchData() {
        this.dataStorageService.getRecipes();
    }

    onLogout() {
        this.authService.logout();
    }
}
