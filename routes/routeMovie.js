const express = require('express');

const modelMovie = require('../model/modelMovie');

const router = express.Router();

router.get('/',(req, res)=>{
    return res.status(200).json({status:'TESTE CONEXÃO API'});
});

router.post('/inserirFilme', (req, res)=>{

    let { cod_categoria, nome_filme,nome_indicado} = req.body;

    modelMovie.create(
        {

            cod_categoria,
            nome_filme,
            nome_indicado
        }
    )
    .then(
        ()=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'FILME INSERIDO COM SUCESSO'
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO INSERIR O FILME',
                errorObject:error
            }
        );
    });
});

router.get('/listagemFilmes', (req, res)=>{

    modelMovie.findAll()
    .then(
        (response)=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'FILMES LISTADOS COM SUCESSO',
                    data:response
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO LISTAR OS FILMES',
                errorObject:error
            }
        );
    });
});
router.get('/listagemFilme/:cod_filme', (req, res)=>{

    let { cod_filme } = req.params;

    modelMovie.findByPk(cod_filme)
    .then(
        (response)=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'FILME RECUPERADO COM SUCESSO',
                    data:response
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO RECUPERAR O FILME',
                errorObject:error
            }
        );
    });

});

router.delete('/excluirFilme/:cod_filme', (req, res)=>{

    let { cod_filme } = req.params;

    modelMovie.destroy(
        {where:{cod_filme}}
    ).then(
        ()=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'FILME EXCLUIDO COM SUCESSO'
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO EXCLUIR O FILME',
                errorObject:error
            }
        );
    });
});
router.put('/alterarFilme', (req, res)=>{

    let { cod_filme, nome_filme,nome_indicado} = req.body;

    modelLivro.update(
        {
            cod_filme,
            nome_filme,
            nome_indicado
        },
        {where:{cod_filme}}
    ).then(
        ()=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'FILME ALTERADO COM SUCESSO'
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO ALTERAR O FILME',
                errorObject:error
            }
        );
    });

});

module.exports = router;