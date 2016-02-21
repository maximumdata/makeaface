var saveBtn = document.getElementById('save');
var resetBtn = document.getElementById('reset');
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

var mousePos ={
  x: 0,
  y: 0
};


var eyes = {
  el: document.getElementById('eyes'),
  width: 150,
  height: 75,
  x: -1000,
  y: 0
}

var nose = {
  el: document.getElementById('nose'),
  width: 123,
  height: 98,
  x: -1000,
  y: 0
}

var mouth = {
  el: document.getElementById('mouth'),
  width: 123,
  height: 64,
  x: -1000,
  y: 0
}

var curDrag = eyes;

var face = [];

var Part = function(obj) {
  this.x = obj.x;
  this.y = obj.y;
  this.width = obj.width;
  this.height = obj.height;
  this.el = obj.el;
}

function getMousePos(event) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

canvas.addEventListener('mousemove', function(e) {
  mousePos = getMousePos(e);
  curDrag.x = mousePos.x - (curDrag.width / 2);
  curDrag.y = mousePos.y - (curDrag.height / 2);
});

canvas.addEventListener('mouseleave', function(e) {
  curDrag.x = -1000;
});

canvas.addEventListener('click', function(e) {
  face.push(new Part(curDrag));
});

saveBtn.addEventListener('click', function(e) {
  var dataUrl = canvas.toDataURL();
  window.open(dataUrl);
});

resetBtn.addEventListener('click', function(e) {
  face = [];
});

var controlEls = document.querySelectorAll('.controls > div');

for(var i = 0; i < controlEls.length; i++) {
  controlEls[i].addEventListener('click', function(e) {
    var thisImg = this.querySelector('img');
    if(thisImg) {
      switch(thisImg.getAttribute('id')) {
        default:
        case 'eyes':
        curDrag = eyes;
        break;
        case 'nose':
        curDrag = nose;
        break;
        case 'mouth':
        curDrag = mouth;
        break;
      }
    }
  });
}

(function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawHead();
  face.forEach(function(part, index) {
    context.drawImage(part.el, part.x, part.y, part.width, part.height);
  });
  context.drawImage(curDrag.el, curDrag.x, curDrag.y, curDrag.width, curDrag.height);
  setTimeout(draw, 20);
})();


function drawHead() {
  context.beginPath();
    context.arc(250, 250, 150, 0, 2 * Math.PI);
    context.fillStyle = '#ffad60';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = '#000000';
    context.stroke();
}
