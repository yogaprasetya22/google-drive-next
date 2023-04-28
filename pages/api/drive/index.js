import drive from "../config/connection";

export default async function handler(req, res) {
    try {
        const result = await drive.files.list({
            q: "'1LS_NJazP1BXF2oOUCDdzsxqA2fQE2yC3' in parents",
            fields: "files(id, name)",
        });

        const listFile = new Array();
        listFile.push(result.data.files);

        const kon = result.data.files.map(async (file) => {
            const fileId = file.id;
            const fileName = file.name;

            await drive.permissions.create({
                fileId: fileId,
                requestBody: {
                    role: "reader",
                    type: "anyone",
                },
            });

            const response = await drive.files.get({
                fileId: fileId,
                fields: "webViewLink, webContentLink",
            });

            return {
                fileId: fileId,
                fileName: fileName,
                webViewLink: response.data.webViewLink,
                webContentLink: response.data.webContentLink,
            };
        });
        const result2 = await Promise.all(kon);
        res.json(result2);
    } catch (error) {
        res.json(error.message);
    }
}
