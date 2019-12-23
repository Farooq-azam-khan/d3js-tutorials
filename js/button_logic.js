import { animateFace } from "../examples/createface.js";

window.addEventListener("DOMContentLoaded", () => {
  // reset animation for face
  document
    .querySelector("#face-animation-btn")
    .addEventListener("click", () => {
      animateFace();
      document.getElementById("face-animation-btn").disabled = true;
      setTimeout(() => {
        document.getElementById("face-animation-btn").disabled = false;
      }, 5000);
    });

  // disable btn until animation is done

  document.getElementById("general-pattern-bowl-animation").disabled = true;
  document.getElementById("bowl-animation").disabled = true;
  setTimeout(() => {
    document.getElementById("general-pattern-bowl-animation").disabled = false;
    document.getElementById("bowl-animation").disabled = false;
  }, 3000);
});
