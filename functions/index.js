const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

// Inicializa Firebase
admin.initializeApp();
const db = admin.firestore();

// Configura Express
const app = express();
app.use(cors({ origin: true }));
app.use(express.json()); // Garante que req.body seja processado corretamente

// Rota para obter publicações filtradas por categoria
app.get("/getPublicacoes", async (req, res) => {
    const categoria = req.query.categoria || "Geek";
    try {
        const snapshot = await db.collection("publicacoes").where("categoria", "==", categoria).get();
        const publicacoes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(publicacoes);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar publicações", details: error.message });
    }
});

// Rota para adicionar uma nova publicação
app.post("/addPublicacao", async (req, res) => {
    try {
        const { titulo, conteudo, autor, categoria = "Geek" } = req.body;

        if (!titulo || !conteudo || !autor) {
            return res.status(400).json({ error: "Campos obrigatórios: titulo, conteudo, autor" });
        }

        const novaPub = {
            titulo,
            conteudo,
            autor,
            categoria, // Adiciona a categoria na publicação
            data: admin.firestore.Timestamp.now(),
        };

        await db.collection("publicacoes").add(novaPub);
        res.status(201).json({ message: "Publicação adicionada com sucesso!", publicacao: novaPub });
    } catch (error) {
        res.status(500).json({ error: "Erro ao adicionar publicação", details: error.message });
    }
});

// Exporta as funções
exports.api = functions.https.onRequest(app);
