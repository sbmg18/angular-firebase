import { Recipe } from './../recipe.model';
import { RecipeService } from './../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { CanComponentDeactivate } from "app/recipes/recipe-edit/can-deactivate-guard.service";
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, CanComponentDeactivate {

  id: number;
  editMode = false;
  recipeForm: FormGroup;
  changesSaved = false;

  constructor(private router: Router, private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  getIngredients(recipeForm: FormGroup) {
    return (<FormArray>recipeForm.get('ingredients')).controls;
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {

    if (!this.recipeForm.dirty) {
      return true;
    }

    if (!this.changesSaved) {
      return confirm('Are you sure you want to discard changes?');
    }

    return true;
  }

  initForm() {

    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }));
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onSubmit() {
    // const recipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // );

    this.changesSaved = true;

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      this.onCancel();
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
      this.router.navigate(['../', this.recipeService.getRecipes().length - 1], { relativeTo: this.route })
    }
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
