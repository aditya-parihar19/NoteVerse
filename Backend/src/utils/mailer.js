import ejs from  "ejs"
import path from "path";
import { readFileSync} from "fs"
import { sendEmail } from "./sendEmail.js";

const templateDirectory = path.resolve("src/templates/emails")

const loadTemplate = function (templatePath) {
  try {
    return readFileSync(path.join(templateDirectory, templatePath), "utf-8")
  } catch (error) {
    console.log("Error while loading template: ", error) 
  }
}

const renderTemplate = function (template, context) {
  try {
    return ejs.render(template, context)
  } catch (error) {
    console.log("Error while rendering template: ", error)
  }
}

const templates = {
  welcome: {
    subject: "Welcome to NoteVerse",
    html: loadTemplate("welcome/welcome.html.ejs"),
    text: loadTemplate("welcome/welcome.text.ejs")
  }
}

const sendWelcomeEmail = async (to, name) => {
  const html = renderTemplate(templates.welcome.html, { name })
  const text = renderTemplate(templates.welcome.text, { name })
  const subject = templates.welcome.subject
  await sendEmail(to, subject, text, html)
}

export {sendWelcomeEmail}