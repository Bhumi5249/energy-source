// src/features/counter/CounterComponent.js
'use client';

import { decrement, increment } from '@/redux/slice/counterSlice';
import { useSelector, useDispatch } from 'react-redux';

const CounterComponent = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

export default CounterComponent;
