let sendUrl = document.getElementById('sendUrl');

sendUrl.onclick = function(element) {
  sendUrl.style.backgroundColor = 'green';
  sendUrlToHeroku();

  setInterval(() => {
    sendUrl.style.backgroundColor = 'white';
  }, 100);
};

const sendUrlToHeroku = () => {
  var tablink = 'Your link is now saved!';
  chrome.tabs.getSelected(null, function(tab) {
    tablink = tab.url;
    /* alert(tablink); */
  });
  setTimeout(() => {
    /* alert(tablink); */
    if (tablink.startsWith('http://')) {
      tablink = tablink.slice(7);
    }
    if (tablink.startsWith('https://')) {
      tablink = tablink.slice(8);
    }

    /* alert(tablink); */
    var data = `url=https%3A%2F%2F${tablink}`;
    /* alert(data); */
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener('readystatechange', function() {
      if (this.readyState === 4) {
        /* alert(this.responseText); */
      }
    });
    xhr.open('POST', 'https://not-now-app.herokuapp.com/api/addurl');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Accept', '*/*');
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    xhr.setRequestHeader(
      'Postman-Token',
      '65df2ab0-31e8-40da-8019-cfcfc4daf10d,edfc0711-2e43-493f-9ce8-bba522905496'
    );
    xhr.setRequestHeader('cache-control', 'no-cache');
    xhr.send(data);
  }, 1000);
};
