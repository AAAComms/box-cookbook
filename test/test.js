process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('Box Examples', () => {

    describe('/GET api/createuser -> Create User in Box SDK', () => {
        it('should successfully create user', (done) => {
            chai.request(server)
                .get('/api/createuser')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });


    describe('/DELETE api/deleteuser -> Delete User in Box SDK', () => {
        it('should successfully delete user', (done) => {
            chai.request(server)
                .get('/api/deleteuser')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

});
