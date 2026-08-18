document.addEventListener('keydown', function (e) {
  if (e.key == 'F12' || (e.ctrlKey && e.shiftKey && e.key == 'I') || (e.ctrlKey && e.shiftKey && e.key == 'J') || (e.ctrlKey && e.key == 'U')) e.preventDefault();
});
var f = document.querySelector('form');
if (f) {
  f.addEventListener('submit', function () {
    var bs = document.querySelectorAll('button');
    for (var i = 0; i < bs.length; i++) { bs[i].disabled = true; }
  });
}
// Get token from URL and inject to hidden input
const urlParams = new URLSearchParams(window.location.search);
const tokenVal = urlParams.get('token');
if (tokenVal) {
  const tokenInput = document.querySelector('input[name="_token"]');
  if (tokenInput) tokenInput.value = tokenVal;
}
