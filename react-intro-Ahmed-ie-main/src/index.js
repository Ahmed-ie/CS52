import $ from 'jquery';
import './style.scss';

$('#main').html('Here we go!');

// counter

let num = 0;

// run every 1 sec

setInterval(() => {
  num++;
  $('#main').html(`You've been on this page for ${num} seconds`);
}, 1000);
