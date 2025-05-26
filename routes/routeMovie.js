const express = require('express');
const router = express.Router();
const modelFilme = require('../model/modelMovie'); 
const modelCategoria = require('../model/modelCategoria'); 

/* ROTA DE INSERÇÃO DE FILME */
router.post('/registerMovie', async (req, res) => {
    try {
        const { nome_filme, nome_indicado, cod_categoria } = req.body;

        // Verifica se a categoria existe
        const categoria = await modelCategoria.findByPk(cod_categoria);
        if (!categoria) {
            return res.status(400).json({
                errorStatus: true,
                mensageStatus: 'Categoria não encontrada'
            });
        }

        const novoFilme = await modelFilme.create({
            nome_filme,
            nome_indicado,
            cod_categoria,
        });

        return res.status(201).json({
            errorStatus: false,
            mensageStatus: 'FILME INSERIDO COM SUCESSO',
            data: novoFilme
        });
    } catch (error) {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO INSERIR O FILME',
            errorObject: error
        });
    }
});

/* ROTA DE LISTAGEM GERAL DE FILMES */
router.get('/listagemFilmes', async (req, res) => {
    try {
        const filmes = await modelFilme.findAll({
            include: [{
                model: modelCategoria,
                as: 'categoria',
                attributes: ['cod_categoria', 'nome_categoria']
            }]
        });

        return res.status(200).json({ 
            errorStatus: false,
            mensageStatus: 'FILMES LISTADOS COM SUCESSO',
            data: filmes
        });
    } catch (error) {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO LISTAR OS FILMES',
            errorObject: error
        });
    }
});

/* ROTA DE LISTAGEM DE FILME POR CÓDIGO DE FILME */
router.get('/listagemFilme/:cod_filme', async (req, res) => {
    try {
        const { cod_filme } = req.params;

        const filme = await modelFilme.findByPk(cod_filme, {
            include: [{
                model: modelCategoria,
                as: 'categoria',
                attributes: ['cod_categoria', 'nome_categoria']
            }]
        });

        if (!filme) {
            return res.status(404).json({ 
                errorStatus: true,
                mensageStatus: 'FILME NÃO ENCONTRADO'
            });
        }

        return res.status(200).json({ 
            errorStatus: false,
            mensageStatus: 'FILME RECUPERADO COM SUCESSO',
            data: filme
        });
    } catch (error) {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO RECUPERAR O FILME',
            errorObject: error
        });
    }
});

/* ROTA DE EXCLUSÃO DE FILME */
router.delete('/excluirFilme/:cod_filme', async (req, res) => {
    try {
        const { cod_filme } = req.params;

        const filme = await modelFilme.destroy({
            where: { cod_filme }
        });

        if (!filme) {
            return res.status(404).json({ 
                errorStatus: true,
                mensageStatus: 'FILME NÃO ENCONTRADO'
            });
        }

        return res.status(200).json({ 
            errorStatus: false,
            mensageStatus: 'FILME EXCLUÍDO COM SUCESSO'
        });
    } catch (error) {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO EXCLUIR O FILME',
            errorObject: error
        });
    }
});

/* ROTA DE ALTERAÇÃO DE FILME */
router.put('/alterarFilme/:cod_filme', async (req, res) => {
    try {
        const { cod_filme } = req.params;
        const { nome_filme, nome_indicado, cod_categoria } = req.body;

        const categoria = await modelCategoria.findByPk(cod_categoria);
        if (!categoria) {
            return res.status(400).json({
                errorStatus: true,
                mensageStatus: 'Categoria não encontrada'
            });
        }

        const [filmeAtualizado] = await modelFilme.update(
            { nome_filme, nome_indicado, cod_categoria }, 
            { where: { cod_filme } }
        );

        if (!filmeAtualizado) {
            return res.status(404).json({
                errorStatus: true,
                mensageStatus: 'FILME NÃO ENCONTRADO'
            });
        }
        // Busca o filme atualizado para retornar na resposta.
        const filmeAtualizadoResponse = await modelFilme.findByPk(cod_filme);

        return res.status(200).json({
            errorStatus: false,
            mensageStatus: 'FILME ALTERADO COM SUCESSO',
            data: filmeAtualizadoResponse
        });
    } catch (error) {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO ALTERAR O FILME',
            errorObject: error
        });
    }
});

module.exports = router;
