import { NgModule } from '@angular/core';
import { MaritalStatusPipe } from './marital-status.pipe';
import { CpfPipe } from './cpf.pipe';



@NgModule({
  declarations: [
    MaritalStatusPipe,
    CpfPipe
  ],
  imports: [
  ],
  exports: [
    MaritalStatusPipe,
    CpfPipe
  ],
})
export class PipesModule { }
