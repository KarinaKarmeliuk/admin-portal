import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoaderState } from 'src/app/models/loader-state';
import { LoaderService } from 'src/app/services/loader.service';

/**
 * Basic layout for all portal pages.
 * Contains main menu and common router-outlet for loading pages.
 */

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.scss']
})
export class BasePageComponent implements OnInit {

  show = false;

  private destroy$: Subject<void> = new Subject<void>();
  private loader$: Subscription;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.subscribeLoader();
  }

  private subscribeLoader() {
    this.loader$ = this.loaderService.state
    .pipe(takeUntil(this.destroy$))
    .subscribe((state: LoaderState) => {
      this.show = state.show;
    });
  }
}
