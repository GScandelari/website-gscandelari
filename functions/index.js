const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

admin.initializeApp();
const db = admin.firestore();

exports.getPublicacoes = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        const categoria = req.query.categoria || "Geek";
        try {
            const snapshot = await db.collection('publicacoes').where('categoria', '==', categoria).get();
            const publicacoes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            res.status(200).json(publicacoes);
        } catch (error) {
            res.status(500).send("Erro ao buscar publicações: " + error.message);
        }
    });
});
