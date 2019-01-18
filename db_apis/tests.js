const database = require('../services/database.js');
const oracledb = require('oracledb');


const baseQuery = 
 `select TC_ID, TC_NAME, RESULT
  from qa_regression_testsuite`;

async function find(context) {
  let query = baseQuery;
  const binds = {};

  if (context.id) {
      //console.log("context id: "+context.id);
    binds.tc_id = context.id;

    query += `\nwhere TC_ID = :tc_id`;
      //console.log("query: "+query);
  }
  const result = await database.simpleExecute(query, binds);
  //console.log("rows: "+result.rows.length);
  return result.rows;
}

module.exports.find = find;



const createSql =
 `insert into qa_regression_testsuite (
    moduleid,
    tc_name,
    execute,
    result,
    testsuite,
    tc_id
  ) values (
    :moduleid,
    :tc_name,
    :execute,
    :result,
    :testsuite,
    :tc_id
  ) returning tc_id
  into :tc_id`;

async function create(tst) {
  const test = Object.assign({}, tst);

  test.tc_id = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  }

  const result = await database.simpleExecute(createSql, test);

  test.tc_id = result.outBinds.tc_id[0];

  return test;
}

module.exports.create = create;


const updateSql =
 `update qa_regression_testsuite
  set moduleid = :moduleid,
    tc_name = :tc_name,
    execute = :execute,
    result = :result,
    testsuite = :testsuite,
    tc_id = :tc_id
  where tc_id = :tc_id`;

async function update(tst) {
  const test = Object.assign({}, tst);
  const result = await database.simpleExecute(updateSql, test);

  if (result.rowsAffected && result.rowsAffected === 1) {
    return test;
  } else {
    return null;
  }
}

module.exports.update = update;



const deleteSql =
 `begin

    delete from qa_regression_testsuite
    where tc_id = :tc_id;

    :rowcount := sql%rowcount;

  end;`

async function del(id) {
  const binds = {
    tc_id: id,
    rowcount: {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER
    }
  }
  const result = await database.simpleExecute(deleteSql, binds);

  return result.outBinds.rowcount === 1;
}

module.exports.delete = del;