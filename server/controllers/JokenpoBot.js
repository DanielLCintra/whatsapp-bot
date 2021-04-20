import { google } from "googleapis";
import dotenv from "dotenv";
import twilio from "twilio";
dotenv.config();

const {
  SID: accountSid,
  KEY: TwilloAuthToken,
  APIKEY: googleApiKey,
  CX: cx,
} = process.env;

twilio(accountSid, TwilloAuthToken);
const { MessagingResponse } = twilio.twiml;
const customsearch = google.customsearch("v1");

/**
 * @class JokenPoBot
 * @description class will implement bot functionality
 */
class JokenPoBot {
  /**
   * @memberof JokenPoBot
   * @param {object} req - Request sent to the route
   * @param {object} res - Response sent from the controller
   * @param {object} next - Error handler
   * @returns {object} - object representing response message
   */
  static async play(req, res, next) {
    const opcoes = ["pedra", "papel", "tesoura"];

    const perde = {
      pedra: "papel",
      papel: "tesoura",
      tesoura: "pedra",
    };

    const usuario = req.body.Body.toLowerCase();
    switch (usuario) {
      case "pedra":
      case "papel":
      case "tesoura":
        // fazer a escolha do computador e responder quem ganhou
        const computador = opcoes[Math.floor(Math.random() * opcoes.length)];

        if (computador === usuario) {
          res.send("<Response><Message>Ops, deu empate!</Message></Response>");
        } else {
          if (perde[computador] === usuario) {
            // computador perdeu
            res.send(
              `<Response><Message>Eu escolhi *${computador}*</Message><Message>Você ganhou, mas quero jogar novamente!</Message></Response>`
            );
          } else {
            // computador ganhou
            const twiml = new twilio.twiml.MessagingResponse();
            twiml.message(`Eu escolhi *${computador}*`);
            twiml
              .message("Ganhei! Ganhei!!!")
              .media(
                "https://farm8.staticflickr.com/7090/6941316406_80b4d6d50e_z_d.jpg"
              );
            res.send(twiml.toString());
          }
        }

        break;

      default:
        res.send(
          "<Response><Message>Escolha Pedra, Papel ou Tesoura!</Message></Response>"
        );
        break;
    }
  }
}

export default JokenPoBot;
