import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Net Service Admin Portal';

  constructor(private translateService: TranslateService, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);

    this.translateService.addLangs(['en', 'ru']);
    let currentLang = localStorage.getItem('currentLang');
    if(!currentLang) {
      this.translateService.setDefaultLang('en');
      this.translateService.use('en');
      localStorage.setItem('currentLang', 'en');
    }
    else {
      this.translateService.use(currentLang);
    }
  }

}
