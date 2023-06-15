import { loadHeaderFooter, getParam } from "./utils.mjs";
import { login } from "./auth.mjs"

const redirect = getParam("redirect");

loadHeaderFooter();

document.querySelector("#login-submit").addEventListener("click", () => {
    // const username = document.forms["login"]["username"].value;
    // const password = document.forms["login"]["password"].value;
    const email = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    login({email, password}, redirect);

});