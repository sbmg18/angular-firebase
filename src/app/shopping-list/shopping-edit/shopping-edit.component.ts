import { Subscription } from 'rxjs/Subscription';
import { ShoppingListService } from './../shopping-list.service';
import { Ingredient } from './../../shared/Ingredient.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') form: NgForm;

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe((index) => {
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.editedItemIndex = index;
        this.editMode = true;
        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      });
  }

  onSubmit(form: NgForm) {
    event.preventDefault();
    const value = form.value;
    const shoppingIngredient = new Ingredient(value.name, value.amount);

    if(this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, shoppingIngredient);
    } else {
      this.shoppingListService.addIngredient(shoppingIngredient);
    }

    form.reset({
      name: '',
      amount: 1
    });
    this.editMode = false;
  }

  onClear() {
    this.form.reset();
    this.editMode = false;
  }

  onDelete() {
    if (this.editMode) {
      this.shoppingListService.deleteIngredient(this.editedItemIndex);
      this.onClear();
    }

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
