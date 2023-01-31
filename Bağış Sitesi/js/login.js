const isLogin = () => {
  if (localStorage.getItem('user')) {
    alert("Zaten giriş yaptınız...");
    window.location.replace('/');
  }
}
isLogin();//Kullanıcının giriş yapıp yapmadığını kontrol ediyoruz

const loginForm = document.getElementById("Login");
const loginEmail = document.getElementById("loginEmail");
const loginDomain = document.getElementById("loginDomain");
const loginPassword = document.getElementById("loginPassword");

const loginUser = {
  email: [],
  password: [],
  domain: [],
};

loginEmail.addEventListener("keyup", (e) => {
  e = loginControlKey(e, loginUser.email);
  e ? loginUser.email.push(e.key) : null;
});

loginDomain.addEventListener("keyup", (e) => {
  e = loginControlKey(e, loginUser.domain);
  e ? loginUser.domain.push(e.key) : null;
});

loginPassword.addEventListener("keyup", (e) => {
  e = loginControlKey(e, loginUser.password);
  e ? loginUser.password.push(e.key) : null;
});

const loginControlKey = (e, modal) => {
  if (e.key === "Backspace") {
    modal.pop();
    return;
  }

  if (
    e.key === "Shift" ||
    e.key === "Tab" ||
    e.key === "Enter" ||
    e.key === "Control" ||
    e.key === "AltGraph"
  ) {
    return;
  }

  return e;
};

const signIn = async () => {
    const {data} = await axios.post(
      "http://localhost:5000/users/signIn",
      {
        email: `${loginUser.email.join("")}@${loginUser.domain.join("")}`,
        password: loginUser.password.join(""),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
    if(data.error)  return alert(data.error.message);

    localStorage.setItem('user', JSON.stringify(data));
    alert("Giriş Başarılı");
    window.location.replace("/");
    return;
  };