const registerButton = document.getElementById("register");
const loginButton = document.getElementById("login");
const container = document.getElementById("container");

registerButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

loginButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

const togglePasswordIcons = document.querySelectorAll(".toggle-password");

togglePasswordIcons.forEach(icon => {
  icon.addEventListener("click", () => {
    const targetId = icon.getAttribute("data-target");
    const input = document.getElementById(targetId);

    if (input.type === "password") {
      input.type = "text";
      icon.classList.remove("lni-eye-alt");
      icon.classList.add("lni-eye-inverse");
    } else {
      input.type = "password";
      icon.classList.remove("lni-eye-inverse");
      icon.classList.add("lni-eye-alt");
    }
  });
});