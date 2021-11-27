const request = require('supertest');
const app = require('../app');
const paginate = require('../routes/routes').paginate;

describe('redirect to first page', function () {
  //ticketArr gets loaded
  test('check if there is a redirect', function (done) {
      request(app).get('/') .expect(302);
      done();          
  });

  test('redirect goes to the correct place', function (done) {
    var req = request(app)
    //this check if the redirect goes to first page after loading the request
    req.get('/').expect('Location', "/?page=1");
    done();
  });
});


describe('test 404 error', function () {
  test('invalid range for page query', function (done) {
      var req = request(app)
      //this check for a 404 when someone times to change the pages manually in the url
      req.get('/?page=0').expect(404);
      done();
  });
  test('invalid url', function (done) {
    var req = request(app)
    //checks for 404 with any other invalid url
    req.get('/moo').expect(404);
    done();
  });
});


describe('correct array splicing for pagination', function(){
  var testArr = [];
    //check if splicing works -- (25, 25, 25, 24)
    for (var i = 1; i <= 99; i++) {
      //creating a mock array of 100 values
      testArr.push(i);
    }
    testArr = paginate(testArr, 25);
  test('it check if spliced correctly', function(done){
    //the length of testArr is the number of pages
    //this check if the number of pages is 4.
    expect(testArr.length).toBe(4);
    done();
  });
  test('check if each splice has correct amount of items', function(done){
    //checks if each subarray contains the correct number of tickets
    expect(testArr[0].length).toBe(25);
    expect(testArr[1].length).toBe(25);
    expect(testArr[2].length).toBe(25);
    expect(testArr[3].length).toBe(24);
    done();
  });
});

afterAll(() => {
  //close the server after tickets are complete
   console.log('closing server'); app.close(); 
});