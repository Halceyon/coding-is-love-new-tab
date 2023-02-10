import { set } from './utils';

const Mutations = class {
  constructor(endPoint) {
    this[`SET_${endPoint}`] = set(endPoint);
  }
};

export default Mutations;
