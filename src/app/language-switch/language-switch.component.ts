import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.scss']
})
export class LanguageSwitchComponent implements OnInit {

  selectedLanguage : string;

  constructor(private translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.translateService.get(localStorage.getItem('currentLang')).subscribe(value => this.selectedLanguage = value);
    console.log(this.selectedLanguage);
  }


  switchLanguage(language: string) {
    if (localStorage.getItem('currentLang') !== language) {
      localStorage.setItem('currentLang', language);
      this.translateService.use(language);
    }
    console.log(this.selectedLanguage);
  }

}
