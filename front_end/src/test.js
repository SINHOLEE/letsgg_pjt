import { observable, reaction, computed } from './../node_modules/mobx';

// Observable State 만들기
const calculator = observable({
  a: 1,
  b: 2
});

// **** 특정 값이 바뀔 때 특정 작업 하기!
reaction(
  () => calculator.a,
  (value, reaction) => {
    console.log(`a 값이 ${value} 로 바뀌었네요!`);
  }
);

reaction(
  () => calculator.b,
  value => {
    console.log(`b 값이 ${value} 로 바뀌었네요!`);
  }
);

// **** computed 로 특정 값 캐싱
const sum = computed(() => {
  console.log('계산중이예요!');
  return calculator.a + calculator.b;
});

sum.observe(() => calculator.a); // a 값을 주시
sum.observe(() => calculator.b); // b 값을 주시

calculator.a = 10;
calculator.b = 20;

//**** 여러번 조회해도 computed 안의 함수를 다시 호출하지 않지만..
console.log(sum.value);
console.log(sum.value);


// 내부의 값이 바뀌면 다시 호출 함
calculator.a = 20;
console.log(sum.value);