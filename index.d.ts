// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]
// Project: [~THE PROJECT NAME~]
// Definitions by: [~YOUR NAME~] <[~A URL FOR YOU~]>

/*~ This is the module template file. You should rename it to index.d.ts
 *~ and place it in a folder with the same name as the module.
 *~ For example, if you were writing a file for "super-greeter", this
 *~ file should be 'super-greeter/index.d.ts'
 */

/*~ If this module is a UMD module that exposes a global variable 'myLib' when
 *~ loaded outside a module loader environment, declare that global here.
 *~ Otherwise, delete this declaration.
 */
export as namespace stopwatch2;

declare namespace stopwatch {
  function clear(...args: any[]): void;

  function list(...args: any[]): void;

  function pause(...args: any[]): void;

  function sleep(...args: any[]): void;

  function start(...args: any[]): void;

  function stop(...args: any[]): void;
}

export = (groupName: String) => stopwatch;
