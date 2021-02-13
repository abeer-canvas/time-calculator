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
  const ampmRegex = /[ap]m/gi; 

  // Changes below
  // For first element
  const hour1 = Number(timeArr[0].match(hourRegex).join(''));
  const minute1 = Number(timeArr[0].match(minuteRegex).join(''));
  const ampm1 = timeArr[0].match(ampmRegex).join('');
  const firstMins = getTotalMin1(hour1, minute1, ampm1);

  // For second element
  const hour2 = Number(timeArr[1].match(hourRegex).join(''));
  const minute2 = Number(timeArr[1].match(minuteRegex).join(''));
  const ampm2 = timeArr[1].match(ampmRegex).join('');
  const secondMins = getTotalMin2(hour2, minute2, ampm1, ampm2);

  return Number(secondMins - firstMins);
};

const getTotalMin1 = function(hour, minute, ampm){
  // 12am will be 00:00
  if(hour === 12 && ampm === 'am') hour = 0;

  if(hour !== 12 && ampm === 'pm') hour += 12;

  return (hour*60)+minute;
}

const getTotalMin2 = function(hour, minute, ampm1, ampm2){
  if(hour !== 12 && ampm2 === 'pm') {
    hour += 12;
  } else if (ampm1 === 'pm' && ampm2 === 'am'){
    hour += 24;
  }

  return (hour*60)+minute;
}