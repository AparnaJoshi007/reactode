# Class components v/s Functional components

- Life cycle (for class)

- React hooks (for functional)

## Need for Hooks

## Caveats 
Hooks cannot be used conditionally

## Few popular hooks and their functions
1. **useState** - Compliment for state in class components (main difference if you are using objects for hooks, destructure and update all the keys. Link: https://youtu.be/f687hBjwFcM?t=455)
why usestate? Custom hook: https://youtu.be/f687hBjwFcM?t=814
2. **useEffect** - The function is run every time render happens. Also execute it conditionally when a particular value changes. pass it as an argument in the array [] (called as dependancy array). Shallow comparision happens. Complimentary to componentDidMount and componentWillUnmount by passing empty array. Also add cleanup function by adding a return function(https://youtu.be/f687hBjwFcM?t=1413). Can have multiple useEffects and they are fired in the order they are registered.
3. **useRef** - (https://youtu.be/f687hBjwFcM?t=2169) Similar to createRef from class components. `inputRef.current.focus()`. Can use as instant variables in classes and not be tied to react rerendering. Use references to solve the problem of updating state when the component is unmounted (https://youtu.be/f687hBjwFcM?t=2535). Set the reference value to false before unmounting and checkit before setting a state. Access the value with `.current`
4. **useLayoutEffect** - Signature is identical to useeffect and is fired when DOM mutations occur. `getBoundingClientRect()`. 
5. **useCallback** - To prevent function being created during every render. https://youtu.be/f687hBjwFcM?t=3595. Especially when using React.memo. Useful when iterating over an array, pass the function down and the logic can be put in the child component.
6. **useMemo** - Optimize computed values. Avoid recomputation of functions by using useMemo. https://youtu.be/f687hBjwFcM?t=4461
7. **useReducer** - Alternative to useState hook. Quite similar to how redux reducers work. Returns a value and dispatch function. Takes two params, a reducer function and initial value. Todo list example: https://youtu.be/f687hBjwFcM?t=5351. Can use `use-immer`to change state by mutating, but it handles it immutably.
8. **useContext** - Share the data throughout the application. https://youtu.be/f687hBjwFcM?t=6229 user login example.

// Why use functional components

// Class v/s functional components 

after React 16.8, functional components can do everything except ->
componentDidError and getSnapshotBeforeUpdate -> can be done only be class

