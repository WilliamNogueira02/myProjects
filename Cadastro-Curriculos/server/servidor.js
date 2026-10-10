const multer = require('multer');
const path = require('path');

const db = require('./banco')
const express = require('express');
const app = express();

const armazenamento = multer.diskStorage({
    destination: (req, file, cb) => cb(null, '../server/uploads'),
    filename: (req, file, cb) => {
        const extensao = path.extname(file.originalname);
        cb(null, Date.now() + extensao);
    }
});

const upload = multer({ 
    storage: armazenamento,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const extensao = path.extname(file.originalname).toLocaleLowerCase();
        if (['.pdf', '.doc', '.docx'].includes(extensao)) {
            cb(null, true);
        } else {
            cb(new Error('Formato de arquivo não permitido'), false);
        }
    }
 });


app.use(express.json());

app.use(express.static('../public'));

app.post('/curriculos', upload.single('curriculo'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ mensagem: 'Nenhum arquivo enviado' });
        }
        const { nome, email, telefone, endereco, objetivo, formacao, experiencia, habilidades } = req.body;

        const comando = db.prepare('INSERT INTO curriculos (nome, email, telefone, endereco, objetivo, formacao, experiencia, habilidades, arquivo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
        comando.run(nome, email, telefone, endereco, objetivo, formacao, experiencia, habilidades, req.file.filename);
        res.status(201).json({ mensagem: 'Currículo cadastrado com sucesso!' });
    } catch (error) {
        console.error('Erro no cadastro do currículo:', error);
        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            res.status(409).json({ mensagem: 'Currículo já cadastrado' });
        } else {
            res.status(500).json({ mensagem: 'Erro ao salvar' });
        }
    }
});

app.get('/curriculos', (req, res) => {
    try {
        const curriculos = db.prepare('SELECT * FROM curriculos ORDER BY id DESC').all();
        res.json(curriculos);
    } catch (error) {
        console.error('Erro ao buscar currículos:', error);
        res.status(500).json({ mensagem: 'Erro ao buscar currículos' });
    }
});

app.delete('/curriculos/:id', (req, res) => {
    try {
        const id = req.params.id;
        db.prepare('DELETE FROM curriculos WHERE id = ?').run(id);
        res.json({ mensagem: 'Currículo excluído com sucesso!'});

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao excluir currículo' });
    }
});

app.put('/curriculos/:id', upload.single('curriculo'), (req, res) => {

    try{
        const { id } = req.params;
        const { nome, email, telefone, endereco, objetivo, formacao, experiencia, habilidades } = req.body;
        let arquivo = req.file ? req.file.filename : null;
        db.prepare('UPDATE curriculos SET nome = ?, email = ?, telefone = ?, endereco = ?, objetivo = ?, formacao = ?, experiencia = ?, habilidades = ?, arquivo = COALESCE(?, arquivo) WHERE id = ?')
            .run(nome, email, telefone, endereco, objetivo, formacao, experiencia, habilidades, arquivo, id);
        res.json({ mensagem: 'Currículo atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar currículo:', error);

        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            res.status(409).json({ mensagem: 'Currículo já cadastrado' });
        } else {
            res.status(500).json({ mensagem: 'Erro ao atualizar currículo' });
        }
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});