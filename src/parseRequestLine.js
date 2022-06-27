const parseRequestLine = (requestLine) => {
  const [method, paramString, httpVersion] = requestLine.split(' ');
  const { uri, params } = parseRawUri(paramString);
  return { method, uri, params, httpVersion };
};

const parseHeader = (line) => {
  const indexOfSeparator = line.indexOf(':');
  const header = line.slice(0, indexOfSeparator).toLowerCase();
  const value = line.slice(indexOfSeparator + 1).trim();
  return { header, value };
};

const parseHeaders = (lines) => {
  const headers = {};
  let index = 0;
  while (index < lines.length && lines[index]) {
    const { header, value } = parseHeader(lines[index]);
    headers[header] = value;
    index++;
  }
  return headers;
};

const parseQueryArgs = (parameters) => {
  const args = {};
  parameters.split('&').forEach(arg => {
    const [parameter, value] = arg.split('=');
    args[parameter] = value;
  });
  return args;
};

const parseRawUri = (rawUri) => {
  let params;
  const [uri, paramString] = rawUri.split('?');
  if (paramString) {
    params = parseQueryArgs(paramString);
  }
  return { uri, params };
};

const parseRequest = (chunk) => {
  const lines = chunk.split('\r\n');
  const parsedRequestLine = parseRequestLine(lines[0]);
  const headers = parseHeaders(lines.slice(1));
  return { ...parsedRequestLine, headers };
};

module.exports = { parseRequest, parseRequestLine, parseHeaders, parseHeader };
