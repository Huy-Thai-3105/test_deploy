
const axios = require("axios");

const feed_key = "aio_bSSt82h4fqXHx2pw1u6dUYaRoibl";
const username = "phatnguyen1604";

const url = "https://io.adafruit.com/api/v2/phatnguyen1604/feeds/nutnhan1/data"

const getLatestData = async () => {
    const { data } = await axios.get(url);
    return data;
}

const createNewData = async () => {
    value = 1
    await axios.post(url, {
      value: 0   
    }, {
      headers: {
        "X-AIO-Key": feed_key
      }
    })
    .then (res =>console.log(res))
    .catch (err => console.log(err))
}

app.get("/data", function(req, res) {
  getLatestData().then(data => res.send(data));
})

app.get("/create", function(req, res) {
  createNewData().then(res.send("success"))
})




- manual