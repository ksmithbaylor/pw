'use strict';

const UPPERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERS = 'abcdefghijklmnopqrstuvwxyz';
const DIGITS = '0123456789';
const PUNCTS = '-/()$&@?!';
const ESCAPED_PUNCTS = '-/()\$&@\?!';
const CHARACTERS = UPPERS + LOWERS + DIGITS + PUNCTS;

var display = document.getElementById('display');
var master = document.getElementById('master');
var site = document.getElementById('site');

var characterClass = function (str) {
  return new RegExp('[' + str + ']');
}

var notAllTypes = function (str) {
  return !(characterClass(UPPERS).test(str) &&
           characterClass(LOWERS).test(str) &&
           characterClass(DIGITS).test(str) &&
           characterClass(ESCAPED_PUNCTS).test(str));
}

var getPassword = function (hash, master_val, site_val) {
  var i = 0;
  var encodedSha = sha256(hash, {asBytes: true}).map(function (x) {
    return CHARACTERS[(x + i++) % CHARACTERS.length];
  });

  var shuffled = sha256(site_val, {asBytes: true}).map(function (x) {
    return encodedSha[(x + i++) % encodedSha.length];
  });

  return shuffled.join('').slice(0, 10);
}

var handleChange = function handleChange() {
  var master_val = master.value, site_val = site.value;
  var password, hash = master_val + site_val;

  if (master_val === '' || site_val === '') return;

  do {
    hash = sha256(hash, {asBytes: true});
    password = getPassword(hash, master_val, site_val);
  } while (notAllTypes(password))

  display.innerHTML = password;
};

master.addEventListener('change', handleChange);
site.addEventListener('change', handleChange);
