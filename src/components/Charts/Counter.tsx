interface CounterProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

function Counter({ count, setCount }: CounterProps) {
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div className="flex flex-col  w-1/2 gap-4 border-2 rounded-xl p-2 bg-base-100 border-base-content/20">
      <div className="text-3xl text-center ">Punti: {count}</div>

      <div className="flex flex-row justify-evenly gap-4">
        <button className="btn btn-md rounded-lg" onClick={increment}>
          <span className="icon-[ic--round-add] size-8"></span>
        </button>
        <button className="btn btn-md rounded-lg" onClick={decrement}>
          <span className="icon-[ic--round-remove] size-8"></span>
        </button>
      </div>
    </div>
  );
}

export default Counter;
