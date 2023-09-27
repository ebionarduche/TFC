import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { allTeams } from './mocks/teamMock'

import Team from '../database/models/TeamModel'

chai.use(chaiHttp)

const {expect} = chai

describe('Teams', () => {
  afterEach(sinon.restore);
  it('Test Retorn GetAllTeams', async function() {
    sinon.stub(Team, 'findAll').resolves(allTeams as any)

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(allTeams);
  })
})