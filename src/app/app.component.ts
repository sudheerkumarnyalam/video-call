import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VideoCallComponent } from '../app/videocall/videocall.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [VideoCallComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'video-call-app';
}
