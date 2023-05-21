import { TestBed, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { Observable, of, from, interval } from 'rxjs';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';
import { By } from '@angular/platform-browser';
import { ObservableWithOperatorsComponent } from './observable-with-operators.component';

describe('ObservableWithOperatorsComponent', () => {
  let component: ObservableWithOperatorsComponent;
  let fixture: ComponentFixture<ObservableWithOperatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ObservableWithOperatorsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservableWithOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should display the greeting message', () => {
    const greetingElement = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(greetingElement.textContent).toContain('Hello, RxJS! How are you today?');
  });

  it('should display the correct list of items', () => {
    const expectedItems = [
      { name: 'Item 0-0', description: 'This is item 0-0' },
      { name: 'Item 1-0', description: 'This is item 1-0' },
      { name: 'Item 1-1', description: 'This is item 1-1' },
      { name: 'Item 2-0', description: 'This is item 2-0' },
      { name: 'Item 2-1', description: 'This is item 2-1' },
      { name: 'Item 2-2', description: 'This is item 2-2' },
      { name: 'Item 3-0', description: 'This is item 3-0' },
      { name: 'Item 3-1', description: 'This is item 3-1' },
      { name: 'Item 3-2', description: 'This is item 3-2' },
      { name: 'Item 3-3', description: 'This is item 3-3' },
      { name: 'Item 4-0', description: 'This is item 4-0' },
      { name: 'Item 4-1', description: 'This is item 4-1' },
      { name: 'Item 4-2', description: 'This is item 4-2' },
      { name: 'Item 4-3', description: 'This is item 4-3' },
      { name: 'Item 4-4', description: 'This is item 4-4' },
      { name: 'Item 5-0', description: 'This is item 5-0' },
      { name: 'Item 5-1', description: 'This is item 5-1' },
      { name: 'Item 5-2', description: 'This is item 5-2' },
      { name: 'Item 5-3', description: 'This is item 5-3' },
      { name: 'Item 5-4', description: 'This is item 5-4' },
      { name: 'Item 5-5', description: 'This is item 5-5' },
      { name: 'Item 6-0', description: 'This is item 6-0' },
      { name: 'Item 6-1', description: 'This is item 6-1' },
      { name: 'Item 6-2', description: 'This is item 6-2' },
      { name: 'Item 6-3', description: 'This is item 6-3' },
      { name: 'Item 6-4', description: 'This is item 6-4' },
      { name: 'Item 6-5', description: 'This is item 6-5' },
      { name: 'Item 6-6', description: 'This is item 6-6' },
      { name: 'Item 7-0', description: 'This is item 7-0' },
      { name: 'Item 7-1', description: 'This is item 7-1' },
      { name: 'Item 7-2', description: 'This is item 7-2' },
      { name: 'Item 7-3', description: 'This is item 7-3' },
      { name: 'Item 7-4', description: 'This is item 7-4' },
      { name: 'Item 7-5', description: 'This is item 7-5' },
      { name: 'Item 7-6', description: 'This is item 7-6' },
      { name: 'Item 7-7', description: 'This is item 7-7' },
      { name: 'Item 8-0', description: 'This is item 8-0' },
      { name: 'Item 8-1', description: 'This is item 8-1' },
      { name: 'Item 8-2', description: 'This is item 8-2' },
      { name: 'Item 8-3', description: 'This is item 8-3' },
      { name: 'Item 8-4', description: 'This is item 8-4' },
      { name: 'Item 8-5', description: 'This is item 8-5' },
      { name: 'Item 8-6', description: 'This is item 8-6' },
      { name: 'Item 8-7', description: 'This is item 8-7' },
      { name: 'Item 8-8', description: 'This is item 8-8' },
      { name: 'Item 9-0', description: 'This is item 9-0' },
      { name: 'Item 9-1', description: 'This is item 9-1' },
      { name: 'Item 9-2', description: 'This is item 9-2' },
      { name: 'Item 9-3', description: 'This is item 9-3' },
      { name: 'Item 9-4', description: 'This is item 9-4' },
      { name: 'Item 9-5', description: 'This is item 9-5' },
      { name: 'Item 9-6', description: 'This is item 9-6' },
      { name: 'Item 9-7', description: 'This is item 9-7' },
      { name: 'Item 9-8', description: 'This is item 9-8' },
      { name: 'Item 9-9', description: 'This is item 9-9' }
    ];

    component.items$ = of(expectedItems);
    fixture.detectChanges();

    const itemList = fixture.nativeElement.querySelectorAll('li');
    expect(itemList.length).toBe(expectedItems.length);

    itemList.forEach((itemElement: any, index: number) => {
      expect(itemElement.textContent.trim()).toBe(`${expectedItems[index].name} - ${expectedItems[index].description}`);
    });
  });

  it('should update the lastKeyPressed when a key is pressed', () => {
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const event = new KeyboardEvent('keydown', { key: 'A' });
    inputElement.dispatchEvent(event);
    fixture.detectChanges();
    expect(fixture.componentInstance.lastKeyPressed).toBe('A');
  });

  it('should merge button click and mouse move events', () => {
    const buttonElement = fixture.debugElement.query(By.css('#myButton')).nativeElement;
    const mouseMoveEvent = new MouseEvent('mousemove');
    const buttonClickEvent = new MouseEvent('click');
    const consoleSpy = spyOn(console, 'log');

    buttonElement.dispatchEvent(buttonClickEvent);
    fixture.detectChanges();
    expect(consoleSpy).toHaveBeenCalledWith('Merged event: click');

    document.dispatchEvent(mouseMoveEvent);
    fixture.detectChanges();
    expect(consoleSpy).toHaveBeenCalledWith('Merged event: mousemove');
  });

  xit('should update the lastKeyPressed when a button is clicked and a key is pressed', fakeAsync(() => {
    const buttonElement = fixture.debugElement.query(By.css('#myButton')).nativeElement;
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const event = new KeyboardEvent('keydown', { key: 'B' });
    const consoleSpy = spyOn(console, 'log');

    buttonElement.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();

    setTimeout(() => {
      inputElement.dispatchEvent(event);
      fixture.detectChanges();
    }, 0);

    tick(); // Wait for the event to be processed

    expect(fixture.componentInstance.lastKeyPressed).toBe('B');
    expect(consoleSpy).toHaveBeenCalledWith('Last key pressed: B');
  }));

  it('should unsubscribe from subscriptions on component destroy', () => {
    const evenNumbersSubscription = fixture.componentInstance.evenNumbersSubscription;
    // const mergeSubscription = fixture.componentInstance.mergeSubscription;
    const buttonClickSubscription = fixture.componentInstance.buttonClickSubscription;

    spyOn(evenNumbersSubscription!, 'unsubscribe');
    // spyOn(mergeSubscription!, 'unsubscribe');
    spyOn(buttonClickSubscription!, 'unsubscribe');

    fixture.destroy();

    expect(evenNumbersSubscription!.unsubscribe).toHaveBeenCalled();
    // expect(mergeSubscription!.unsubscribe).toHaveBeenCalled();
    expect(buttonClickSubscription!.unsubscribe).toHaveBeenCalled();
  });
});
