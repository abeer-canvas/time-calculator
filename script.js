"use strict";

const input = document.querySelector(".input-times");
const btn = document.querySelector(".btn-submit");
const result = document.querySelector(".result-text");
let inputValue;
let totalMinute = 0;

btn.addEventListener('click', function(){
  // Getting Blocks
  inputValue = input.value;
  if(inputValue === '') return;
  const regex = /[0-9]{1,2}:[0-9]{1,2}[ap]m - [0-9]{1,2}:[0-9]{1,2}[ap]m/gi;
  let blocks = inputValue.match(regex);
  // console.log(blocks);
  
  totalMinute = 0;
  blocks.forEach(block => {
    let times = [];
    const regex = /[0-9]{1,2}:[0-9]{1,2}[ap]m/gi;
    times = block.match(regex);
    totalMinute += minuteMinus(times);
  });

  getTotalTime();
  input.value = '';
});

const getTotalTime = function() {
  let hour = (totalMinute-(totalMinute%60))/60;
  let minute = totalMinute%60;

  result.textContent = `${hour}:${minute.toString().padStart(2, '0')}`;
}

const minuteMinus = function(timeArr){
  const hourRegex = /^[0-9]{1,2}/gi;
  const minuteRegex = /[0-9]{1,2}(?=[ap]m)/gi;
  const ampmRegex = /[ap]m/gi; //refactor

  let hour = 0;
  let minute = 0;
  let ampm;

  // Changes below
  // For first element
  hour = Number(timeArr[0].match(hourRegex).join(''));
  minute = Number(timeArr[0].match(minuteRegex).join(''));
  ampm = timeArr[0].match(ampmRegex).join('');
  let firstMins = getTotalMin(hour, minute, ampm);
  hour = 0;
  minute = 0;
  ampm = undefined;

  // For second element
  hour = Number(timeArr[1].match(hourRegex).join(''));
  minute = Number(timeArr[1].match(minuteRegex).join(''));
  ampm = timeArr[1].match(ampmRegex).join('');
  let secondMins = getTotalMin(hour, minute, ampm);
  hour = 0;
  minute = 0;
  ampm = undefined;

  return Number(secondMins - firstMins);
};

const getTotalMin = function(hour, minute, ampm){
  // 12am will be 00:00
  if(hour === 12 && ampm === 'am') hour = 0;

  if(hour !== 12 && ampm === 'pm') hour += 12;

  return (hour*60)+minute;
}