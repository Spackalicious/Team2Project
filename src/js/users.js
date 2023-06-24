import { loadHeaderFooter, alertMessage, getParam } from "./utils.mjs";
import { createUser } from "./externalServices.mjs";

const redirect = getParam("redirect");

const userForm = document.querySelector(".user-form-div");

userForm.addEventListener("submit", event => {
    event.preventDefault();
    const userFormData = new FormData(userForm);
    const userData = Object.fromEntries(userFormData);
    // console.log(userData);

    if(redirect !== null) {
        createUser((userData), redirect);
    } else {
        createUser(userData);
        alertMessage(`User ${userData.email} successfully created`);
    }
});

loadHeaderFooter();