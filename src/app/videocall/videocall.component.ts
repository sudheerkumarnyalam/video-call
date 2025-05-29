// src/app/components/video-call/video-call.component.ts
import { Component, OnInit } from '@angular/core';
import { WebrtcService } from '../../app/services/videocall.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule


@Component({
  selector: 'app-videocall',
  templateUrl: './videocall.component.html',
  styleUrls: ['./videocall.component.css'],
  standalone: true
})
export class VideoCallComponent implements OnInit {
  localVideo: HTMLVideoElement | null = null;
  remoteVideo: HTMLVideoElement | null = null;

  constructor(private webrtcService: WebrtcService) {}

  ngOnInit() {
    this.localVideo = document.querySelector('#localVideo');
    this.remoteVideo = document.querySelector('#remoteVideo');

    // Ensure remoteVideo is not null before setting srcObject
    if (this.remoteVideo) {
      this.webrtcService.getRemoteStream().getTracks().forEach(track => {
        this.remoteVideo!.srcObject = this.webrtcService.getRemoteStream();
      });
    } else {
      console.error('Remote video element not found in the DOM.');
    }
  }

  async startCall() {
    if (this.localVideo) {
      try {
        const localStream = await this.webrtcService.startLocalStream();
        this.localVideo.srcObject = localStream;
        await this.webrtcService.call();
      } catch (error) {
        console.error('Error starting call:', error);
      }
    } else {
      console.error('Local video element not found in the DOM.');
    }
  }

  async stopCall() {
    try {
      await this.webrtcService.stopConnection();
      // Safely handle potential null values
      if (this.localVideo) {
        this.localVideo.srcObject = null;
      }
      if (this.remoteVideo) {
        this.remoteVideo.srcObject = null;
      }
    } catch (error) {
      console.error('Error stopping call:', error);
    }
  }
}