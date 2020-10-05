import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitchComponent } from 'src/app/language-switch/language-switch.component';
import { MaterialModule } from 'src/app/shared/material.module';

@NgModule({
  declarations: [
    LanguageSwitchComponent
  ],
  imports: [
    TranslateModule,
    MaterialModule
  ],
  exports: [
    LanguageSwitchComponent
  ]
})
export class LocalizerModule {}
