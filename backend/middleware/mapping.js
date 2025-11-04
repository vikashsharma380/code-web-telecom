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
function mapElectricityOperator(code) {
  const map = {
    "479": "TPEA",
    "478": "MNPD",
    "461": "NPTL",
    "460": "SPTL",
    "442": "JKPD",
    "441": "CED",
    "440": "TPSO",
    "438": "BRP",
    "437": "APR",
    "436": "DAP",
    "435": "IPCL",
    "434": "SBPDCL",
    "433": "TPDL",
    "432": "DVVNL",
    "431": "MVVNL",
    "427": "PVVNL",
    "425": "PUVVNL",
    "148": "WBSEDCL",
    "146": "AVVNL",
    "145": "APCPDCL",
    "144": "APEPDCL",
    "143": "APSPDCL",
    "142": "BESCOM",
    "141": "BHARATPUR",
    "140": "BIKANER",
    "139": "BYPL",
    "138": "LED",
    "137": "DHBVN",
    "136": "DNHPDCL",
    "135": "GESCOM",
    "133": "SPURBAN",
    "132": "TPB",
    "131": "JUSCO",
    "130": "KOTA",
    "129": "MKMP",
    "128": "MEPDCL",
    "127": "MSEDCL",
    "124": "MUZAF",
    "123": "NBPDCL",
    "122": "NOIDA",
    "121": "PKMP",
    "120": "PSPCL",
    "119": "GOAED",
    "118": "UPCL",
    "117": "SOUTHCO",
    "116": "TPM",
    "115": "TNEB",
    "114": "TPADL",
    "112": "TSECL",
    "111": "UGVCL",
    "110": "UPPCL",
    "95": "AJMER",
    "92": "ODISHA",
    "91": "MESCOM",
    "90": "DD",
    "89": "JBVNL",
    "88": "CESU",
    "87": "NDMC",
    "86": "UHBVN",
    "85": "TPAGRA",
    "84": "APDCL",
    "79": "JDVVNL",
    "78": "JVVNL",
    "76": "PKRMP",
    "75": "PGVCL",
    "74": "DGVCL",
    "73": "MGVCL",
    "69": "KSEBL",
    "61": "HPSEB",
    "60": "HESCOM",
    "59": "CSEB",
    "58": "CESCWB",
    "57": "CESCOM",
    "56": "TPSURAT",
    "55": "MKUM",
    "54": "PKUM",
    "53": "TPGEN",
    "52": "KESCO",
    "51": "PUDUCHERRY",
    "50": "ADANI",
    "49": "MIZORAM",
    "48": "SPRR",
    "47": "UPPCL",
    "46": "WESCO",
    "45": "NAGALAND",
  };
  return map[code] || null;
}

module.exports = { mapOperator, mapCircle, mapDTHOperator, mapElectricityOperator };
