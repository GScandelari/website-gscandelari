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

exports.addPublicacao = functions.https.onRequest(async (req, res) => {
    try {
        const { titulo, conteudo, autor } = req.body;
        if (!titulo || !conteudo || !autor) {
            return res.status(400).json({ error: "Campos obrigatórios: titulo, conteudo, autor" });
        }

        const novaPub = {
            titulo,
            conteudo,
            autor,
            data: admin.firestore.Timestamp.now()
        };

        await db.collection("publicacoes").add(novaPub);
        res.json({ message: "Publicação adicionada com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
