import { Subject } from 'rxjs/Subject';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from './../shared/Ingredient.model';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'French Fries',
            'Test Recipe Description for French Fries',
            'https://c1.staticflickr.com/6/5300/5428634435_60763c9e7e_b.jpg',
            [
                new Ingredient('Potato', 3),
                new Ingredient('Onion', 1)
            ]
        ),
        new Recipe(
            'Ice Cream',
            'Test Ice Cream Description for Ice Cream',
            'https://upload.wikimedia.org/wikipedia/commons/3/31/Ice_Cream_dessert_02.jpg',
            [
                new Ingredient('Milk', 3),
                new Ingredient('Chocolate', 1)
            ]
        ),
        new Recipe(
            'Pizza',
            'Test Recipe Description for Pizza',
            'https://c1.staticflickr.com/3/2193/5753189490_20949bd0b7_b.jpg',
            [
                new Ingredient('Mango', 2),
                new Ingredient('Orange', 2)
            ]
        )
    ];

    constructor(private shoppingListService: ShoppingListService) { }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes.slice()[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
}
