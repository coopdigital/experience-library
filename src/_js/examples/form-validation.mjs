// import '@coopdigital/foundations-forms/src/examples/validation-demo.mjs';

// const password = document.getElementById('validation-demo-password');


// // Validate on submit
// form.addEventListener('submit', async (event) => {
//    event.preventDefault();

//   // Password, validate
//   validate(password, {
//     required: 'Enter your password',
//     invalid: 'Enter a valid password',
//   });
//   // Password, validation summary link
//   if (password.validity.customError) {
//     errors.push({
//       id: password.id,
//       message: password.validationMessage.toLowerCase(),
//     });
//   }

// });

import { reset as buttonReset, loading as buttonLoading } from '@coopdigital/foundations-buttons/src/buttons.mjs';
import { validate } from '@coopdigital/foundations-forms/src/validation/index.mjs';
import ValidationSummary from '@coopdigital/foundations-forms/src/validation/summary/index.mjs';

// Form elements
const form = document.getElementById('validation-demo');
const fullName = document.getElementById('validation-demo-name');
const emailAddress = document.getElementById('validation-demo-email');
const password = document.getElementById('validation-demo-password');
const button = form.querySelector('button');

// Validation summary
const summary = new ValidationSummary('validation-demo-box');

// Validate on submit
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Prevent double submit
  if (form.dataset.busy) {
    return;
  }

  const errors = [];

  // Full name, validate
  validate(fullName, {
    required: 'Enter your full name',
    invalid: 'Enter a valid full name',
  });

  // Full name, validation summary link
  if (fullName.validity.customError) {
    errors.push({
      id: fullName.id,
      message: fullName.validationMessage.toLowerCase(),
    });
  }

  // Email address, validate
  validate(emailAddress, {
    required: 'Enter your email address',
    invalid: 'Enter a valid email address',
  });

  // Email address, validation summary link
  if (emailAddress.validity.customError) {
    errors.push({
      id: emailAddress.id,
      message: emailAddress.validationMessage.toLowerCase(),
    });
  }

// Password, validate
  validate(password, {
    required: 'Enter your password',
    invalid: 'Enter a valid password',
  });
  
  // Password, validation summary link
  if (password.validity.customError) {
    errors.push({
      id: password.id,
      message: password.validationMessage.toLowerCase(),
    });
}

  // Show or clear errors
  if (errors.length) {
    summary.setErrors(errors);
  } else {
    summary.reset();

    // Pretend to submit
    form.dataset.busy = true;
    await buttonLoading(button);

    // Reset button
    setTimeout(async () => {
      await buttonReset(button);
      delete form.dataset.busy;
    }, 3000);
  }
});
