// Interface for event strategy factory, with function for getting the event strategy
export default interface IEventStrategyFactory<E> {
    getStrategy(event: string): E;
}