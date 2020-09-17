export { };
const expect = require('chai').expect;

async function add(a: number, b: number) {
  return Promise.resolve(a + b);
}

describe('#add()', () => {
  it('2 + 2 is 4', async () => {
    const p = await add(2, 2)
    expect(p).to.equal(4);
  });

  it('3 + 3 is 6', async () => {
    const p = await add(3, 3)
    expect(p).to.equal(6);
  });
});
// 'use strict';
// const assert = require('assert');

// describe('mocha-test 1', () => {
//   it('prepare.js must be loaded by now', () => {
//     // prepare.js has been loaded
//     assert.ok(require.cahe[require.resolve('./prepare.ts')]);
//   });
// })

// import { hello } from './hello-world';
// import { expect } from 'chai';
// import 'mocha';

// describe('Hello function', () => {

//   it('should return hello world', () => {
//     const result = hello();
//     expect(result).to.equal('Hello world!');
//   });

// });
