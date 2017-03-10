
/*
 * Class for regustering and dispatching actions between different part of garden app
 */
export class ActionDispatcher {
  constructor() {
    this.listeners = {};
  }

  /* Register a listener on the 'type' of action, which executes callback */
  register(id, type, callback) {
    this.listeners[id] = {type: type, callback: callback};
  }

  /* Unregister the listener with 'id' */
  unregister(id) {
    delete this.listeners[id];
  }

  /*
    Dispatch an action on all listeners
    If a listener matches type of action, it executes callback
    with parameter as data contained in action
  */
  dispatch(action) {
    for (const id in this.listeners) {
      const listener = this.listeners[id];
      if (listener.type === action.type) {
        listener.callback(action.data);
      }
    }
  }
}
