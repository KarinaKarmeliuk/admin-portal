import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ClientApplication } from 'src/app/models';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-clients-list-page',
  templateUrl: './clients-list-page.component.html',
  styleUrls: ['./clients-list-page.component.scss']
})
export class ClientsListPageComponent implements OnInit, AfterViewInit {

  title: string = 'page_clients-list_name';
  clients: ClientApplication[];
  dataSource : MatTableDataSource<ClientApplication>;
  displayedColumns: string[] = [
    'id',
    'name',
    'ipAddress',
    'regDate',
    'priority',
    'internetAccess',
    'turboNightService',
    'premiumRepairService',
    'problemDesc'
  ];

  loading: boolean;
  error: '';

  constructor(private clientsService : ClientsService, private router: Router) {
    this.getClientList();
  }

  ngOnInit(): void {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getClientList() {
    this.loading = true;

    this.clientsService.getAllClients()
      .subscribe((data: any) => {
        this.clients = data;
        this.loading = false;
        this.dataSource = new MatTableDataSource(this.clients);
      },
        (err: any) => {
        this.error = err.message;
        this.loading = false;
        });
  }

  goToEditEntityForm(data: any): void {
    let clAppl = new ClientApplication();
    clAppl = data;
    this.router.navigate([`ap/clients-list/edit/${clAppl.id}`]);
  }
}
