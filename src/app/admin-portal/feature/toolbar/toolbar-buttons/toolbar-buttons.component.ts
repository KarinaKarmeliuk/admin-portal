import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-toolbar-buttons',
  templateUrl: './toolbar-buttons.component.html',
  styleUrls: ['./toolbar-buttons.component.scss']
})
export class ToolbarButtonsComponent implements OnInit {

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
  }

  print():void {
    let message = '';
    this.translateService.get('page_clients-list__print_alert').subscribe(value => message = value);
    alert(message);
  }

  send_toEmail():void {
    let message = '';
    this.translateService.get('page_clients-list__send_alert').subscribe(value => message = value);
    alert(message);
  }
}
