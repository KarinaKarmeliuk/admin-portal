import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-toolbar-name',
  templateUrl: './toolbar-name.component.html',
  styleUrls: ['./toolbar-name.component.scss']
})
export class ToolbarNameComponent implements OnInit {

  @Input() name: string;

  constructor() { }

  ngOnInit(): void {}

}
