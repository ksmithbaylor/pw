'use strict';

var scrypt = require('scryptsy');
var Clipboard = require('clipboard');

var UPPERS         = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var LOWERS         = 'abcdefghijklmnopqrstuvwxyz';
var DIGITS         = '0123456789';
var PUNCTS         = '-/()$&@?!';
var ESCAPED_PUNCTS = '-/()\$&@\?!';

var SECURE_ITERATIONS = 8192;
var PASSWORD_LENGTH = 10;

var display = document.getElementById('display');
var master  = document.getElementById('master');
var site    = document.getElementById('site');
var symbols = document.getElementById('symbols-toggle');

var clipboard = new Clipboard('#copy-button');
master.focus();

// Select text when focusing the display
display.addEventListener('focus', function () { selectText(display); });

// Handle changes to the fields
master.addEventListener('change', handleChange);
site.addEventListener('change', handleChange);
symbols.addEventListener('change', handleChange);

// Called whenever either input is changed
function handleChange() {
  if (master.value === '' || site.value === '') {
    display.innerHTML = '';
  } else {
    display.innerHTML = generatePassword(master.value, site.value);
    master.blur();
    site.blur();
    selectText(display);
  }
}

// Generates a password from a master password and site name
function generatePassword(master, site) {
  var encrypted = securelyEncrypt(site, master);

  // Loop one iteration at a time until the resulting password
  // has at least one of each character type
  var cycles = 0;
  do {
    encrypted = quicklyEncrypt(encrypted, site);
    var password = convertToChars(encrypted);
    cycles++;
  } while (notAllTypes(password));

  return password;
}

// Runs a secure number of iterations of scrypt and returns
// a 64-byte buffer
function securelyEncrypt(key, salt) {
  return scrypt(key, salt, SECURE_ITERATIONS, 8, 1, 64);
}

// Runs a single iteration of scrypt with low memory usage and
// returns a buffer of length `PASSWORD_LENGTH`
function quicklyEncrypt(key, salt) {
  return scrypt(key, salt, 1, 1, 1, PASSWORD_LENGTH);
}

// Converts a buffer into a string based on a set of characters
function convertToChars(buf) {
  var characters = UPPERS + LOWERS + DIGITS;
  if (symbols.checked) characters += PUNCTS;

  return bufferToArray(buf).map(function (x) {
    return characters[x % characters.length];
  }).join('');
}

// Converts a Buffer or Typed Array to a normal array
function bufferToArray(buf) {
  return Array.prototype.slice.call(buf, 0);
}

// Determines whether or not a string is missing one or more
// character classes
function notAllTypes(str) {
  var types = [UPPERS, LOWERS, DIGITS];
  if (symbols.checked) types.push(ESCAPED_PUNCTS);

  return !types.every(function (charset) {
    return hasAtLeastOne(charset, str);
  });
}

// Tests a string for a set of characters
function hasAtLeastOne(charset, str) {
  return new RegExp('[' + charset + ']').test(str);
}

// Select all text in an element
// http://stackoverflow.com/questions/985272/selecting-text-in-an-element-akin-to-highlighting-with-your-mouse
function selectText(element) {
  var range, selection;

  if (document.body.createTextRange) {
    range = document.body.createTextRange();
    range.moveToElementText(element);
    range.select();
  } else if (window.getSelection) {
    selection = window.getSelection();
    range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}
