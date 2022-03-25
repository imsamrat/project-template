export const engToBanglaNumber = (num) => {
    const finalEnlishToBanglaNumber={'0':'০','1':'১','2':'২','3':'৩','4':'৪','5':'৫','6':'৬','7':'৭','8':'৮','9':'৯'};

    String.prototype.getDigitBanglaFromEnglish = function() {
        let retStr = this;
        for (const x in finalEnlishToBanglaNumber) {
            retStr = retStr.replace(new RegExp(x, 'g'), finalEnlishToBanglaNumber[x]);
        }
        return retStr;
    };

    const english_number= String(num);

    const bangla_converted_number=english_number.getDigitBanglaFromEnglish();

    return bangla_converted_number;
}
