const Performance = require('./performance')
const Calculator = require('./calculator')
const {format} = require('./utils')

class Statement {

    constructor(owner, credits, amount, performances) {
        this.owner = owner
        this.credits = credits
        this.amount = amount
        this.performances = performances
    }

    printText() {
        return `Statement for ${this.owner}\n` +
            this.performances.map(performance => performance.toString() + '\n').join('') +
            `Amount owed is ${format(this.amount)}\n` +
            `You earned ${this.credits} credits \n`
    }

    printHtml() {
        return `<h1>Statement for ${this.owner}</h1>\n` +
            '<table>\n' +
            '<tr><th>play</th><th>seats</th><th>cost</th></tr>' +
            this.performances.map(performance => {
                return ` <tr><td>${performance.name}</td><td>${performance.seats}</td><td>${format(performance.total)}</td></tr>\n`
            }).join('') +
            '</table>\n' +
            `<p>Amount owed is <em>${format(this.amount)}</em></p>\n` +
            `<p>You earned <em>${this.credits}</em> credits</p>\n`
    }

    static instance(invoice, plays) {
        let totalAmount = 0;
        let volumeCredits = 0;
        const performances = []

        for (let perf of invoice.performances) {
            const play = plays[perf.playID];
            let thisAmount = Calculator.calculateAmount(play.type, perf.audience)
            volumeCredits += Calculator.calculateVolumeCredits(play.type, perf.audience)
            totalAmount += thisAmount;
            const performance = new Performance(play.name, thisAmount / 100, perf.audience)
            performances.push(performance)
        }
        return new Statement(invoice.customer, volumeCredits, totalAmount / 100, performances)
    }
}

function statement(invoice, plays) {
    return Statement.instance(invoice, plays).printText()
}


function statementHtml(invoice, plays) {
    return Statement.instance(invoice, plays).printHtml()
}


module.exports = {
    statement,
    statementHtml
};
