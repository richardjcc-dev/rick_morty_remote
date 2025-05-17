interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
}
declare const useCounterStore: import('zustand').UseBoundStore<
  import('zustand').StoreApi<CounterState>
>
export default useCounterStore
