const body = document.querySelector('body');

const getApplicationList = async () => {
    const {data} = await axios.get("http://localhost:5000/application/");
    console.log(data);
    const groupByShow = data.reduce((group, item) => {
        const { show } = item;
        group[show] = group[show] ?? [];
        group[show].push(item);
        return group;
      }, {});


    groupByShow.false?.map((item) => {
        showItem(item);
    })
    const br = document.createElement('div');
    br.style.width = '100%';
    body.appendChild(br);

    groupByShow.true?.map((item) => {
        showItem(item);
    })


    console.log(data);
}
getApplicationList();

const showItem = async (item) => {
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


            const secondValue = document.createElement("div");
            secondValue.classList.add("value");
            if (item.show) {
                secondValue.innerHTML = "Yayınlandı";

                if(item.paid) {
                    secondValue.innerHTML = "Ödendi";
                }
            }
            else {
                secondValue.innerHTML = "Onayla";
                secondStat.onclick = () => show(item._id);
            }

            secondStat.appendChild(secondValue);

            cardStats.appendChild(stat);
            cardStats.appendChild(statBorder);
            cardStats.appendChild(secondStat);
            card.appendChild(cardStats);
            cardImage.addEventListener('click', async (event) => {
                const check = confirm("Veriyi silmek istiyor musunuz? " + item.description);
                if (check) {
                    await axios.delete("http://localhost:5000/application/"+ item._id);
                    window.location.reload("/bursistekonay.html");
                }
            })
            body.appendChild(card);
}

const show = async (id) => {
    const {data} = await axios.post(
        "http://localhost:5000/application/update",
        {
            _id: id,
            show: true,
        }
      );

    window.location.assign('/bursistekonay.html')
}
