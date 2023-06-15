import { loadHeaderFooter } from "./utils.mjs";

document.getElementById("newsletter").addEventListener("click", () => signUp());

function signUp() {
  let email = prompt(
    "Enter your email address to sign up for our newsletter: "
  );
  if (email === null) {
    prompt.close();
  } else if (email == "") {
    alert("Please enter an email address");
    signUp();
  } else if (/^[^@]+@\w+(\.\w+)+\w$/.test(email) == false) {
    alert("Please enter a valid email address");
    signUp();
  } else if (/^[^@]+@\w+(\.\w+)+\w$/.test(email)) {
    alert(`Successfully signed up with email ${email}`);
  }
}

loadHeaderFooter();
