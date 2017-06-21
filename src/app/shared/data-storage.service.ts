import { AuthService } from './../auth/auth.service';
import { Recipe } from './../recipes/recipe.model';
import { Observable } from 'rxjs/Observable';
import { RecipeService } from './../recipes/recipe.service';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class DataStorageService {

    constructor(private authService: AuthService, private http: Http, private recipeService: RecipeService) { }

    storeRecipes() {
        const token = this.authService.getToken();
        return this.http.put('https://ng-recipe-book-c5af9.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
    }

    getRecipes() {
        const token = this.authService.getToken();
        this.http.get('https://ng-recipe-book-c5af9.firebaseio.com/recipes.json?auth=' + token)
            .map((response: Response) => {
                const recipes: Recipe[] = response.json();
                for (const recipe of recipes) {
                    if (!recipe['ingredients']) {
                        recipe['ingredients'] = [];
                    }
                }
                return recipes;
            })
            .catch((error: Response) => {
                return Observable.throw('Something went wrong.');
            }).subscribe((recipes: Recipe[]) => {
                console.log(recipes);
                this.recipeService.setRecipes(recipes);
            }, (error) => console.log(error));
    }
}
