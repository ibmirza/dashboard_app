const tests = require('../db_apis/tests.js');

async function get(req, res, next) {
  try {
    const context = {};

    context.id = parseInt(req.params.id, 10);

    const rows = await tests.find(context);

    if (req.params.id) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}
module.exports.get = get;



function getTestFromRec(req) {
  const test = {
    moduleid: req.body.moduleid,
    tc_name: req.body.tc_name,
    execute: req.body.execute,
    result: req.body.result,
    testsuite: req.body.testsuite,
    tc_id: req.body.tc_id
  };

  return test;
}

async function post(req, res, next) {
  try {
    let test = getTestFromRec(req);

    test = await tests.create(test);

    res.status(201).json(test);
  } catch (err) {
    next(err);
  }
}
module.exports.post = post;


async function put(req, res, next) {
  try {
    let test = getTestFromRec(req);

    test.tc_id = parseInt(req.params.id, 10);

    test = await tests.update(test);

    if (test !== null) {
      res.status(200).json(test);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}
module.exports.put = put;



async function del(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);

    const success = await tests.delete(id);

    if (success) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}
module.exports.delete = del;