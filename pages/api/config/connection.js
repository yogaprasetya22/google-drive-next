import { google } from "googleapis";

const CLIENT_ID =
    "704586585039-r94d25tf29c7vghkpib6m7epl0n8rf9n.apps.googleusercontent.com";
const CCLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const REFRESH_TOKEN =
    "1//04tXZIJ5fe_b5CgYIARAAGAQSNwF-L9IrhMNAD4JBck4VrJQMF87cXhtyjF1i_0VfDS3iYkjKNILgKSw-oOJx4z-NvvT0o4jRFLU";

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
