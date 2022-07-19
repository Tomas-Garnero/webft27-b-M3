const sum = require('./sum');

// it === test
xit('should return 8 if adding 3 and 5', () => {
  console.log(expect(sum(3,5)));
  // sun(3,5) === 8
  expect(sum(3, 5)).toBe(8);
});

xit('should return 15 if adding 7 and 8', () => {
  // console.log(expect(sum(3,5)));
  // sum(7,8) === 15
  expect(sum(7, 8)).toBe(15);
});

xit('should return 0 if adding -1 and 1', () => {
  // console.log(expect(sum(-1,1)));
  // sum(-1,1) === 0
  expect(sum(-1, 1)).toBe(0);
});