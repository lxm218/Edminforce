// meteor test-packages ihealth:hs6ds -p4065

let testInit = (name) => new Promise(
  (resolve, reject) => Tinytest.addAsync(name, (test, next) => resolve({test,next}))
);

let httpPost = (url, input) => new Promise(
  (resolve, reject) => HTTP.post(url, { data: input }, (err, res)=>{
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  })
);

let matchResponse = (res) => new Promise((resolve, reject) => {
  if (res && res.statusCode==200) {
    try {
      let body = JSON.parse(res.content);
      // console.log('JSON parse ok ')
      resolve(body);
    } catch(err1) {
      console.log('JSON parse error' + err1)
      reject(err1);
    }
  } else {
    reject(new Meteor.Error('restCall error',
    'restCall error' + res // res.statusText
    ));
  };
});

let trace = (label, x) => {
  console.log(label, x);
  return x;
}

let mkTest = (testdetail) => {
  let matchHttpResponse = ({test, next}) => {
    let server = "http://localhost:4060";
    httpPost(server+testdetail.url, testdetail.input)
      .then(matchResponse)
      .then((res) => {
        // console.log('test result:', res)
        // console.log('test expected:', testdetail.expectedJSON)
        // console.log('xx', typeof(res.TS))
        // test.instanceOf(res.TS, Number)
        let ignoreFields = ['TS','QueueNum'];
        let filterRelevant = R.omit(ignoreFields);
        let expected = testdetail.expected || JSON.parse(testdetail.expectedJSON);
        test.equal(
          filterRelevant(expected),
          filterRelevant(res)
        );
      })
      .catch((err)=>{
        console.log('test failed: ' + err)
        test.fail('matchResponse error: ' + err)
      })
      .then(next)
  };

  testInit(testdetail.name)
    .then(matchHttpResponse)
};

try {
  var {tests} = YAML.safeLoad(Assets.getText('hs6ds-spec.yml'));
  R.map(mkTest, tests);
} catch (e) {
  console.log(e);
};
