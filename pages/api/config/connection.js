import { google } from "googleapis";

const CLIENT_ID =
    "704586585039-r94d25tf29c7vghkpib6m7epl0n8rf9n.apps.googleusercontent.com";
const CCLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const REFRESH_TOKEN =
    "1//048GRUQCiannRCgYIARAAGAQSNwF-L9IrR6YnFJsdRTyJCs8_VzMgg5daHJ7GefHlbMcFc6DPWb4N1f9w7udw-CNHnNSARcsZfoE";

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CCLIENT_SECRET,
    REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
    version: "v3",
    auth: oAuth2Client,
});

export default drive;
