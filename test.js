const axios = require('axios');
const express = require('express');
const app = express();
const port = 8082;
const cors = require('cors');

async function getCurrentSong(res,number) {
    const response = await axios.get(`https://www.eska.pl/api/mobile/station/${number}/now_playing`)
    if (response.status === 200) {
        //console.log(response.data[3])
        var endTime = new Date(response.data[3].end_time)
        var now = new Date(Date.now())
        if (endTime <= now) {
            res = response.data[2]
        }else{
           res = response.data[3]
        }

        return res
        // res.status(200).json({ name, artists, image });
    } else {
        console.error("Something went wrong");
    }

}
app.use(cors());

app.listen(port, () => {
    console.log('Server Works !!! At port %d', port);
});

app.get('/test', async (req, res) => {
    var radio = req.query.radio
    console.log(radio)
    var response = await getCurrentSong(response,radio)
    // response = response.data
    res.send(response);
    // res.status(200).json({ "ok":"ok" });
    // res.status(200).json({ 'test': "ok" });
});