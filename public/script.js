function getPairCode() {
  fetch('/pair')
    .then(res => res.text())
    .then(data => {
      document.getElementById('output').textContent = data;
    })
    .catch(err => {
      document.getElementById('output').textContent = 'Error: ' + err.message;
    });
}
