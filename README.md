# Calculator

A browser-based calculator built as part of [The Odin Project](https://www.theodinproject.com/lessons/foundations-calculator) Foundations curriculum.

The project combines arithmetic operations with decimal input, percentage calculations, keyboard controls, chained calculations, input cleanup, and error handling. It was built with plain HTML, CSS, and JavaScript.

## Features

- Addition, subtraction, multiplication, and division
- Chained calculations without pressing the equals button first
- Replacement of an operator before the second number is entered
- Decimal input with protection against multiple decimal points
- Percentage calculations based on the selected operator
- Positive and negative number toggle
- Backspace and all-clear controls
- Keyboard support
- Input limited to 15 digits to reduce precision problems
- Automatic removal of unnecessary leading and trailing zeros
- Large and very small results displayed in scientific notation
- Rounded display output with up to 10 decimal places
- Protection against division by zero and non-finite results
- Separate displays for the current calculation and previous expression

## Percentage behavior

The percentage button behaves similarly to a traditional calculator when it is used for the second number:

| Calculation | Result | Behavior |
| --- | ---: | --- |
| `200 + 10%` | `220` | Adds 10% of 200 |
| `200 - 10%` | `180` | Subtracts 10% of 200 |
| `200 × 10%` | `20` | Multiplies by 0.10 |
| `200 ÷ 10%` | `2000` | Divides by 0.10 |

When the first number contains a percent sign, it is converted directly into its decimal factor. For example, `10% × 200` becomes `0.10 × 200`.

## Controls

The calculator can be controlled with the buttons on the page or with a keyboard.

| Action | Keyboard input |
| --- | --- |
| Enter a number | `0`–`9` |
| Add | `+` |
| Subtract | `-` |
| Multiply | `*` |
| Divide | `/` |
| Add a decimal point | `.` |
| Apply a percentage | `%` |
| Calculate the result | `Enter` or `=` |
| Delete the last input | `Backspace` |
| Clear the calculator | `Delete` |
| Toggle the sign | `F9` |

## Built with

- HTML5
- CSS3
- JavaScript
- DOM manipulation and event listeners
- Git and GitHub

## How it works

The current calculation is stored in a central state object containing the first number, second number, selected operator, current result, and display state.

Numbers remain strings while the user is entering them. This makes it possible to preserve values such as `0.`, remove individual characters, append a percent sign, and clean up unused zeros before calculating. The values are converted into numbers only when an operation is performed.

Results remain unformatted internally so they can be used in later calculations without losing additional precision. Formatting is applied only when a value is shown on the display.

## Error handling

The calculator displays an error message and resets its calculation state when:

- A number is divided by zero
- A calculation produces `Infinity`, `-Infinity`, or `NaN`

## Run locally

1. Download or clone the repository.
2. Open the project folder.
3. Open `index.html` in a browser.

For development, the project can also be opened with a local development server such as the VS Code Live Server extension.

## Project structure

```text
.
├── index.html
├── style.css
├── javascript.js
└── README.md
```

## What I learned

This project helped me practise:

- Separating user input, calculation logic, and display output
- Managing application state across multiple button presses
- Working with DOM events from both mouse and keyboard input
- Handling floating-point formatting and JavaScript number limits
- Cleaning and validating string-based number input
- Breaking a larger problem into smaller reusable functions
- Testing edge cases such as division by zero, percentages, decimals, and long inputs

## Credits

- Project specification: [The Odin Project – Calculator](https://www.theodinproject.com/lessons/foundations-calculator)
- Calculator favicon: [Icons8](https://icons8.com/icon/qrOXrfUDKkOX/calculator)

## License

This project was created for educational purposes.