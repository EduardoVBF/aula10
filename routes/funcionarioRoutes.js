const router = require('express').Router();
const Funcionario = require('../models/funcionario');

//POST (Insert) Inserindo um novo funcionario no mongoDB
router.post('/', (req, res) => {
    const {nome, cargo, salario, desligado} = req.body;
    if(!nome && !cargo && !salario && !desligado) {
        res.status(422).json({ error: 'informar nome, cargo salario e desligado é obrigatório!'})
    }
    const funcionario = {
        nome,
        cargo,
        salario,
        desligado,
    };
    try {
        Funcionario.create(funcionario);
        res.status(201).json({message: 'Funcionário cadastrado com sucesso!'})
    } catch (error) {
        res.status(500).json({error: error});
    }
});

// Listar todos os funcionários
router.get('/', async (req, res) => {
    try {
        const funcionarios = await Funcionario.find();
        res.json(funcionarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Listar um funcionário específico
router.get('/:id', async (req, res) => {
    try {
        const funcionario = await Funcionario.findById(req.params.id);
        if (!funcionario) {
            return res.status(404).json({ message: 'Funcionário não encontrado' });
        }
        res.json(funcionario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Atualizar um funcionário específico
router.put('/:id', async (req, res) => {
    const { nome, cargo, salario, desligado } = req.body;
    try {
        const funcionario = await Funcionario.findByIdAndUpdate(
            req.params.id,
            { nome, cargo, salario, desligado },
            { new: true }
        );
        if (!funcionario) {
            return res.status(404).json({ message: 'Funcionário não encontrado' });
        }
        res.json({ message: 'Funcionário atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Deletar um funcionário específico
router.delete('/:id', async (req, res) => {
    try {
        const funcionario = await Funcionario.findByIdAndDelete(req.params.id);
        if (!funcionario) {
            return res.status(404).json({ message: 'Funcionário não encontrado' });
        }
        res.json({ message: 'Funcionário excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

module.exports = router;