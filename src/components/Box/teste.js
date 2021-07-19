const input = 9230.01;

const salary = input;

let percent;

if (input > 0 &&  input <= 400.00 ) {
  percent = 15;
} else if (input >= 400.01 && input <= 800.00  ) {
  percent = 12;
} else if ( input >= 800.01 && input <= 1200.00  ) {
  percent = 10;
} else if ( input >= 1200.01 && input <= 2000.00 ) {
  percent = 7;
} else 
  if (input >= 2000.01) {
  percent = 4;
}

const reajust = (salary/ 100) * percent;
const newSalary = salary + reajust;
console.log("Novo salario: " + newSalary.toFixed(2));
console.log("Reajuste ganho: " + reajust.toFixed(2));
console.log("Em percentual: " + percent + " %");