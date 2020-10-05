import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, AfterViewInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.changeDetector.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
