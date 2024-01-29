// handle errors in case of unhandled event
export class EventStrategyError extends Error {

  message: string;

  constructor(event: string) {
    super(event);

    this.message = event;

    // 👇️ because we are extending a built-in class
    Object.setPrototypeOf(this, EventStrategyError.prototype);
  }

  getErrorMessage() {
    return "Invalid event, Wrong or unimplemented event passed: " + this.message;
  }
}