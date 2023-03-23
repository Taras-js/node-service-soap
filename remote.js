const Formatter = require("./formatter");
const ApiClient = require("axios"); // Any API Client implementation. Can be axios
const Parser = require("./parser");
const { parseString } = require("xml2js");

const url = `http://www.dneonline.com/calculator.asmx`;

module.exports = class Remote {
    static async multipleTwoOperands(operandA, operandB) {
        try {
            let payload = {
                Multiply: {
                    intA: operandA,
                    intB: operandB,
                },
            };

            const headers = {
                headers: {
                    "Content-Type": "text/xml; charset=utf-8",
                    SOAPAction: "http://tempuri.org/Multiply",
                },
            };

            let args = Formatter.convertJsonToSoapRequest(payload);
            let remoteResponse = await ApiClient.post(url, args, headers);
            console.log(remoteResponse.data)
            let xml = remoteResponse.data
            parseString(xml, function (err, result) {
                return console.log("result:", result);
            });
            remoteResponse = Parser.convertXMLToJSON(remoteResponse.data);
            console.log(remoteResponse, typeof remoteResponse);


        } catch (err) {
            throw new Error(
                `Oops something went wrong. Please try again later ${JSON.stringify(
                    err
                )}`
            );
        }
    }
};
