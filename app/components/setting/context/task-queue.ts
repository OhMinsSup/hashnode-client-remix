import { scheduleMicrotask } from "~/libs/browser-utils";

export class TaskQueue {
  private queue: (string | undefined)[];
  private timer: ReturnType<typeof setTimeout> | undefined;
  constructor() {
    this.queue = [];
    this.timer = undefined;
  }

  enqueue(value: string, callback: (...args: any[]) => void) {
    clearTimeout(this.timer);
    this.queue.push(value);
    this.timer = setTimeout(() => {
      const lastValue = this.queue.pop();
      this.processRequest(lastValue, callback);
      this.queue = [];
    }, 250);
  }

  processRequest(
    value: string | undefined,
    callback: (...args: any[]) => void
  ) {
    scheduleMicrotask(() => {
      callback(value);
    });
  }
}
