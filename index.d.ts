declare namespace stopwatch2 {
  const config: {
    print: boolean;
  };

  function clear(...args: any[]): void;

  function pause(...args: any[]): void;

  function registerToGlobal(...args: any[]): void;

  function show(...args: any[]): void;

  function sleep(...args: any[]): void;

  function start(...args: any[]): void;

  function stop(...args: any[]): void;
}

export = stopwatch2;
