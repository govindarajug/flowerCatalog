const appendChild = (parent, object, tag) => {
  const values = Object.values(object).join(' ');
  const element = document.createElement(tag);
  element.innerText = values;
  parent.appendChild(element);
  return element;
};

const makeXhr = (xhrHandler, { method, path, bodyParams }) => {
  const xhr = new XMLHttpRequest();
  xhr.onload = (event) => xhrHandler(xhr, event);
  xhr.open(method, path);
  if (method === 'POST') {
    xhr.send(bodyParams);
    return;
  }
  xhr.send();
};

const updateView = (xhr, event) => {
  const commentsEle = document.querySelector('#comments');
  commentsEle.innerHTML = null;
  JSON.parse(xhr.response).forEach(comment => { appendChild(commentsEle, comment, 'div'); });
  return;
};

const showComments = (xhr, event) => {
  if (xhr.status === 200) {
    const xhReq = {
      method: 'GET',
      path: '/api/comments'
    };
    makeXhr(updateView, xhReq);
    return;
  }
  alert('Oops! something went wrong');
  return;
};

const postComment = () => {
  const xhReq = {
    method: 'POST',
    path: '/comment'
  };
  const form = document.querySelector('form');
  const formData = new FormData(form);
  xhReq.bodyParams = new URLSearchParams(formData).toString();
  form.reset();

  makeXhr(showComments, xhReq);
  return;
};
