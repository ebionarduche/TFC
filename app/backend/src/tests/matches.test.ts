import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { allMatches } from './mocks/matchesMock'
import Token from '../utils/JsonWebToken';


import Matches from '../database/models/MatcherModel'

chai.use(chaiHttp)

const {expect} = chai

describe('Matches', () => {
  afterEach(sinon.restore);
  it('Test Retorn findAll', async function() {
    sinon.stub(Matches, 'findAll').resolves(allMatches as any)

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(allMatches);
  });
  it('Test Retorn findAll - inProgress=true', async function() {
    sinon.stub(Matches, 'findAll').resolves(allMatches as any)

    const { status, body } = await chai.request(app).get('/matches?inProgress=true');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(allMatches);
  });

  it('Test Retorn findAll - inProgress=false', async function() {
    sinon.stub(Matches, 'findAll').resolves(allMatches as any)

    const { status, body } = await chai.request(app).get('/matches?inProgress=false');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(allMatches);
  });

  it('finish match test', async () => {
    sinon.stub(Token, 'verify').returns({role: ''});
    sinon.stub(Matches, "update").resolves([1]);
    const { status, body } = await chai.request(app)
      .patch('/matches/1/finish')
      .set('authorization', 'token')

    expect(status).to.equal(200);
    expect(body).to.deep.equal({
      "status": "SUCCESSFUL",
      "data": {
        "message": "Finished"
      }
    });
  });
  it('update match test', async () => {
    sinon.stub(Token, 'verify').returns({role: ''});
    sinon.stub(Matches, "update").resolves([1]);
    const { status, body } = await chai.request(app)
      .patch('/matches/1')
      .set('authorization', 'token')

    expect(status).to.equal(200);
    expect(body).to.deep.equal({
      "message": "Match updated"
    });
  });
})