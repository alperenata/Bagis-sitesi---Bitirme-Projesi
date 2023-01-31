const isLogin = () => {
    if (!JSON.parse(localStorage.getItem('user'))) {
        alert('Giriş Yapmanız gerekmektedir...');
        window.location.replace("/uyelik.html");
    }
}
isLogin();

const formData = new FormData();
const applicationForm = document.getElementById("Burs");
const scholarshipType = document.getElementById("scholarshipType");//Burs başvurusunun yapıldığı yer

const scholar = {
    type: "öğrenci",
    iban: "",
    price: "",
    description: "",
    document: [],
}

const scholarChange = () => {
    scholar.type = scholarshipType.options[scholarshipType.selectedIndex].value
    return;
}

const getIban = (value) => {
    scholar.iban = value;
    return;
}

const getPrice = (value) => {
    scholar.price = value;
    return;
}

const getDescription = (value) => {
    scholar.description = value;
    return;
}

const getFile = () => {
    const file = document.querySelector("#document");
    scholar.document.push(file.files[0]);
    return;
}

const addApplication = async () => {
    if(scholar.type.length <= 0 || scholar.iban.length !== 16 || scholar.price.length <= 0 || scholar.document.length <= 0 || scholar.description.length <= 0) {
        console.log(scholar);
        alert('Alanlar Doldurulmalıdır ve iban 16 karakter olmalıdır.');
        return;
    }

    const token = JSON.parse(localStorage.getItem('user')).tokens?.accessToken;
    formData.append('iban', scholar.iban.toString());
    formData.append('price', scholar.price);
    formData.append('category', scholar.type);
    formData.append('description', scholar.description);
    formData.append('document', scholar.document[0]);
    const {data} = await axios.post(
        "http://localhost:5000/application/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": "Bearer " + token,
          },
        }
      );

      if (data?.userId) {
          alert("Kaydınız alınmıştır.");
          window.location.replace("/bursistek.html");
      }

    return;
}