const senha = document.getElementById("senha");
const toggle = document.getElementById("toggleSenha");

  toggle.addEventListener("click", () => {
    if (senha.type === "password") {
      senha.type = "text";
    } else {
      senha.type = "password";
    }
  });
