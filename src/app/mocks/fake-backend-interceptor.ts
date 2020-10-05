import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';
import { ClientApplication, User } from 'src/app/models';

const users: User[] = [{ id: 1, username: 'admin@admin', password: 'admin', firstName: 'Admin', lastName: 'Admin' }];

const clients: ClientApplication[] = [
  {
    id: 1,
    firstName: 'Albert',
    lastName: 'Einstein',
    ipAddress: '31.128.78.196',
    regDate: new Date('2020-09-28'),
    priority: 2,
    internetAccess: true,
    turboNightService: false,
    premiumRepairService: true,
    problemDesc: 'Bla-bla-bla-bla-bla...'
  },
  {
    id: 2,
    firstName: 'Napoleon',
    lastName: 'Bonaparte',
    ipAddress: '31.128.78.197',
    regDate: new Date('2020-09-28'),
    priority: 1,
    internetAccess: false,
    turboNightService: true,
    premiumRepairService: false,
    problemDesc: 'Bla-bla-bla-bla-bla...'
  },
  {
    id: 3,
    firstName: 'James',
    lastName: 'Bond',
    ipAddress: '31.128.78.195',
    regDate: new Date('2020-09-28'),
    priority: 1,
    internetAccess: false,
    turboNightService: false,
    premiumRepairService: false,
    problemDesc: 'Bla-bla-bla-bla-bla...'
  },
  {
    id: 4,
    firstName: 'Barney',
    lastName: 'Stinson',
    ipAddress: '31.128.78.191',
    regDate: new Date('2020-09-29'),
    priority: 3,
    internetAccess: true,
    turboNightService: true,
    premiumRepairService: false,
    problemDesc: 'Bla-bla-bla-bla-bla...'
  },
  {
    id: 5,
    firstName: 'Elon',
    lastName: 'Musk',
    ipAddress: '31.128.78.165',
    regDate: new Date('2020-09-29'),
    priority: 2,
    internetAccess: true,
    turboNightService: true,
    premiumRepairService: true,
    problemDesc: 'Bla-bla-bla-bla-bla...'
  },
  {
    id: 6,
    firstName: 'Anne',
    lastName: 'Hathaway',
    ipAddress: '31.128.78.167',
    regDate: new Date('2020-09-30'),
    priority: 1,
    internetAccess: false,
    turboNightService: false,
    premiumRepairService: true,
    problemDesc: 'Bla-bla-bla-bla-bla...'
  },
  {
    id: 7,
    firstName: 'Alex',
    lastName: 'Turner',
    ipAddress: '31.128.78.170',
    regDate: new Date('2020-09-30'),
    priority: 1,
    internetAccess: true,
    turboNightService: false,
    premiumRepairService: true,
    problemDesc: 'Bla-bla-bla-bla-bla...'
  },
  {
    id: 8,
    firstName: 'Miles',
    lastName: 'Kane',
    ipAddress: '31.128.78.175',
    regDate: new Date('2020-10-01'),
    priority: 2,
    internetAccess: true,
    turboNightService: false,
    premiumRepairService: false,
    problemDesc: 'Bla-bla-bla-bla-bla...'
  },
  {
    id: 9,
    firstName: 'Matt',
    lastName: 'Maltese',
    ipAddress: '31.128.78.152',
    regDate: new Date('2020-10-01'),
    priority: 3,
    internetAccess: true,
    turboNightService: false,
    premiumRepairService: false,
    problemDesc: 'Bla-bla-bla-bla-bla...'
  },
  {
    id: 10,
    firstName: 'Winona',
    lastName: 'Oak',
    ipAddress: '31.128.78.153',
    regDate: new Date('2020-10-02'),
    priority: 1,
    internetAccess: false,
    turboNightService: true,
    premiumRepairService: true,
    problemDesc: 'Bla-bla-bla-bla-bla...'
  },
  {
    id: 11,
    firstName: 'Marie',
    lastName: 'Curie',
    ipAddress: '31.128.78.188',
    regDate: new Date('2020-10-02'),
    priority: 2,
    internetAccess: true,
    turboNightService: false,
    premiumRepairService: true,
    problemDesc: 'Bla-bla-bla-bla-bla...'
  },
  {
    id: 12,
    firstName: 'Sandra',
    lastName: 'Bullock',
    ipAddress: '31.128.78.140',
    regDate: new Date('2020-10-03'),
    priority: 2,
    internetAccess: true,
    turboNightService: false,
    premiumRepairService: true,
    problemDesc: 'Bla-bla-bla-bla-bla...'
  },
  {
    id: 13,
    firstName: 'Theo',
    lastName: 'Hutchcraft',
    ipAddress: '31.128.78.141',
    regDate: new Date('2020-10-02'),
    priority: 1,
    internetAccess: false,
    turboNightService: true,
    premiumRepairService: true,
    problemDesc: 'Bla-bla-bla-bla-bla...'
  },
  {
    id: 14,
    firstName: 'Adam',
    lastName: 'Anderson',
    ipAddress: '31.128.78.142',
    regDate: new Date('2020-10-02'),
    priority: 3,
    internetAccess: true,
    turboNightService: true,
    premiumRepairService: true,
    problemDesc: 'Bla-bla-bla-bla-bla...'
  },
  {
    id: 15,
    firstName: 'Mr',
    lastName: 'Nobody',
    ipAddress: '31.128.78.144',
    regDate: new Date('2020-10-03'),
    priority: 3,
    internetAccess: true,
    turboNightService: false,
    premiumRepairService: false,
    problemDesc: 'Bla-bla-bla-bla-bla...'
  },
  {
    id: 16,
    firstName: 'No',
    lastName: 'Name',
    ipAddress: '31.128.78.149',
    regDate: new Date('2020-10-04'),
    priority: 2,
    internetAccess: true,
    turboNightService: false,
    premiumRepairService: true,
    problemDesc: 'Bla-bla-bla-bla-bla...'
  },
  ];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor{
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
    .pipe(mergeMap(handleRoute))
    .pipe(materialize())
    .pipe(delay(1000))
    .pipe(dematerialize());

    function handleRoute() {

      switch (true) {
        case url.endsWith('/api/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/api/clients/update') && method === 'POST':
          return updateClientState(body);
        case url.startsWith('/api/clients') && url.match('[0-9]$') && method === 'GET':
          const param = url.split('clients/')[1];
          return getClient(param);
        case url.endsWith('/api/clients') && method === 'GET':
          return getClients();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function authenticate() {
      const { username, password } = body;

      const user = users.find(x => x.username === username && x.password === password);
      if (!user) return error('Invalid username or password');
      console.log('ok');
      return ok({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        token: 'fake-jwt-token'
      })
    }

    function getClients() {
      // if (!isLoggedIn()) return unauthorized();
      return ok(clients);
    }

    function getClient(id: any) {
      return ok(clients[id-1]);
    }

    function updateClientState(body : ClientApplication) {
      console.log(body);
      clients[body.id].firstName = body.firstName;
      console.log(clients[body.id]);
      clients[body.id].lastName = body.lastName;
      clients[body.id].ipAddress = body.ipAddress;
      clients[body.id].regDate = body.regDate;
      clients[body.id].internetAccess = body.internetAccess;
      clients[body.id].turboNightService = body.turboNightService;
      clients[body.id].premiumRepairService = body.premiumRepairService;
      clients[body.id].problemDesc = body.problemDesc;
      return ok('');
    }

    // helper functions

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }

  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
