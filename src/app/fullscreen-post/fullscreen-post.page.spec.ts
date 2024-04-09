import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FullscreenPostPage } from './fullscreen-post.page';

describe('FullscreenPostPage', () => {
  let component: FullscreenPostPage;
  let fixture: ComponentFixture<FullscreenPostPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FullscreenPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
