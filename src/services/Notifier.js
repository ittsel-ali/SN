import Pusher from 'pusher-js'
import {config} from '../env'

class Notifier {
  
  constructor(){
    Pusher.logToConsole = true;
    
    this.notifier = new Pusher(config.keys.NOTIFIER_KEY, {
      cluster: 'us2', 
      forceTLS: true
    });
  }

  subscribeToFRNotifier(channelName, func){
    const channel = this.notifier.subscribe(channelName);
    channel.bind('FR', (user) => func(user) );
  }

  subscribeToFCNotifier(channelName, func){
    const channel = this.notifier.subscribe(channelName);
    channel.bind('FC', (user) => func(user) );
  }

  subscribeToChatNotifier(channelName, func){
    const channel = this.notifier.subscribe(channelName);
    channel.bind('Chat', (message) => func(message) );
  }

  subscribeToCommentNotifier(channelName, func){
    const channel = this.notifier.subscribe(channelName);
    channel.bind('Comment', (data) => {
      func(data.event_id, data.event_type, data);
    } );
  }

}

export default Notifier