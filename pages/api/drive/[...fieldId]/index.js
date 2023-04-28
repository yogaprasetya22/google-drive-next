import drive from "../../config/connection";

export default async function handler(req, res) {
    if (req.method !== "DELETE") {
        res.status(405).json({ message: "Method not allowed" });
    }
    const { fieldId } = req.query;

    try {
        const response = await drive.files.delete({
            fileId: fieldId[1],
        });
        if (response) {
            res.json({ done: "sukses", fileId: fieldId[1] });
        }
    } catch (error) {
        res.json({ error: error.message });
    }
}
