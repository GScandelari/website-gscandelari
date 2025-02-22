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
    try {
        const snapshot = await db.collection("publicacoes").doc("Geek").collection("posts").get();

        if (snapshot.empty) {
            return res.status(404).json({ error: "Nenhuma publicação encontrada" });
        }

        const publicacoes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(publicacoes);
    } catch (error) {
        console.error("Erro ao buscar publicações:", error);
        res.status(500).json({ error: "Erro ao buscar publicações", details: error.message });
    }
});


// Rota para adicionar uma nova publicação
app.post("/addPublicacao", async (req, res) => {
    try {
        const { titulo, conteudo, autor } = req.body;

        if (!titulo || !conteudo || !autor) {
            return res.status(400).json({ error: "Campos obrigatórios: titulo, conteudo, autor" });
        }

        const novaPub = {
            titulo,
            conteudo,
            autor,
            data: admin.firestore.Timestamp.now(),
        };

        // Adiciona na coleção correta
        const docRef = await db.collection("publicacoes").doc("Geek").collection("posts").add(novaPub);

        console.log("Publicação adicionada com sucesso! ID:", docRef.id);

        res.status(201).json({ message: "Publicação adicionada com sucesso!", id: docRef.id, publicacao: novaPub });
    } catch (error) {
        console.error("Erro ao adicionar publicação:", error);
        res.status(500).json({ error: "Erro ao adicionar publicação", details: error.message });
    }
});

// Exporta as funções
exports.api = functions.https.onRequest(app);
