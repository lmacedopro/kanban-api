const Card = require('../models/Card');
const List = require('../models/List');
const { Op } = require('sequelize');

module.exports = {
    
    /*async index(req, res){
        const { page = 1 } = req.query; //controla o parametro de paginação por get
        const products = await Product.paginate({}, { page, limit: 10 });

        return res.json(products);
    },*/

    index(req, res){

        res.send({ ok: true, user: req.userId });
    },

    async listCreated(req, res){
        try{

            const cards = await Card.findAll({ where: { listId: 0, userId: req.userId }, order: ['index']});

            return res.send({ cards });
        }catch(err){
            console.log(err);
            return res.status(400).send({error: "Cannot list Cards!"});
        }
    },

    async list(req, res){

        try{

            const cards = await Card.findAll({ where: { listId: req.params.listid, userId: req.userId }, order: ['index']});

            return res.send({ cards });
        }catch(err){
            console.log(err);
            return res.status(400).send({error: "Cannot list Cards!"});
        }
    },

    async show(req, res){

        try{

            const card = await Card.findById(req.params.id).populate(['list','user']);

            return res.send({ card });

        }catch(err){
            return res.status(400).send({error: "Cannot retrieve this Card!"});
        }
    },

    async store(req, res){

        try{

            let nrec = await Card.findAndCountAll({ where: { userId: req.userId }});
            let index = nrec.count;

            //if(index <= 0)
        
            const card = await Card.create({ ...req.body, index, userId: req.userId }, { new: true });
    
            return res.send({ card });

        }catch(err){
            console.log(err);
            return res.status(400).send({error: "Cannot create the Card!"});
        }
    },

    async moveCard(req, res){
        
        try{
            
            const { draggedList, targetList, draggedIndex, targetIndex } = req.body;

            if( draggedList === targetList ){

                const draggedCard = await Card.findOne({ where: { listId: draggedList, index: draggedIndex, userId: req.userId}});
                const targetCard = await Card.findOne({ where: { listId: targetList, index: targetIndex, userId: req.userId }});

                const origTarget = targetCard.index;
                const origDragged = draggedCard.index;

                if(draggedCard.index < targetCard.index){

                    await Card.findAll({ where: { listId: draggedList, index: { [Op.lte]: targetIndex }, userId: req.userId }, order: ['index'] }).map( card => {
                        let index = card.get('index') - 1;
                        if( index <= 0)
                            index = 0
                        const id = card.get('id');
                        card.update({index}, {where: { id }});
                    });

                    await Card.update({ index: origTarget }, { where: { id: draggedCard.id }});

                    /*await Card.findAll({ where: { listId: draggedList, index: { [Op.gt]: origDragged }, userId: req.userId }, order: ['index'] }).map( card => {
                        const index = card.get('index') - 1;
                        const id = card.get('id');
                        card.update({index}, {where: { id }});
                    });*/
                    
                    return res.send({ msg: "movido para cima"});
                }

                await Card.findAll({ where: { listId: draggedList, index: { [Op.gte]: targetIndex }, userId: req.userId }, order: ['index'] }).map( card => {
                    const index = card.get('index') + 1;
                    const id = card.get('id');
                    card.update({index}, {where: { id }});
                });

                await Card.update({ index: origTarget }, { where: { id: draggedCard.id }});

                await Card.findAll({ where: { listId: draggedList, index: { [Op.gt]: origDragged }, userId: req.userId }, order: ['index'] }).map( card => {
                    const index = card.get('index') - 1;
                    const id = card.get('id');
                    card.update({index}, {where: { id }});
                });

                return res.send();
            }

            const draggedCard = await Card.findOne({ where: { listId: draggedList, index: draggedIndex, userId: req.userId}});
            const targettest = await Card.findAndCountAll({ where: { listId: targetList }});

            if( targetIndex === null ){ //move para o final da lista
                
                await Card.update({ index: targettest.count, listId: targetList }, { where: { id: draggedCard.id, userId: req.userId }});

                await Card.findAll({ where: { listId: draggedList, index: { [Op.gt]: draggedIndex }, userId: req.userId }, order: ['index'] }).map( card => {
                    const index = card.get('index') - 1;
                    const id = card.get('id');
                    card.update({index}, {where: { id }});
                });

                return res.send({ msg: "movido pro final da lista"})
            }

            await Card.findAll({ where: { listId: targetList, index: {[Op.gte]: targetIndex }, userId: req.userId }, order: ['index'] }).map( card => {
                const index = card.get('index') + 1;
                const id = card.get('id');
                card.update({index}, {where: {id}});
            });

            await Card.update({ index: targetIndex, listId: targetList }, { where: { id: draggedCard.id, userId: req.userId }});

            await Card.findAll({ where: { listId: draggedList, index: { [Op.gt]: draggedIndex }, userId: req.userId }, order: ['index'] }).map( card => {
                const index = card.get('index') - 1;
                const id = card.get('id');
                card.update({index}, {where: { id }});
            }); 
     

            return res.send({ msg: "Movido para outra lista" });      

        }catch(err){
            console.log(err);
            return res.status(400).send({error: "Cannot move the Card!"});
        }
        
    },

    async destroy(req, res){

        try{

            const card = await Card.findById(req.params.id).populate(['list','user']);
            const user = card.user.id;

            if(user !== req.userId)
                return res.status(400).send({error: "The User must be Owner to delete the Card!"});
            
            
            await Card.findByIdAndRemove(req.params.id);
            return res.send();

        }catch(err){
            return res.status(400).send({error: "Cannot delete the Card!"});
        } 
    },

};