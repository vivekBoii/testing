import { EventStrategyError } from "./EventStrategyError";
import IEventStrategyFactory from "./EventStrategyFactory";

// Abstract class for creating EventStrategy 
export default abstract class EventStrategyFactory<E> implements IEventStrategyFactory<E> {

  eventMap: Record<string, E>;

  constructor(parameters: Record<string, E>) {
    this.eventMap = parameters;
  }

  // get the required strategy from the eventMap according to the event
  getStrategy(event: string): E {
    if (this.eventMap[event] === null) {
      this.handleInvalidEvent(event);
    }
    return this.eventMap[event];
  }
  private handleInvalidEvent(event: string): void {
    throw new EventStrategyError(event);
  }
}