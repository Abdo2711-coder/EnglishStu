import data from "/data/TensesTitles/Past";

export default function handler(req, res) {
    if (req.method === "GET") {
        res.status(200).json(data);
    }
}
// Fetch Tense Present Data ##################################
