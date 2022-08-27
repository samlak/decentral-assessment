const path = require("path");
const ip = require("ip");
const keygen = require("ssh-keygen");
const fs = require("fs");

const track = async (req, res) => {
    const userIpAddress = ip.address();
    const formattedIpAddress = userIpAddress.replace(/\./g, "-");
    const location = path.join(
        __dirname,
        "..",
        "data",
        `${formattedIpAddress}_rsa`
    );
    const password = "someStringOfCharacter";
    const format = "PEM";
    const keygenOptions = {
        location: location,
        password: password,
        read: true,
        format: format,
    };
    let ipAddressExisted = false;

    const trackingFileLocation = "./data/tracking.json";
    const trackingData = JSON.parse(
        fs.readFileSync(trackingFileLocation, "utf8")
    );

    for (const key in trackingData) {
        if (trackingData[key].ipAddress == userIpAddress) {
            ipAddressExisted = true;
        }
    }
    if (!ipAddressExisted) {
        keygen(keygenOptions, function (err, out) {
            if (err) return console.log("Something went wrong: " + err);
            const userData = { ipAddress: userIpAddress, ...req.body };
            trackingData[out.pubKey] = userData;
            fs.writeFileSync(
                trackingFileLocation,
                JSON.stringify(trackingData)
            );
        });
    }

    res.send({
        message: "Tracked successfully",
    });
};

const getIpAddress = async (req, res) => {
    const userIpAddress = ip.address();
    res.send({
        ipAddress: userIpAddress,
    });
};

module.exports = { track, getIpAddress };
