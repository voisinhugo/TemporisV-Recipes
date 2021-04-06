/* global gapi */
import credentials from "./credentials.json";

export const appendToRange = (range, values, callback = () => {}) => {
  const params = {
    spreadsheetId: credentials.spreadsheet_id,
    range,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
  };
  const valueRangeBody = {
    majorDimension: "ROWS",
    values,
  };

  let request = gapi.client.sheets.spreadsheets.values.append(
    params,
    valueRangeBody
  );
  request.then(
    function (response) {
      callback(response.result);
    },
    function (reason) {
      console.error("error: " + reason.result.error.message);
    }
  );
};
