const test = require('ava');
const {statement} = require('../src/statement');

test('should return statement when statement given play.type includes in tragedy and comedy', t => {
  //given
  const invoice = {
    'customer': 'BigCo',
    'performances': [
      {
        'playID': 'hamlet',
        'audience': 55,
      },
      {
        'playID': 'as-like',
        'audience': 35,
      },
      {
        'playID': 'othello',
        'audience': 40,
      },
    ],
  };
  const plays = {
    'hamlet': {
      'name': 'Hamlet',
      'type': 'tragedy',
    },
    'as-like': {
      'name': 'As You Like It',
      'type': 'comedy',
    },
    'othello': {
      'name': 'Othello',
      'type': 'tragedy',
    },
  };
  //when
  const result = statement(invoice, plays);
  //then
  t.is(result, 'Statement for BigCo\n' +
      ' Hamlet: $650.00 (55 seats)\n' +
      ' As You Like It: $580.00 (35 seats)\n' +
      ' Othello: $500.00 (40 seats)\n' +
      'Amount owed is $1,730.00\n' +
      'You earned 47 credits \n');
});

test('should throw unknown type when statement given play.type is not includes in tragedy and comedy', t => {
  //given
  const invoice = {
    'customer': 'BigCo',
    'performances': [
      {
        'playID': 'hamlet',
        'audience': 55,
      },
      {
        'playID': 'as-like',
        'audience': 35,
      },
      {
        'playID': 'othello',
        'audience': 40,
      },
    ],
  };
  const plays = {
    'hamlet': {
      'name': 'test',
      'type': 'test',
    }
  };
  //when
  const result = t.throws(()=>{
    statement(invoice, plays);
  })
  //then
  t.is(result.message,"unknown type: test")
});

test('should return statement with Amount is 0 when statement given no performances', t => {
  //given
  const invoice = {
    'customer': 'BigCo',
    'performances': [],
  };
  const plays = {
    'hamlet': {
      'name': 'Hamlet',
      'type': 'tragedy',
    },
    'as-like': {
      'name': 'As You Like It',
      'type': 'comedy',
    },
    'othello': {
      'name': 'Othello',
      'type': 'tragedy',
    },
  };
  //when
  const result = statement(invoice, plays);
  //then
  t.is(result, 'Statement for BigCo\n' +
      'Amount owed is $0.00\n' +
      'You earned 0 credits \n');
});


test('should return statement with Amount is 400 when statement given audience of tragedy is 29', t => {
  //given
  const invoice = {
    'customer': 'BigCo',
    'performances': [
      {
        'playID': 'hamlet',
        'audience': 29,
      }
    ],
  };
  const plays = {
    'hamlet': {
      'name': 'Hamlet',
      'type': 'tragedy',
    },
    'as-like': {
      'name': 'As You Like It',
      'type': 'comedy',
    },
    'othello': {
      'name': 'Othello',
      'type': 'tragedy',
    },
  };
  //when
  const result = statement(invoice, plays);
  //then
  t.is(result, 'Statement for BigCo\n' +
      ' Hamlet: $400.00 (29 seats)\n' +
      'Amount owed is $400.00\n' +
      'You earned 0 credits \n');
});


test('should return statement with Amount is 330 when statement given audience of comedy is 10', t => {
  //given
  const invoice = {
    'customer': 'BigCo',
    'performances': [
      {
        'playID': 'as-like',
        'audience': 10,
      }
    ],
  };
  const plays = {
    'hamlet': {
      'name': 'Hamlet',
      'type': 'tragedy',
    },
    'as-like': {
      'name': 'As You Like It',
      'type': 'comedy',
    },
    'othello': {
      'name': 'Othello',
      'type': 'tragedy',
    },
  };
  //when
  const result = statement(invoice, plays);
  //then
  t.is(result, 'Statement for BigCo\n' +
      ' As You Like It: $330.00 (10 seats)\n' +
      'Amount owed is $330.00\n' +
      'You earned 2 credits \n');
});
