import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, finalize, first, map, startWith } from 'rxjs/operators';
import { ClientApplication } from 'src/app/models';
import { ClientsService } from 'src/app/services/clients.service';
import * as CustomValidators from 'src/app/shared/validators';

@Component({
  selector: 'app-client-editor',
  templateUrl: './client-editor.component.html',
  styleUrls: ['./client-editor.component.scss']
})
export class ClientEditorComponent implements OnInit {

  title: string = 'page_editor_name';
  id: number;
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

  constructor(private activateRoute: ActivatedRoute,
              private clientsService: ClientsService,
              private translateService: TranslateService) {
    this.subscription = activateRoute.params.subscribe(params => this.id = params['id']);

    this.getClient(this.clientsService.getClientById(this.id));
  }

  ngOnInit(): void {

    this.editForm = new FormGroup({});

    this.filteredPriorityOptions = this.f.priority.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.priority_options.filter(option => option.toLowerCase().includes(filterValue));
  }

  get f() {
    return this.editForm.controls;
  }

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
    this.editForm.addControl('id',
      new FormControl(this.client.id, [Validators.required, Validators.pattern("^[0-9]*$")]));
    this.editForm.addControl('firstName',
      new FormControl(this.client.firstName, Validators.required));
    this.editForm.addControl('lastName',
      new FormControl(this.client.lastName, Validators.required));
    this.editForm.addControl('ipAddress',
      new FormControl(this.client.ipAddress, [Validators.required, CustomValidators.ipv4()]));
    this.editForm.addControl('regDate',
      new FormControl(this.client.regDate, Validators.required));
    this.editForm.addControl('priority',
      new FormControl(this.client.priority, [Validators.required, Validators.pattern("^[1-3]*$")]));
    this.editForm.addControl('internetAccess',
      new FormControl(this.client.internetAccess, Validators.required));
    this.editForm.addControl('turboNightService',
      new FormControl(this.client.turboNightService, Validators.required));
    this.editForm.addControl('premiumRepairService',
      new FormControl(this.client.premiumRepairService, Validators.required));
    this.editForm.addControl('problemDesc',
      new FormControl(this.client.problemDesc, Validators.required));
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
      (errorData: any) => console.log('getClient() failed: ', errorData),)
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editForm.invalid) {
      return;
    }
    this.clientsService.updateClient(this.client)
      .pipe(first())
      .subscribe(
        () => {
          alert(this.getMessage('page_editor_submit_message'));
        },
        error => {
          console.log(error.error);
          this.error = error.error;
        }
      );
  }

  getMessage(key : string) { this.translateService.get(key).subscribe(value => this.message = value); return this.message; }

  getErrorMessage() {
    return this.firstName!.hasError('required') ? this.getMessage('page_editor_error_requiredField') : '';
  }

}
