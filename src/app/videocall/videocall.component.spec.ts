import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCallComponent } from './videocall.component';

describe('VideocallComponent', () => {
  let component: VideoCallComponent;
  let fixture: ComponentFixture<VideoCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoCallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
