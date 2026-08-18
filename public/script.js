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