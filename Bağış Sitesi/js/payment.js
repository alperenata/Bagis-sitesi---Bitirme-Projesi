const queryString = window.location.search.split('=')[1];

const paid = async () => {
    const {data} = await axios.post(
        "http://localhost:5000/application/update",
        {
            _id: queryString,
            paid: true,
            show: true,
        }
      );
    window.location.assign("/bursistek.html");
}