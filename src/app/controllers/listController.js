const List = require('../models/List');
const Card = require('../models/Card');

module.exports = {
    
    /*async index(req, res){
        const { page = 1 } = req.query; //controla o parametro de paginação por get
        const products = await Product.paginate({}, { page, limit: 10 });

        return res.json(products);
    },*/

    index(req, res){

        res.send({ ok: true, user: req.userId });
    },

    async list(req, res){
        try{

            List.hasMany(Card, { foreigKey: 'listId' });
            const lists = await List.findAll({ where: { userId: req.userId }, include: Card, order: [
                [Card, 'index']
              ]});

            return res.send({ lists });
        }catch(err){
            console.log(err);
            return res.status(400).send({error: "Cannot List!"});
        }
    },

    async show(req, res){

        try{

            const list = await List.findById(req.params.id).populate(['cards','user']);

            return res.send({ list });

        }catch(err){
            return res.status(400).send({error: "Cannot retrieve this List!"});
        }
    },

    async store(req, res){

        try{

            const list = await List.create({ ...req.body, userId: req.userId });
            return res.send(list);

        }catch(err){

            return res.status(400).send({error: "Cannot create the item List!"});
        }
    },

    async update(req, res){
        
        const list = await List.findByPk(req.params.id, req.body, {new: true});

        return res.json(list);
    },

    async destroy(req, res){

        try{

            const list = await List.findById(req.params.id).populate('user');
            const user = list.user.id;

            if(user !== req.userId)
                return res.status(400).send({error: "The User must be Owner to delete the List!"});
            
            
            await List.findByIdAndRemove(req.params.id);
            return res.send();

        }catch(err){
            return res.status(400).send({error: "Cannot delete the list!"});
        } 
    },
};