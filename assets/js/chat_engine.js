class ChatEngine {
    constructor(chatBoxId, userEmail) {
        this.chatBoxId = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000', { transports : ['websocket'] });

        if(this.userEmail) {
            this.connectionHandler();
        }
    }

    connectionHandler() {
        this.socket.on('connect', function(){
            console.log('Connection established using sockets...!');
        });
    }
}