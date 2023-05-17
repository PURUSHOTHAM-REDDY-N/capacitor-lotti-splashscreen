import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Plugins, Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent],
})
export class Tab1Page {
  constructor() {}
}
const { CallKit } = Plugins;
const { Telephony } = Plugins;
const { Media } = Plugins;

// Check if the platform supports call recording
if (Capacitor.isPluginAvailable('CallKit') && Capacitor.isPluginAvailable('Telephony') && Capacitor.isPluginAvailable('Media')) {
  // Add listeners for call events
  CallKit.addListener('callStarted', (call) => {
    console.log('Call started', call);
    // Start recording the call audio
    Media.startRecording({
      fileFormat: 'm4a',
      audioEncoder: 'aac',
      bitRate: 128000,
      sampleRate: 44100,
      channels: 1
    });
  });
  CallKit.addListener('callEnded', (call) => {
    console.log('Call ended', call);
    // Stop recording the call audio
    Media.stopRecording();
  });
  Telephony.addListener('incomingCall', (call) => {
    console.log('Incoming call', call);
  });
  Telephony.addListener('outgoingCall', (call) => {
    console.log('Outgoing call', call);
  });
} else {
  console.log('Call recording is not supported on this platform');
}
