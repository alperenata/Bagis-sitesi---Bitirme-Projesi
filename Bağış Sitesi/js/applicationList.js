const body = document.querySelector('body');

const scholarshipType = document.getElementById("scholarshipType");

const scholar = {
    type: "öğrenci",
    iban: "",
    price: "",
    description: "",
    document: [],
}

const scholarChange = () => {
    scholar.type = scholarshipType.options[scholarshipType.selectedIndex].value
    filterData(scholar.type);
    return;
}

const getApplicationList = async () => {
    const {data} = await axios.get("http://localhost:5000/application/");

    data.reverse();
    data.filter(item => {
        showItem(item);
    })


    console.log(data);
}

const showItem = async (item) => {
    if (!item.paid && item.show) {
        const card = document.createElement("div");
        card.classList.add("card")

        const cardImage = document.createElement("div");
        cardImage.classList.add("card-image");
        card.appendChild(cardImage);

        const cardText = document.createElement("div");
        cardText.classList.add("card-text");

        const date = document.createElement("span");
        date.classList.add("date");

        const title = document.createElement("h2");
        title.innerHTML = item.userId.fullName.split(' ')[0][0]?.toUpperCase() + "**** " + item.userId.fullName.split(' ')[1][0]?.toUpperCase() + "****";

        const text = document.createElement("p");
        text.innerHTML = item.description;
        cardText.appendChild(title);
        cardText.appendChild(text);
        card.appendChild(cardText);

        const cardStats = document.createElement("div");
        cardStats.classList.add("card-stats");
        const stat = document.createElement("div");
        stat.classList.add("stat");

        const value = document.createElement("div");
        value.classList.add("value");
        value.innerHTML = item.category[0].toUpperCase() + item.category.slice(1,item.category.length);

        const type = document.createElement("div");
        type.classList.add("type");
        type.innerHTML = "BURSU";

        stat.appendChild(value);
        stat.appendChild(type);

        const statBorder = document.createElement("div");
        statBorder.classList.add("stat");
        statBorder.classList.add("border");
        const statValue = document.createElement("div");
        statValue.classList.add("value");
        statValue.innerHTML = "Burs";

        const statType = document.createElement("div");
        statType.classList.add("type");
        statType.innerHTML = item.price + " ₺";

        statBorder.appendChild(statValue);
        statBorder.appendChild(statType);


        const secondStat = document.createElement("div");
        secondStat.classList.add("stat");

        secondStat.onclick = () => window.location.replace("/odeme.html?id=" + item._id);

        const secondValue = document.createElement("div");
        secondValue.classList.add("value");
        secondValue.innerHTML = "Bağış";
        const secondType = document.createElement("div");
        secondType.classList.add("type");
        secondType.innerHTML = "Yap";

        secondStat.appendChild(secondValue);
        secondStat.appendChild(secondType);

        cardStats.appendChild(stat);
        cardStats.appendChild(statBorder);
        cardStats.appendChild(secondStat);
        card.appendChild(cardStats);

        body.appendChild(card);


    }
}

getApplicationList();

const filterData = async (type) => {
    const {data} = await axios.get("http://localhost:5000/application/");
    let count = 0;
    body.childNodes.forEach(item => {
        item.nodeName === 'DIV' ? count += 1 : count;
    })

    for (let i = 0; i < count; i++) {
        body.removeChild(body.lastChild)
    }
    if (scholar.type !== 'all') {
        data.filter((item) => {
            if (item.category === scholar.type && !item.paid && item.show) {
                showItem(item);
            }
        })
    } else {
        data.filter((item) => {
            if (!item.paid && item.show) {
                showItem(item);
            }
        })
    }
    const modal = type.split('_')[0];
    const plusMinus = type.split('_')[1];

    if (modal === 'reverse' && plusMinus === 'increase') {
        data.filter((item) => {
            if (!item.paid && item.show) {
                showItem(item);
            }
        })
    }
    if (modal === 'reverse' && plusMinus === 'decrease') {
        data.reverse();
        data.filter((item) => {
            if (!item.paid && item.show) {
                showItem(item);
            }
        })
    }
    if (modal === 'price' && plusMinus === 'increase') {
        data.sort((a,b) => a.price - b.price)
        data.filter((item) => {
            if (!item.paid && item.show) {
                showItem(item);
            }
        })
    }
    if (modal === 'price' && plusMinus === 'decrease') {
        data.sort((a,b) => b.price - a.price)
        data.filter((item) => {
            if (!item.paid && item.show) {
                showItem(item);
            }
        })
    }
    console.log(scholar.type);

}

const sortApplication = async (type) => {
    const {data} = await axios.get("http://localhost:5000/application/");
    data.reverse();

    console.log(modal, plusMinus, data);
}