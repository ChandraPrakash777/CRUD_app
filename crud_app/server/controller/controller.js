var Userdb = require('../model/model')

// create and save new user
exports.create = (req, res) => {
    // validate request
    if(!req.body){
        res.status(400).send({message : "Content can not be empty"});
        return;
    }

    // new user
    const user = new Userdb({
        name : req.body.name, //**when the user make post request i can access this name property from the body */
        email : req.body.email,
        gender : req.body.gender,
        status : req.body.status
    })

    // const [name, email, gender, status] = req.body; //It is giving TypeError
    // const user = new Userdb({
    //     name : name || 'abc',
    //     email : email || 'abc123',
    //     gender : gender,
    //     status : status
    // })

    // save user in the database
    user
        // .save(user) //The line user.save(user) is redundant, and it can be simplified to just user.save(), as Mongoose's save() method does not require passing the document as an argument. Therefore, user.save(user) and user.save() are equivalent in this context.
        .save() //this also works without 'user' parameter
        .then(data => {
            // res.send(data)
            res.redirect('/add-user')
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all users/ retrieve and return a single user
exports.find = (req, res) => {

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data => {
                if(!data){
                    res.status(404).send({ message: "Not Found user with id " + id })
                }else{
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({message : "Error retrieving user with id" + id})
            })

    }else{
        Userdb.find()
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({message : err.message || "Error occurred while retrieving user information"})
        })
    }
}

// Update a new indentified user by user id
exports.update = (req, res) => {
    if(!req.body){
        return res
            .status(400)
            .send({message : "Data to can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify : false})
        .then(data => {
            if(!data){
                res.status(404).send({message : `Cannot update user with id ${id}. Maybe user not found`})
            }else{
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({message : "Error Update user information"})
        })
}

// Delete a user with specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong` })
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message : "Could not delete User with id = " + id
            });
        });
}



