export default class Server {
  static connect(connector) {
    return new Server(connector);
  }

  constructor(connector) {
    this.connector = connector;
  }

  listen(port = 3000) {
    this.connector.listen(port, "0.0.0.0");
  }
}
