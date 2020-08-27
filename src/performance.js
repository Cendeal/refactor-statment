const {format} = require('./utils')
class Performance {
    constructor(name, total, seats) {
        this.name = name
        this.total = total
        this.seats = seats
    }

    toString() {
        return ` ${this.name}: ${format(this.total)} (${this.seats} seats)`
    }
}
module.exports = Performance
