class Calculator {
    static calculateAmount(type, audience) {
        let amount = 0
        switch (type) {
            case 'tragedy':
                amount = Calculator.calculateTragedyAmount(audience)
                break;
            case 'comedy':
                amount = Calculator.calculateComedyAmount(audience)
                break;
            default:
                throw new Error(`unknown type: ${type}`);
        }
        return amount
    }

    static calculateTragedyAmount(audience) {
        let amount = 40000;
        if (audience > 30) {
            amount += 1000 * (audience - 30);
        }
        return amount
    }

    static calculateComedyAmount(audience) {
        let amount = 30000;
        if (audience > 20) {
            amount += 10000 + 500 * (audience - 20);
        }
        amount += 300 * audience;
        return amount
    }

    static calculateVolumeCredits(type, audience) {
        let volumeCredits = Math.max(audience - 30, 0);
        if ('comedy' === type) volumeCredits += Math.floor(audience / 5);
        return volumeCredits
    }
}

module.exports = Calculator
