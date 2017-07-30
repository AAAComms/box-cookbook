const express = require('express');
const app = express();
const winston = require('winston');
const BoxSDK = require('box-node-sdk');

// Set the Box SDK
let sdk = new BoxSDK({
    clientID: 'e2pac3zezkylgjeyr47mjt2k16gy0p2x',
    clientSecret: 'OHGxTnXtfJuCyvaHK06h1QNURU4XVftg',
    appAuth: {
        keyID: 'ixfm8ukd',
        privateKey: '-----BEGIN ENCRYPTED PRIVATE KEY-----\nMIIFDjBABgkqhkiG9w0BBQ0wMzAbBgkqhkiG9w0BBQwwDgQIrgYsfSfCqu8CAggA\nMBQGCCqGSIb3DQMHBAgR/ECtZuo38gSCBMgrzIP8nj4ozxThx+9JX663MOIwCm3D\nM0W/durj25YgCmEE6L2RpqQnBq2sCK4dCdyClfP7i9C5Drb5QLY6srnkf2+capeM\nHuD9CJV7OBZU4TLpzPbXdkGSiIoHcze0+djRfuvhLtchdPaDiSfr5nbv4ZPsIP+2\n7lZeEnRdEZT/JB0BapVjGEJfUwgVLTpq6dkDbc0uhabUt4BHQw7l/izE8EThLgjB\niXk1lUO7e8ix/xCuhM3CPpxYDULWWE1PqiWpvlnUgJD0yJ0+Ulrk/QOarjVi/qsa\nZFUCgCJpv5xW+IEBBX1QbJF6MWfPLe6XtMnO9ZZ0+aQ81HiiYW9HYsAN54CkYcTA\nrqH7ruXgz6fwGrxj2yqwu6B5x0hzeinov6dEftGMQW/5sd6sT6UXiFsdbXa8Fl+a\nhLRjVI4y10rVPry2cRJ04Hrr2Mb++dCAlJRe7uOqmsh0EgpDBJNq8sPks/S+008k\nSm3liWTHVM5iyiSe7nq3Ir4//WeyRcfFYAuuZgSCW7CiD/jZ0gePbMSQEv3rGHUm\nX/0njeyHhnj0eikBp4XD/DojRaS68ac6C9XG8dK7vG+MfQZqj7/ZeohvYLEllK5K\nLJjVFEBSTeWunM0cK2guuRTuPT4tOls7OSDHuctKUS+AFiwmSf5+VKstcDYcfBIw\n/Xpu3kutNwwcOlMFxqKFU57Z5aDqrfTeeAEYNSWOE3du7F/whJizdqAOCznsmgKV\nfXBpgNRpaflOEQO83zOPPhC0Ki3dxJ7kF2cZU1Qnt2uadMo7rZM7Yf6elo5wVdnw\npAaK//8Od/x4hemECMcFnryCogEtY+BXUEjMqc+F6AbmkqKaw6W2tRecxjc84Jv3\nEnHuUY5kjxgr46OUECmy6WoYrA3KyaXQNqdKJdX5OM/+HoHFXzG/pUWG8W+vNm91\ncAdYTdziUaiQI0lr5+zoCOswPFzI6Bq1b5IMUrafZ5xL9NiJjJeLBX7f6EZY5Y7j\nTQJK/l/swWjr1priJdFTD2fua1yUu5K5Kh7PehY3gQf8hr40IHFFHNeo4+qHGONn\nejRrKgantFZsTHmH3qXzoEd+DMDEFIanbn4sYdD4R/zgvHKiV1BN8NfuUIOCqPOT\nww6umNu3kbQzg7xs/S5sqsmKcV6jAePKiukVdxMEf4O9juiC8E9T8tT9FoDVKIaF\nYt9ncORRqFpgWLD0Dw8+vGAZlFl5VwZiQZrX7+83yN/OXbP8MT3hUvNhaajoGlIo\nDTLyAvTPwWoEY89B781nHO/pgfeo3eZMqWBh21W8JeSesBjE4tBPSwf8XBBoHH4H\nWq3BtBSPTXa/UqhEKS2+a3+oaQAiSkmh0y4Zt+HiGOb3+7WyTostbhasgi3xLzMz\nwsPq617K6aZC6577Dr2q1GGUHR73eiE0Zr20CRntK2YphNaIxFA2BCQC9EWLMPHS\nl9ek7H/eAqtkX8j8e9VWFvPgTaYuj2KywAiIy0L4CLVPRXYySQaiXGOLJ5pJt5TM\n4fDddZO/vi5H/jkdVezkjdWzuMbL4LvWuWBygsXfvScAAj1aHMsnwGXd4yJCrBV9\nF4Rp70X7+KunhxQFGzdF2e1WipzDS77Be2tMJg3mBUqSItqqXsdlMDQvZAz10BX/\n2Is=\n-----END ENCRYPTED PRIVATE KEY-----\n',
        passphrase: '2a7e78a52e2ec5c0103879ee1cef30f8'
    }
});

// Use a single SDK client for the app admin, which will perform all operations
// around user management
let adminAPIClient = sdk.getAppAuthClient('enterprise', '24824756');

app.route("/api/createuser").get(createUser);
app.route("/api/deleteuser").get(deleteUser);

function createUser(req, res) {
    let requestParams = {
        body: {
            name: 'example@example.com',
            is_platform_access_only: true
        }
    };
    adminAPIClient.post('/users', requestParams, adminAPIClient.defaultResponseHandler(function(err, data) {
        if (err) {
            winston.log('error', JSON.stringify(data, null, 2));
            return res.sendStatus(500);
        } else {
            winston.log('info', JSON.stringify(data, null, 2));
            return res.sendStatus(200);
        }
    }));
}

function deleteUser(req, res) {
    let requestParams = {
        body: {
            name: 'example@example.com'
        }
    };

    adminAPIClient.get('/users', requestParams, adminAPIClient.defaultResponseHandler(function (err, data) {
        data.entries.forEach(function(user) {
            let requestParams = {
                body: {
                    id: user.id
                }
            };

            adminAPIClient.del('/users/' + user.id, requestParams, adminAPIClient.defaultResponseHandler(function (err, data) {
                winston.log('info', JSON.stringify('user deleted', null, 2));
                if (err) {
                    return res.sendStatus(500);
                }
            }));
        });
        return res.sendStatus(200);



    }));
}



app.listen(3000);

module.exports = app;