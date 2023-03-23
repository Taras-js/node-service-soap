const jsonxml = require("jsontoxml");
const parseString = require("xml2js").parseString;
const { promisify } = require("util");

const promisifiedParseString = promisify(parseString)

module.exports = class Parser {

    static parseJSONBodyToXML(jsonArgument) {
        return jsonxml(jsonArgument, {html: true});
    }

    static convertXMLToJSON(xmlMessage) {
        const options = {trim: true, explicitArray: false, explicitRoot: false, ignoreAttrs: true};
        return promisifiedParseString(xmlMessage, options);
    }
};
