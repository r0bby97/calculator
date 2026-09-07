# Calculator

A browser-based calculator created as part of
[The Odin Project Foundations course](https://www.theodinproject.com/lessons/foundations-calculator).

The project combines JavaScript fundamentals with DOM manipulation, event
handling, state management, and a calculator-style user interface.

## Assignment

Build an on-screen calculator that performs basic arithmetic operations and
handles calculations through an interactive user interface.

The calculator should:

1. Provide separate functions for addition, subtraction, multiplication, and
   division.
2. Store the first number, selected operator, and second number.
3. Use an `operate()` function to execute the selected arithmetic operation.
4. Update the display as numbers and operators are entered.
5. Calculate and display results when the equals button is selected.
6. Support sequential calculations by using the previous result in the next
   operation.
7. Handle common calculator edge cases such as decimal input and division by
   zero.

## Current Features

- Number input from `0` to `9`
- Addition, subtraction, multiplication, and division
- Central calculation state stored in a JavaScript object
- An `operate()` function that selects the correct arithmetic operation
- Separate storage for the first operand, second operand, operator, and result
- Live display updates while entering calculations
- A secondary display row that shows the previous operation
- Sequential calculations without pressing equals between every operation
- Previous results can be used as the first operand of a new calculation
- Entering a number after displaying a result starts a new calculation
- Decimal number input
- Prevention of multiple decimal points within the same operand
- Formatting of long decimal results
- Scientific notation for results greater than or equal to `1e9`
- Error handling for division by zero
- `AC` button to reset the complete calculation
- Automatic display scrolling for long values
- Styled error messages
- Calculator interface built with CSS and Flexbox

## Calculation Flow

1. Number buttons build the first operand.
2. Selecting an operator stores the requested arithmetic operation.
3. Further number input builds the second operand.
4. Selecting `=` evaluates the current operation and displays the result.
5. Selecting another operator after entering the second operand evaluates the
   current operation first and continues with its result.
6. Selecting a number after a completed calculation clears the previous state
   and starts a new calculation.

## Result Formatting

Results are formatted to keep long numbers readable within the calculator
display.

- Decimal results are limited to a maximum of 10 fractional digits.
- Results greater than or equal to `1e9` are displayed using scientific
  notation.

## Planned Features

- Implement the `DEL` button
- Implement the percentage button
- Implement the positive/negative button
- Add keyboard support
- Allow an entered operator to be replaced before entering the second operand
- Improve handling of `0` as the second operand for non-division operations
- Continue refining calculator edge cases

## Built With

- HTML5
- CSS3
- JavaScript
- DOM manipulation
- Flexbox

## Project Status

Work in progress.

The main calculator logic is functional and supports basic arithmetic,
sequential calculations, decimal input, result formatting, clearing the
calculator, and division-by-zero error handling. The remaining work focuses on
the additional calculator controls, keyboard support, and smaller edge cases.