import http from 'k6/http';
import { sleep } from 'k6';
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

const JWT_TOKEN = "Bearer Frgr_YvzntMuZeiVp-z64QhiI8GDLtVXPU7T7AG2xQ4lDFO3ye1Bw3";

export const options = {
    vus: 100,
    duration: '40m',
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default async function () {
    const payload = JSON.stringify({
        "events": [
            {
                "eventName": `Test${getRandomInt(1, 50)}`,
                "data": {
                    "param1": "param1",
                    "param2": "param2",
                    "param3": "param3",
                    "param4": "param4",
                    "param5": "param5"
                }
            }
        ],
        "id": uuidv4(),
    });
    const headers = { 'Content-Type': 'application/json', 'Authorization': JWT_TOKEN };
    http.post('https://pgljvu2ilk.execute-api.ap-south-1.amazonaws.com/event', payload, { headers });
    sleep(5);
}
