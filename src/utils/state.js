  export const state = (initial) => {
    const s = {
      prev: null,
      next: initial
    };
    const setState = (args) => {
      s.prev = s.next;
      s.next = args;
    };
    const getPrevState = () => s.prev;
    const getState = () => s.next;
    return [getState, setState, getPrevState];
  };

