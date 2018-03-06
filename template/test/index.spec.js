import { expect } from 'chai';
import app from '../src/index';

describe('Test', () => {
  it('should complete with success', () => {
    expect(app()).to.equal('PROJECT_NAME');
  });
});
