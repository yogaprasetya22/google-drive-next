import formidable from "formidable";
import path from "path";
import fsPomise from "fs/promises";
import fs from "fs";
import drive from "../config/connection";

export const config = {
    api: {
        bodyParser: false,
    },
};

const readFile = (req, saveLocally) => {
    const options = {};
    if (saveLocally) {
        options.uploadDir = path.join(process.cwd(), "/public/uploads");
        options.filename = (name, ext, path, form) => {
            name = path.originalFilename;
            return Date.now().toString() + "_" + path.originalFilename;
        };
    }
    options.maxFileSize = 4000 * 1024 * 1024;
    const form = formidable(options);
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        });
    });
};

const handler = async (req, res) => {
    if (req.method !== "POST")
        return res.status(405).json({ message: "Method not allowed" });

    try {
        await fsPomise.readdir(
            path.join(process.cwd() + "/public", "/uploads")
        );
    } catch (error) {
        await fsPomise.mkdir(path.join(process.cwd() + "/public", "/uploads"));
    }
    const resultFile = await readFile(req, true);

    try {
        if (!resultFile.files) {
            res.json({ message: "No file uploaded" });
            return;
        }

        const filePath = path.join(
            process.cwd() + "/public",
            "/uploads",
            resultFile.files.File[0].newFilename
        );
        const respon = await drive.files.get({
            fileId: "1LS_NJazP1BXF2oOUCDdzsxqA2fQE2yC3",
        });

        if (!respon) res.json({ message: "Folder not found" });

        const folderId = respon.data.id;

        const fileMetadata = {
            name: resultFile.files.File[0].originalFilename,
            parents: [folderId],
        };

        const media = {
            mimeType: resultFile.files.File[0].mimetype,
            body: fs.createReadStream(filePath),
        };

        const response = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: "id",
        });
        if (response) {
            await fsPomise.unlink(filePath);
        }
    } catch (error) {
        res.json({
            error: error.message,
        });
    }
    res.json({ done: "Sukses!" });
};

export default handler;
