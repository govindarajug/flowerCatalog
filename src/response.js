const CRLF = '\r\n';

class Response {
  #socket;
  #headers;
  constructor(socket) {
    this.#socket = socket;
    this.#headers = {};
  }

  setHeader(head, value) {
    this.#headers[head] = value;
  }

  #writeHeaders() {
    Object.entries(this.#headers).forEach(
      ([head, value]) => this.#write(`${head}:${value}${CRLF}`));
  }

  send(body, statusCode) {
    this.#write(`HTTP/1.1 ${statusCode} OK`);
    this.#write(CRLF);
    this.#writeHeaders();
    this.#write(CRLF);
    this.#write(body);
    this.#socket.end();
  }

  #write(data) {
    this.#socket.write(data);
  }
}

module.exports = { Response };;
