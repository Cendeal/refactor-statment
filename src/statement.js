const format = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
}).format;

class Performance{
  constructor(name,total,seats) {
    this.name=name
    this.total = total
    this.seats = seats
  }
  toString(){
    return ` ${this.name}: ${format(this.total)} (${this.seats} seats)`
  }
}

class Statement{
  constructor(owner,credits,amount,performances) {
    this.owner = owner
    this.credits = credits
    this.amount = amount
    this.performances = performances
  }
  printText(){
    return `Statement for ${this.owner}\n` +
        this.performances.map(performance=>performance.toString()+'\n').join('')+
        `Amount owed is ${format(this.amount)}\n` +
        `You earned ${this.credits} credits \n`
  }
  printHtml(){

  }
}

class Calculator{
  static calculateTragedyAmount(audience){
    let amount = 40000;
    if (audience > 30) {
      amount += 1000 * (audience - 30);
    }
    return amount
  }
  static calculateComedyAmount(){

  }
}
function statement (invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  const performances = []

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;
    switch (play.type) {
      case 'tragedy':
        thisAmount = Calculator.calculateTragedyAmount(perf.audience)
        break;
      case 'comedy':
        thisAmount = 30000;
        if (perf.audience > 20) {
          thisAmount += 10000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;
        break;
      default:
        throw new Error(`unknown type: ${play.type}`);
    }
    // add volume credits
    volumeCredits += Math.max(perf.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);
    totalAmount += thisAmount;
    const performance = new Performance(play.name,thisAmount/100,perf.audience)
    performances.push(performance)
  }
  return new Statement(invoice.customer,volumeCredits,totalAmount/100,performances).printText()
}

module.exports = {
  statement
};
