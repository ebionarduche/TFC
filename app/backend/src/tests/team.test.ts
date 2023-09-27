import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { allTeams, teamById } from './mocks/teamMock'

import Team from '../database/models/TeamModel'

chai.use(chaiHttp)

const {expect} = chai

describe('Teams', () => {
  afterEach(sinon.restore);
  it('Test Retorn getAllTeams', async function() {
    sinon.stub(Team, 'findAll').resolves(allTeams as any)

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(allTeams);
  });

  it('Test Retorn getTeamByid', async function() {
    sinon.stub(Team, 'findByPk').resolves(teamById as any)

    const { status, body } = await chai.request(app).get('/teams/7')

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamById)

  });

  it('Test Retorn getTeamByid - Not Found', async function() {
    sinon.stub(Team, 'findByPk').resolves(null)

    const { status, body } = await chai.request(app).get('/teams/50')

    expect(status).to.equal(404);
    expect(body.message).to.deep.equal('Time não encontrado')

  });

})