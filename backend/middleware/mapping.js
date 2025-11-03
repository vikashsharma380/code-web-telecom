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
  "105": "22", // JHARKHAND
  "104": null, // MIZZORAM
  "103": null, // MEGHALAYA
  "102": null, // GOA
  "101": "27", // CHHATISGARH
  "100": null, // TRIPURA
  "99": null,  // SIKKIM
  "49": "13",  // ANDHRA PRADESH
  "95": "14",  // KERALA
  "94": "8",   // TAMIL NADU
  "40": "7",   // CHENNAI
  "06": "9",   // KARNATAKA
  "52": "17",  // BIHAR
  "16": "26",  // NORTH EAST
  "56": "24",  // ASSAM
  "53": "23",  // ORISSA
  "51": "2",   // WEST BENGAL
  "31": "6",   // KOLKATTA
  "70": "18",  // RAJASTHAN
  "93": "16",  // MP
  "98": "12",  // GUJARAT
  "90": "4",   // MAHARASHTRA
  "92": "3",   // MUMBAI
  "54": "10",  // UP(EAST)
  "55": "25",  // J&K
  "96": "20",  // HARYANA
  "03": "21",  // HIMACHAL PRADESH
  "02": "1",   // PUNJAB
  "97": "11",  // UP(WEST)
  "10": "5"    // DELHI
};

function mapOperator(apiOperatorCode) {
  return operatorMapping[apiOperatorCode] || null;
}

function mapCircle(apiCircleCode) {
  return circleMapping[apiCircleCode] || null;
}

module.exports = {
  mapOperator,
  mapCircle,
};
