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

function modalBanner() {
  var modal = document.getElementById("myModal");

  if (!localStorage.getItem("newUser")) {
    window.addEventListener("load", openModal);
  }  

  function openModal() {
    modal.style.display = "block";	
  }
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

modalBanner();
loadHeaderFooter();
