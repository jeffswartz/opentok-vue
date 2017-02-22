
Vue.component('ot-session', {
  template: '<p>You are connected.</p>',
  data: function () {
    return {
      connected: false
    };
  },
  computed: {
    toggle: function () {
      this.connected = !this.connected;
      return this.connected
    }
  }
});

Vue.component('ot-publisher', {
  template: '<div></div>'
});

var mainVue = new Vue({
  el: '#app',
  data: {
    apiKey:  config.OT_API_KEY,
    sessionId: config.OT_SESSION_ID,
    token: config.OT_API_KEY,
    connected: false
  },
  methods: {
    onConnected: () => {
      console.log('ff');
      connected = 'true';
    }
  }
});

let session = createSession(config.OT_API_KEY, config.OT_SESSION_ID, config.OT_TOKEN, onStreamsUpdated);

session.session.on('sessionConnected', (event) => {
  console.log(event, mainVue.connected);
  mainVue.connected = 'true';
  mainVue.onConnected();
  const container = document.getElementById('publisherContainer');
  let publisher = OT.initPublisher(container, null);
  session.session.publish(publisher, (error) => {
    console.log('publishing');
  });
});

function onStreamsUpdated(streams) {
  console.log('onStreamsUpdated', streams);
  for (let i = 0; i < streams.length; i++) {
    session.session.subscribe(streams[i]);
  }
}

