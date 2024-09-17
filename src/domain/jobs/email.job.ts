import cron from "node-cron";
import { EmailService } from "../services/email.service";
import { monkeyPoxCaseModel } from "../../data/models/monkeyPoxCase.model";
import { generateCaseEmailTemplate } from "../templates/email.template";
import { envs } from "../../config/envs.plugin";

export const emailJob = () => {
  const emailService = new EmailService();

  cron.schedule("*/10 * * * * *", async () => {
    try {
      const pendingCases = await monkeyPoxCaseModel.find({ isSent: false });
      if (!pendingCases.length) {
        console.log("no cases pending to send email found");
        return;
      }
      console.log(`Processing ${pendingCases.length} cases`);
      await Promise.all(
        pendingCases.map(async (monkeyPoxCase) => {
          console.log(monkeyPoxCase);
          try {
            await emailService.sendEmail({
              to: envs.MAIL_USER,
              subject: "New Monkey Pox Case",
              htmlBody: generateCaseEmailTemplate(
                monkeyPoxCase.lat, monkeyPoxCase.lng, monkeyPoxCase.genre, monkeyPoxCase.age, monkeyPoxCase.creationDate
              ),
            });
            console.log(
              `email sent for case with id ${monkeyPoxCase._id}`
            );
            let updatedCase = {
              lat: monkeyPoxCase.lat,
              lng: monkeyPoxCase.lng,
              isSent: true,
              genre: monkeyPoxCase.genre,
              age: monkeyPoxCase.age,
              creationDate: monkeyPoxCase.creationDate
            };

            await monkeyPoxCaseModel.findByIdAndUpdate(monkeyPoxCase._id, updatedCase);
            console.log(`case with id: ${monkeyPoxCase._id} updated`);
          } catch (error) {
            console.error("Error while proccessing case");
          }
        })
      );
    } catch (error) {
      console.error(`Error while sending emails`);
    }
  });
}