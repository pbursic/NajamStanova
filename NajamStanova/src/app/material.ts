import {
  MatButtonModule, MatCheckboxModule, MatToolbarModule,
  MatIconModule, MatSidenavModule, MatListModule,
  MatStepperModule, MatProgressBarModule, MatSelectModule,
  MatInputModule, MatRippleModule, MatDatepickerModule,
  MatNativeDateModule, MatExpansionModule, MatTabsModule,
  MatDialogModule, MatCardModule, MatGridListModule} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MatButtonModule, MatCheckboxModule, MatToolbarModule,
    MatIconModule, MatSidenavModule, MatListModule,
    MatStepperModule, MatProgressBarModule, MatSelectModule,
    MatInputModule, MatRippleModule, MatDatepickerModule,
    MatNativeDateModule, MatExpansionModule, MatTabsModule,
    MatDialogModule, MatCardModule, MatGridListModule],
  exports: [
    MatButtonModule, MatCheckboxModule, MatToolbarModule,
    MatIconModule, MatSidenavModule, MatListModule,
    MatStepperModule, MatProgressBarModule, MatSelectModule,
    MatInputModule, MatRippleModule, MatDatepickerModule,
    MatNativeDateModule, MatExpansionModule, MatTabsModule,
    MatDialogModule, MatCardModule, MatGridListModule],
})
export class MaterialModule{}
