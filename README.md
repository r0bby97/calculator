# Calculator

A browser-based calculator created as part of
[The Odin Project Foundations course](https://www.theodinproject.com/lessons/foundations-calculator).

The project combines JavaScript fundamentals with DOM manipulation, event
handling, state management, input validation, keyboard interaction, and a
calculator-style user interface.

## Assignment

Build an on-screen calculator that performs basic arithmetic operations through
an interactive user interface.

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

## Features

- Number input from `0` to `9`
- Addition, subtraction, multiplication, and division
- Central calculation state stored in a JavaScript object
- An `operate()` function that selects the correct arithmetic operation
- Separate storage for both operands, the operator, and the current result
- Live display updates while entering calculations
- A secondary display row for the previous operation
- Sequential calculations without requiring `=` between every operation
- Continued calculations using the previous result as the next first operand
- Starting a new calculation by entering a number after a completed result
- Decimal number input
- Automatic insertion of a leading zero when entering values such as `.5`
- Prevention of multiple decimal points within the same operand
- Removal of unused trailing decimal points before calculations
- Removal of unnecessary leading zeros
- Formatting of long decimal results
- Scientific notation for large results
- Division-by-zero error handling
- `AC` button for resetting the complete calculator state
- `DEL` button for deleting the most recent number or operator input
- Protection against editing a completed result with `DEL`
- Positive/negative (`±`) button for switching the sign of the current number
- Keyboard support for calculator input
- Automatic display scrolling for long calculations
- Separate styling for current calculations, previous operations, and errors
- Custom calculator favicon
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
7. The positive/negative button changes the sign of the currently active
   operand.

## Input Handling

The calculator cleans user input before performing calculations.

- Leading zeros are removed when they are not required.
- Decimal input beginning with `.` is automatically converted to `0.`.
- Only one decimal point is allowed per operand.
- A trailing decimal point is removed before an operation is evaluated.
- The `DEL` button removes the latest part of the current input.
- Completed results are locked to prevent accidental deletion.
- The `±` button switches the sign of the current operand.

## Keyboard Controls

The calculator can also be controlled with the keyboard.

| Key | Action |
| --- | --- |
| `0` – `9` | Enter numbers |
| `.` | Decimal point |
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division |
| `=` | Calculate result |
| `Backspace` | Delete last input |
| `Delete` | Clear calculator |
| `F9` | Toggle positive/negative |

## Result Formatting

Results are formatted to keep long numbers readable within the calculator
display.

- Decimal results are limited to a maximum of 10 fractional digits.
- Results greater than or equal to `1e9` are displayed using scientific
  notation.

## Error Handling

Division by zero is detected before the calculation is performed.

If a division-by-zero operation is attempted, the calculator displays an error
message and resets the stored operands and operator.

## Remaining Features

Before completing the project, the following feature still needs to be added:

- Percentage (`%`) button functionality

## Built With

- HTML5
- CSS3
- JavaScript
- DOM manipulation
- Flexbox

## Credits

- Calculator favicon provided by [Icons8](https://icons8.com/)

## Project Status

Work in progress.

The main calculator functionality is complete, including arithmetic operations,
sequential calculations, decimal input, input cleanup, result formatting,
deletion, clearing, positive/negative input, keyboard controls, and
division-by-zero handling.

The remaining work focuses on implementing the percentage function.