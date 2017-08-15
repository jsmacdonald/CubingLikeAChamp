(function() {
  'use strict';

  var repeat = function(n, s) { return new Array(n + 1).join(s); };
  var counts = [];
  var output = '\n';
  var nodeList = document.getElementsByTagName('h3');
  for (var idx = 0; idx < nodeList.length; idx += 1) {
    var left = nodeList[idx].textContent + ' ';
    var right = ' ' + (counts[counts.length] = nodeList[idx].nextElementSibling.getElementsByTagName('li').length);
    output += left + repeat(20 - left.length - right.length, '.') + right + '\n';
  }
  var total = String(counts.reduce(function(a, b) { return a + b; }, 0));
  output += repeat(20, '=') + '\n';
  output += repeat(20 - total.length, ' ') + total + '\n';
  output += '\n';
  console.log(output);

  var largeCard = document.getElementById('large-card');
  document.body.addEventListener('mouseover', function(event) {
    if (event.target.tagName === 'IMG') {
      largeCard.alt = event.target.alt;
      largeCard.src = event.target.src;
    }
  }, false);

  var searchLargeCard = document.getElementById('search-large-img');
  document.body.addEventListener('mouseover', function(event) {
    if (event.target.tagName === 'IMG') {
      searchLargeCard.alt = event.target.alt;
      searchLargeCard.src = event.target.src;
    }
  }, false);

}());