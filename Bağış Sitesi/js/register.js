const registerForm = document.getElementById("Register");//Kullanıcıya ait bilgilerileri aldık bunları sunucuya istek attık, gelen cevaba göre kayıt başarılı veya ilgili hatayı kullanıcıya gösterdik
const fullName = document.getElementById("fullName");
const password = document.getElementById("password");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const domain = document.getElementById("domain");

const user = {
  fullName: [],
  password: [],
  email: [],
  phone: [],
  domain: [],
};

fullName.addEventListener("keyup", (e) => {
  e = controlKey(e, user.fullName);
  e ? user.fullName.push(e.key) : null;
});
password.addEventListener("keyup", (e) => {
  e = controlKey(e, user.password);
  e ? user.password.push(e.key) : null;
});
email.addEventListener("keyup", (e) => {
  e = controlKey(e, user.email);
  e ? user.email.push(e.key) : null;
});
phone.addEventListener("keyup", (e) => {
  e = controlKey(e, user.phone);
  e ? user.phone.push(e.key) : null;
});
domain.addEventListener("keyup", (e) => {
  e = controlKey(e, user.domain);
  e ? user.domain.push(e.key) : null;
});

const controlKey = (e, modal) => {
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

const signUp = async () => {
  const res = axios.post(
    "http://localhost:5000/users/signUp",
    {
      fullName: user.fullName.join(""),
      password: user.password.join(""),
      email: `${user.email.join("")}@${user.domain.join("")}`,
      phone: user.phone.join(""),
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  res
    .then((respone) => {
      console.log(respone.data);
      if(respone.data.error) {
        return alert(respone.data.error);
      }
      alert("Kayıt başarılı...");
      return;
    })
    .catch((err) => {
      err.response.data.error.message
        ? alert(err.response.data.error.message)
        : alert(err.response.data.error);
      return;
    });
};
