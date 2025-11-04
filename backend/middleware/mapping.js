// middleware/mapping.js

// PLAN API → internal operator code mapping
const operatorMapping = {
  "2": "A",   // Airtel
  "23": "V",  // Vodafone
  "4": "BT",  // BSNL TOPUP
  "5": "BT",  // BSNL SPECIAL (combined with BT)
  "11": "RC", // Reliance JIO
  "6": "I"    // Idea
};

// PLAN API → internal circle code mapping
const circleMapping = {
  "105": "22",
  "101": "27",
  "49": "13",
  "95": "14",
  "94": "8",
  "40": "7",
  "06": "9",
  "52": "17",
  "16": "26",
  "56": "24",
  "53": "23",
  "51": "2",
  "31": "6",
  "70": "18",
  "93": "16",
  "98": "12",
  "90": "4",
  "92": "3",
  "54": "10",
  "55": "25",
  "96": "20",
  "03": "21",
  "02": "1",
  "97": "11",
  "10": "5"
};

function mapOperator(apiOperatorCode) {
  return operatorMapping[apiOperatorCode] || null;
}

function mapCircle(apiCircleCode) {
  return circleMapping[apiCircleCode] || null;
}

function mapDTHOperator(code) {
  const map = {
    "24": "ATV",   // Airtel DTH
    "25": "DTV",   // Dish TV
    "26": "RTV",   // Reliance BigTV
    "27": "STV",   // Sun Direct
    "28": "TTV",   // Tata Sky
    "29": "VTV"    // Videocon D2H
  };
  return map[code] || null;
}

module.exports = { 
  mapOperator, 
  mapCircle,
  mapDTHOperator
};
