/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');

const PlayHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'PlayIntent');
  },
  handle(handlerInput) {
    // streaming logic
    return handlerInput.responseBuilder
      .speak('playing eight radio')
      .addAudioPlayerPlayDirective('REPLACE_ALL', 'https://securestreams.autopo.st:1035/stream?type=http&nocache=5629350', 'eight radio', 0)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent'
        || request.intent.name === 'AMAZON.PauseIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .addAudioPlayerStopDirective()
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const SKILL_NAME = 'Eight Radio';
const STOP_MESSAGE = 'Goodbye, Thanks for listening to eight radio!';

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    PlayHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .lambda();
