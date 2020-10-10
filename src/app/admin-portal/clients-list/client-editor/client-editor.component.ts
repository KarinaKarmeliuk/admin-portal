import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, finalize, first, map, startWith } from 'rxjs/operators';
import { ClientApplication } from 'src/app/models';
import { ClientsService } from 'src/app/services/clients.service';
import { PriorityFormatNumberPipe } from 'src/app/shared/pipes/priority-format-number.pipe';
import { PriorityFormatStringPipe } from 'src/app/shared/pipes/priority-format-string.pipe';
import * as CustomValidators from 'src/app/shared/validators';

@Component({
  selector: 'app-client-editor',
  templateUrl: './client-editor.component.html',
  styleUrls: ['./client-editor.component.scss']
})
export class ClientEditorComponent implements OnInit {

  title: string = 'page_editor_name';
  clientId: number;
  client: ClientApplication; //new ClientApplication();

  editForm: FormGroup;
  priority_options: string[] = ['high', 'medium', 'low'];

  filteredPriorityOptions: Observable<string[]>;

  submitted = false;
  isFormReady = false;
  loadingSubject = new BehaviorSubject<boolean>(false);
  error = '';
  message : string;

  private subscription: Subscription;

  priorityFormatNumberPipe = new PriorityFormatNumberPipe();
  priorityFormatStringPipe = new PriorityFormatStringPipe();

  constructor(private activateRoute: ActivatedRoute,
              private clientsService: ClientsService,
              private translateService: TranslateService) {
    this.subscription = activateRoute.params.subscribe(params => this.clientId = params['id']);

    this.getClient(this.clientsService.getClientById(this.clientId));
  }

  ngOnInit(): void {

    //this.editForm = new FormGroup({});
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.priority_options.filter(option => option.toLowerCase().includes(filterValue));
  }

  get id() { return this. editForm.get('id'); }

  get firstName() { return this.editForm.get('firstName'); }

  get lastName() { return this.editForm.get('lastName'); }

  get ipAddress() { return this.editForm.get('ipAddress'); }

  get regDate() { return this.editForm.get('regDate'); }

  get priority() { return this.editForm.get('priority'); }

  get internetAccess() { return this.editForm.get('internetAccess'); }

  get turboNightService() { return this.editForm.get('turboNightService'); }

  get premiumRepairService() { return this.editForm.get('premiumRepairService'); }

  get problemDesc() { return this.editForm.get('problemDesc'); }

  private fillEditForm() {
    let prio = '';
    this.translateService.get(this.priorityFormatStringPipe.transform(this.client.priority))
    .subscribe(
    value => prio = value
    );

    this.editForm = new FormGroup({
    id: new FormControl(this.client.id),
    firstName: new FormControl(this.client.firstName, Validators.required),
    lastName: new FormControl(this.client.lastName, Validators.required),
    ipAddress: new FormControl(this.client.ipAddress, [Validators.required, CustomValidators.ipv4()]),
    regDate: new FormControl(this.client.regDate, Validators.required),
    priority: new FormControl(prio, [Validators.required, CustomValidators.validatePriority()]),
    internetAccess: new FormControl(this.client.internetAccess, Validators.required),
    turboNightService: new FormControl(this.client.turboNightService, Validators.required),
    premiumRepairService: new FormControl(this.client.premiumRepairService, Validators.required),
    problemDesc: new FormControl(this.client.problemDesc, Validators.required),
    });

    this.filteredPriorityOptions = this.priority.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  getClient(observable: Observable<ClientApplication>): void {
    observable.
    pipe(
      distinctUntilChanged(),
      finalize(() => this.loadingSubject.next(false)),
    ).subscribe((cliApp: ClientApplication) => {
      this.client = cliApp;
      this.fillEditForm();
      this.isFormReady = true;
    },
      (errorData: any) => console.log('getClient() failed: ', errorData));
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editForm.invalid) {
      return;
    }
    this.client.id = this.id.value;
    this.client.firstName = this.firstName.value;
    this.client.lastName = this.lastName.value;
    this.client.regDate = this.regDate.value;
    this.client.ipAddress = this.ipAddress.value;
    this.client.priority = this.priorityFormatNumberPipe.transform(this.priority.value);
    this.client.internetAccess = this.internetAccess.value;
    this.client.turboNightService = this.turboNightService.value;
    this.client.premiumRepairService = this.premiumRepairService.value;
    this.client.problemDesc = this.problemDesc.value;

    this.clientsService.updateClient(this.client)
      .pipe(first())
      .subscribe(
        () => {
          alert(this.getMessage('page_editor_submit_message'));
        },
        error => {
          console.log('error');
          this.error = error.error;
          console.log(error.message);
        }
      );
  }

  getMessage(key : string) { this.translateService.get(key).subscribe(value => this.message = value); return this.message; }

  getErrorMessage() {
    return this.firstName!.hasError('required') ? this.getMessage('page_editor_error_requiredField') : '';
  }

}
