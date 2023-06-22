CaesarUtil = {
  CaesarEncryption: (str, offset) => {
    // console.log(str, offset)
    if (str == null) {
      return "";
    }
    if (isNaN(offset)) {
      offset = 0
    }
    // console.log(str, offset)
    let res = "";
    for (let i = 0; i < str.length; i++) {
      let char = str[i];
      let code = str.charCodeAt(i);
      // console.log(char, code)

      if (code >= 65 && code <= 90) {

        res += String.fromCharCode(((code - 65 + offset) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        res += String.fromCharCode(((code - 97 + offset) % 26) + 97);
      } else if (code >= 48 && code <= 57) {
        res += String.fromCharCode(((code - 48 + offset) % 10) + 48);
      } else {
        res += str.charAt(i);
      }

    }
    return res;
    return Math.random();
  },
  CaesarDecrypt: (str, offset) => {

    // console.log(str, offset)
    if (str == null) {
      return "";
    }
    if (isNaN(offset)) {
      offset = 0
    }
    // console.log(str, offset)

    let res = "";
    for (let i = 0; i < str.length; i++) {
      let char = str[i];
      let code = str.charCodeAt(i);
      // console.log(char, code)

      if (code >= 65 && code <= 90) {

        res += String.fromCharCode(((code - 65 - offset) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        res += String.fromCharCode(((code - 97 - offset) % 26) + 97);
      } else if (code >= 48 && code <= 57) {
        res += String.fromCharCode(((code - 48 - offset) % 10) + 48);
      } else {
        res += str.charAt(i);
      }

    }
    return res;

  }


};
