# Calculator

A browser-based calculator created as part of
[The Odin Project Foundations course](https://www.theodinproject.com/lessons/foundations-calculator).

The project combines JavaScript fundamentals with DOM manipulation, event
handling, state management, and a calculator-style user interface.

## Assignment

Build an on-screen calculator that performs one arithmetic operation at a time.
The project should:

1. Provide separate functions for addition, subtraction, multiplication, and
   division.
2. Store the first number, the selected operator, and the second number.
3. Use an `operate()` function to call the correct arithmetic function.
4. Include number, operator, equals, and clear buttons as well as a display.
5. Update the stored numbers and display when digit buttons are selected.
6. Calculate and display the result when the equals button is selected.
7. Evaluate the current pair of numbers before continuing with another
   operator. For example, `12 + 7 - 1 =` is evaluated as `(12 + 7) - 1` and
   produces `18`.

## Current Features

- Number input through on-screen buttons from `0` to `9`
- Storage for the first operand, second operand, and selected operator
- Addition, subtraction, multiplication, and division
- An `operate()` function that selects the correct arithmetic operation
- A display that updates while numbers and operators are entered
- A secondary display row that shows the previous operation
- Calculation of a complete operation with the equals button
- Sequential calculations that evaluate one pair of numbers at a time
- Continued calculations using the previous result as the next first operand
- An `AC` button that clears the stored values and both display rows
- A calculator interface styled with CSS and Flexbox

## Current Calculation Flow

1. The first digit buttons build the first operand.
2. An operator button stores the selected operation.
3. The following digit buttons build the second operand.
4. Selecting `=` calculates the current operation and displays its result.
5. Selecting another operator after the second operand first calculates the
   current operation, then stores the result and new operator for the next one.

## Planned Features

- Round long decimal results so they fit within the display
- Replace consecutive operators without running an incomplete calculation
- Start a new calculation when a digit is selected after displaying a result
- Display an error message when dividing by zero
- Enable decimal input and prevent multiple decimal points in one number
- Implement the delete button
- Add keyboard support
- Implement the remaining percentage and positive/negative buttons

## Built With

- HTML5
- CSS3
- JavaScript
- DOM manipulation
- Flexbox

## Project Status

Work in progress. The calculator completes basic operations and supports
sequential calculations one pair of numbers at a time. The remaining edge
cases, special-function buttons, and extra-credit features still need to be
implemented.