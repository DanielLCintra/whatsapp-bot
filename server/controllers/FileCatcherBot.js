import { google } from "googleapis";
import dotenv from "dotenv";
import twilio from "twilio";
const request = require("request");
const fs = require("fs");

dotenv.config();

const { SID: accountSid, KEY: TwilloAuthToken } = process.env;

twilio(accountSid, TwilloAuthToken);
const { MessagingResponse } = twilio.twiml;
const customsearch = google.customsearch("v1");

/**
 * @class FileCatcherBot
 * @description class will implement bot functionality
 */
class FileCatcherBot {
  /**
   * @memberof FileCatcherBot
   * @param {object} req - Request sent to the route
   * @param {object} res - Response sent from the controller
   * @param {object} next - Error handler
   * @returns {object} - object representing response message
   */

  static download(url, path, callback) {
    request.head(url, (err, res, body) => {
      request(url).pipe(fs.createWriteStream(path)).on("close", callback);
    });
  }

  static async catchFile(req, res, next) {
    const twiml = new MessagingResponse();
    const fileUrl = req.body.MediaUrl0;
    const fileType = req.body.MediaContentType0;

    try {
      if (!fileUrl) {
        twiml.message("Você precisa enviar um arquivo");
        res.set("Content-Type", "text/xml");

        return res.status(200).send(twiml.toString());
      }

      console.log("url", fileUrl);

      FileCatcherBot.download(
        fileUrl,
        `./file.${fileType.split("/")[1]}`,
        () => {
          twiml.message("Arquivo recebido");

          res.set("Content-Type", "text/xml");

          return res.status(200).send(twiml.toString());
        }
      );
    } catch (error) {
      return next(error);
    }
  }
}

export default FileCatcherBot;
