const feedbackCheckbox = document.querySelector(
  ".main__content__form__form-checkbox__checkbox"
);

const feedbackCheckboxInput = document.querySelector(
  ".main__content__form__form-checkbox__checkbox-input"
);
feedbackCheckbox.addEventListener("click", () => {
  console.log("hi");
  feedbackCheckbox.classList.contains(
    "main__content__form__form-checkbox__checkbox_active"
  )
    ? feedbackCheckbox.classList.remove(
        "main__content__form__form-checkbox__checkbox_active"
      )
    : feedbackCheckbox.classList.add(
        "main__content__form__form-checkbox__checkbox_active"
      );
});
console.log(feedbackCheckbox, feedbackCheckboxInput);
