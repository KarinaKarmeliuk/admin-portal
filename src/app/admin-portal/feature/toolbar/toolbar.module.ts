import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ToolbarButtonsComponent } from 'src/app/admin-portal/feature/toolbar/toolbar-buttons/toolbar-buttons.component';
import { ToolbarNameComponent } from 'src/app/admin-portal/feature/toolbar/toolbar-name/toolbar-name.component';
import { ToolbarSearchComponent } from 'src/app/admin-portal/feature/toolbar/toolbar-search/toolbar-search.component';
import { ToolbarComponent } from 'src/app/admin-portal/feature/toolbar/toolbar.component';
import { LocalizerModule } from 'src/app/shared/localizer/localizer.module';
import { MaterialModule } from 'src/app/shared/material.module';



@NgModule({
  declarations: [
    ToolbarComponent,
    ToolbarButtonsComponent,
    ToolbarNameComponent,
    ToolbarSearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LocalizerModule,
    MaterialModule,
    TranslateModule,
  ],
  exports: [
    ToolbarComponent,
    ToolbarButtonsComponent,
    ToolbarNameComponent,
    ToolbarSearchComponent
  ]
})
export class ToolbarModule { }
