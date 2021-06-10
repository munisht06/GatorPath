//Gator Path Created by Alec Shears, Munish Tanwar, Carlson Joseph, Jaeyong Sin
//Helper function used from Hello World Template Amazon Provided us
const Alexa = require('ask-sdk-core');

var thirteenthStreet = false;
var universityAvenue = false;
var highFive = false;
var runPast = false;
var helpUp = false;
var keepRunning = false;
var end = false;

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return (Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest') || 
        ((Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest') && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'StartOverIntent'));
    },            
    handle(handlerInput) {
        thirteenthStreet = false;
        universityAvenue = false;
        highFive = false;
        runPast = false;
        helpUp = false;
        keepRunning = false;
        end = false;
        
        
        var speakOutput = 'Welcome to the mythical land of Gainesville. You wake up on a street corner alone with no memory. You hear century tower in the distance. <audio src="soundbank://soundlibrary/alarms/chimes_and_bells/chimes_bells_11"/> You decide you need to find friends. You look up and the signs say 13th Street and University Avenue. <audio src="soundbank://soundlibrary/transportation/amzn_sfx_car_drive_past_01"/> <audio src="soundbank://soundlibrary/transportation/amzn_sfx_car_honk_2x_01"/> Which Street would you like to go down?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


const StreetIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'ThirteenthStreetIntent' || Alexa.getIntentName(handlerInput.requestEnvelope) === 'UniversityAvenueIntent')
            && !thirteenthStreet && !universityAvenue;
    },
    handle(handlerInput) {
        var speakOutput = 'You walk down the street';
        console.log(handlerInput);
        if(Alexa.getIntentName(handlerInput.requestEnvelope) === 'ThirteenthStreetIntent')
        {
            thirteenthStreet = true;
            speakOutput = 'You walk down 13th Street and are approached by Dennis.  <voice name="Matthew"> <amazon:emotion name="excited" intensity="high">Hey Man! Can I have a high five!</amazon:emotion></voice>. Do you high five him or run past him?';
            
            
        }
        else if(Alexa.getIntentName(handlerInput.requestEnvelope) === 'UniversityAvenueIntent')
        {
            universityAvenue = true;
            speakOutput = 'You walk down University Avenue and are approached by an Alligator. The Alligator says <voice name="Russell"> <amazon:emotion name="excited" intensity="medium">Hello, could you show me how to get to the football stadium.</amazon:emotion></voice> Do you point to it or walk him there';
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            // .reprompt()
            .reprompt("I am sorry, I didn't catch that.")
            .getResponse();
    }
};

const DennisIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'HighFiveIntent' || Alexa.getIntentName(handlerInput.requestEnvelope) === 'RunPastIntent')
            && !highFive && !runPast && thirteenthStreet && !universityAvenue;
    },
    handle(handlerInput) {
        var speakOutput = 'Dennis';
        console.log(handlerInput);
        if(Alexa.getIntentName(handlerInput.requestEnvelope) === 'HighFiveIntent')
        {
            highFive = true;
            speakOutput = 'You give Dennis a high five.  You start talking about your mutual love for the show Bobs Burgers. After an hour of chatting you realize you have quickly achieved your goal. You have made a friend. It turns out, all you needed to do was look. The End. <audio src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_outro_01"/> You can say Start Over to begin anew or Quit to exit the game.';
            end = true;
        }
        else if(Alexa.getIntentName(handlerInput.requestEnvelope) === 'RunPastIntent')
        {
            runPast = true;
            speakOutput = ' <audio src="soundbank://soundlibrary/human/amzn_sfx_person_running_01"/> <break time = "1s"/> In a panic, you run past Dennis and just keep running. You glance behind you to see if you are being followed. While distracted, you accidently run into a man in a knight costume. He falls over and says <voice name="Brian"> <amazon:emotion name="excited" intensity="medium"> Ah, where are you off to at such speeds. You need to be more careful</amazon:emotion></voice> Do you help him up or keep running?';
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            // .reprompt()
            .reprompt("I am sorry, I didn't catch that.")
            .getResponse();
    }
};

const KnightIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelpUpIntent' || Alexa.getIntentName(handlerInput.requestEnvelope) === 'KeepRunningIntent')
            && runPast && !helpUp && !keepRunning;
    },
    handle(handlerInput) {
        var speakOutput = 'Knight';
        console.log(handlerInput);
        if(Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelpUpIntent')
        {
            helpUp = true;
            speakOutput = 'You help the knight up. He says <voice name="Brian"> <amazon:emotion name="excited" intensity="medium">"Thank you, I am new here and was feeling very lost, but your kindness has really brightened my day. "</amazon:emotion></voice> <amazon:emotion name="excited" intensity="high"> You realize that you come from very different places, but are not very different people. He invites you to lunch and you realize something. You have just made... a friend. The End. </amazon:emotion> <audio src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_outro_01"/> You can say Start Over to begin anew or Quit to exit the game. ';
            end = true;
        }
        else if(Alexa.getIntentName(handlerInput.requestEnvelope) === 'KeepRunningIntent')
        {
            keepRunning = true;
            speakOutput = '<audio src="soundbank://soundlibrary/human/amzn_sfx_person_running_01"/> <break time = "1s"/><amazon:emotion name="disappointed" intensity="high"> You keep running. Running and running until you can no longer feel your legs. You stop to catch your breath and notice that there is nobody around you. You have failed at your goal of making a friend. You return home defeated. Game Over. <audio src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_negative_response_02"/> You can say Start Over to begin anew or Quit to exit the game.  </amazon:emotion>';
            end = true;
            
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            // .reprompt()
            .reprompt("I am sorry, I didn't catch that.")
            .getResponse();
    }
};
const AlligatorIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'PointIntent' || Alexa.getIntentName(handlerInput.requestEnvelope) === 'WalkIntent')
            && universityAvenue;
    },
    handle(handlerInput) {
        var speakOutput = 'Alligator';
        console.log(handlerInput);
        if(Alexa.getIntentName(handlerInput.requestEnvelope) === 'PointIntent')
        {
            
            speakOutput = 'You point the alligator in the direction he needs to go and he goes on his way. You remember you have homework due at midnight and rush home. You finish the homework and watch TV. Who needs friends anyways. Game Over. <audio src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_negative_response_02"/> You can say Start Over to begin anew or Quit to exit the game.';
            end = true;

        }
        else if(Alexa.getIntentName(handlerInput.requestEnvelope) === 'WalkIntent')
        {
            
            speakOutput = 'You walk with the alligator. <voice name="Russell"> <amazon:emotion name="excited" intensity="medium"> You know, this town has really changed. It used to be filled with magic. I was a student here myself over 100 years ago. While it is a completely different place, I am glad kind people like you still exist.</amazon:emotion></voice> You arrive at the stadium <audio src="soundbank://soundlibrary/sports/crowds/crowds_03"/>. You stay and talk for a while. You realize you have just made a friend. The End. <audio src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_outro_01"/> You can say Start Over to begin anew or Quit to exit the game.';
            end = true;
        
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            // .reprompt()
            .reprompt("I am sorry, I didn't catch that.")
            .getResponse();
    }
};


const WhereAmIIntentHandler = {
    canHandle(handlerInput) {
        return ((Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'WhereAmIIntent') || (Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'));
    },
    handle(handlerInput) {
        var speakOutput = 'Here';
        console.log(handlerInput);
        if(end)
        {
            speakOutput = "You are at the end of the game. You can say Start Over to begin anew or Quit to exit the game."
        }
        else if(runPast)
        {
            
            speakOutput = 'You were running down 13th Street, you ran past Dennis and accidently knocked over a man in a knight costume. Do you help him up or keep running?';
        
        }
        else if(thirteenthStreet)
        {
            speakOutput = "You are currently on 13th Street. Dennis is infront of you. He goes to give you a high five. Do you high five him or run past him?";

        }
        else if(universityAvenue)
        {
            
            speakOutput = 'You are on University Avenue. There is an Alligator infront of you. The Alligator said Hello, could you show me how to get to the football stadium. Do you point to it or walk him there';
        
        }
        
        else if(!thirteenthStreet && !universityAvenue && !highFive && !runPast && !helpUp && !keepRunning)
        {
            
            speakOutput = "You are at the corner of 13th Street and University Avenue. Which Street would you like to go down?"
        
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt("I am sorry, I didn't catch that.")
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Say the response you want to do. Or You can say Start Over to begin anew or Quit to exit the game.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Farewell Traveller!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;


        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        StreetIntentHandler,
        DennisIntentHandler,
        KnightIntentHandler,
        AlligatorIntentHandler,
        WhereAmIIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
