/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const {
  afterEach, before, beforeEach, describe, it
} = require('mocha')
const { villainsList, singleVillain } = require('../mocks/villains')
const { getAllVillains, getVillainBySlug, saveNewVillain } = require('../../controllers/villains')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - villains', () => {
  let sandbox
  let stubbedFindOne
  let stubbedSend
  let response
  let stubbedSendStatus
  let stubbedStatusSend
  let stubbedStatus
  let stubbedCreate

  before(() => {
    sandbox = sinon.createSandbox()
    stubbedFindOne = sandbox.stub(models.villains, 'findOne')
    stubbedCreate = sandbox.stub(models.villains, 'create')
    stubbedSend = sandbox.stub()
    stubbedSendStatus = sandbox.stub()
    stubbedStatusSend = sandbox.stub()
    stubbedStatus = sandbox.stub()

    response = {
      send: stubbedSend,
      sendStatus: stubbedSendStatus,
      status: stubbedStatus,
    }
  })

  beforeEach(() => {
    stubbedStatus.returns({ send: stubbedStatusSend })
  })
  afterEach(() => {
    sandbox.reset() })

  describe('getAllVillains', () => {
    it('retrieves a list of villains from the database and calls response.send() with the list', async () => {
      const stubbedFindAll = sinon.stub(models.villains, 'findAll').returns(villainsList)

      await getAllVillains({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(villainsList)
    })
  })
  describe('getVillainBySlug', () => {
    // eslint-disable-next-line max-len
    it('retrieves the villain associated with the provided id from the database and calls response.send with it', async () => {
      stubbedFindOne.returns(singleVillain)
      const request = { params: { slug: 'gaston' } }

      await getVillainBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'gaston' } })
      expect(stubbedSend).to.have.been.calledWith(singleVillain)
    })
    it('returns a 404 when no villain is found', async () => {
      stubbedFindOne.returns(null)
      const request = { params: { slug: 'not-found' } }

      await getVillainBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'not-found' } })
      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })
    it('returns a 500 with an error message when the database call throws an error', async () => {
      stubbedFindOne.throws('ERROR!')
      const request = { params: { slug: 'throw-error' } }

      await getVillainBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'throw-error' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusSend).to.have.been.calledWith('Unable to retrieve villain, please try again')
    })
  })
  describe('saveNewVillain', () => {
    it('accepts new team details and saves them as a new villain, returning the saved record 201 status', async () => {
      stubbedCreate.returns(singleVillain)
      const request = { body: singleVillain }

      await saveNewVillain(request, response)

      expect(stubbedCreate).to.have.been.calledWith(singleVillain)
      expect(stubbedStatus).to.have.been.calledWith(201)
    })

    it('returns a 404 when villain can not be added due to missing data', async () => {
      const request = { body: 'not-found' }

      await saveNewVillain(request, response)

      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusSend).to.have.been.calledWith('The following fields are required: name, movie, slug')
    })

    it('responds with a 500 status and error message with the database call throws an error', async () => {
      stubbedCreate.throws('ERROR!')
      const request = { body: singleVillain }

      await saveNewVillain(request, response)

      expect(stubbedCreate).to.have.been.calledWith(singleVillain)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusSend).to.have.been.calledWith('Unable to save villain, please try again')
    })
  })
})



