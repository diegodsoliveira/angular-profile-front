import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dependents-list-edit',
  templateUrl: './dependents-list-edit.component.html',
  styleUrl: './dependents-list-edit.component.scss'
})
export class DependentsListEditComponent {

  @Input({ required: true }) userForm!: FormGroup;
  @Output('onRemoveDependent') onRemoveDependetEmitt = new EventEmitter<number>();
  @Output('onAddDependent') onAddDependetEmitt = new EventEmitter<number>();

  get dependentsList(): FormArray {
    return this.userForm.get('dependentsList') as FormArray;
  }
  removeDependent(dependentIndex: number) {
    this.onRemoveDependetEmitt.emit(dependentIndex);
  }
  addDependent() {
    this.onAddDependetEmitt.emit();
  }
}
