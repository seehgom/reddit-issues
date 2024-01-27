import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { FocusDirective } from '../focus.directive';
import { A11yModule } from '@angular/cdk/a11y';
import { DynamicallyLoadedListComponent } from './dynamically-loaded-list.component';

describe('DynamicallyComponent', () => {
  let app: DynamicallyLoadedListComponent;
  let fixture: ComponentFixture<DynamicallyLoadedListComponent>;
  const focusedElementId = '1';

  let mock: HttpTestingController;
  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
  it('focus on 1st element', fakeAsync(() => {
    fixture.detectChanges();
    const request = mock.expectOne({});
    tick(1)
    request.flush(mockData());
    fixture.detectChanges();
    const focusedElement = fixture.debugElement.query(By.css(':focus'));
    expect(focusedElement.attributes['id']).toEqual('add-'+focusedElementId)
  }));
  function mockData(): Object {
    return [{
      'createdAt': '2024-01-17T05:14:54.832Z',
      'name': 'Mr. Alice Tremblay',
      'avatar': 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/516.jpg',
      'id': focusedElementId
    }, {
      'createdAt': '2024-01-17T10:26:03.320Z',
      'name': 'Stella Gleichner',
      'avatar': 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/192.jpg',
      'id': '2'
    }];

  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicallyLoadedListComponent, FocusDirective],
      imports:[HttpClientTestingModule,A11yModule]
    });
    fixture = TestBed.createComponent(DynamicallyLoadedListComponent);
    app = fixture.componentInstance;
    mock = TestBed.inject(HttpTestingController);
  });

});
