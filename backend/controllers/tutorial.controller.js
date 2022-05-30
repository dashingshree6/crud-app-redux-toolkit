const db = require('../models/index')
const Tutorial = db.tutorials

// Create and save  new tutorial
exports.create = (req, res) => {

    //Validate request
    if (!req.body.title) {
        res.status(400).send({ message : 'Content cannot be empty' })
    }
    //Create a tutorial
    const tutorial = new Tutorial({
        title : req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false 
    })
    //Save tutorial in the database
    tutorial.save(tutorial).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message : err.message || 'Some error occured while creating tutorial'
        })
    })
}

exports.findAll = (req,res) => {
    const title = req.query.title
    var condition = title ? { title : { $regex : new RegExp(title), $options : 'i' }} :
    Tutorial.find(condition).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message : err.message || 'Some error occured while retrieving tutorials'
        })
    })
}

exports.findOne = (req,res) => {
    const id = req.params.id
    Tutorial.findById(id).then(data => {
        if (!data) {
            res.status(404).send({
                message : 'Not found tutorial with id '+id
            })
        } else {
            res.send(data)
        }
    }).catch(err => {
        res.status(500).send({
            message : err.message || 'Error retrieving tutorial with id '+id
        })
    })
}


exports.update = (req,res) => {

    if(!req.body) {
        res.status(400).send({ message : 'Data to be updated cannot be empty'})
    }

    const id = req.params.id
    Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify : false }).then(data => {
        if (!data) {
            res.status(404).send({
                message : 'Cannot update tutorial with id '+id
            })
        } else {
            res.send({
                message : 'Tutorial updated successfully'
            })
        }
    }).catch(err => {
        res.status(500).send({
            message : err.message || 'Error updating tutorial with id '+id
        })
    })
}

exports.delete = (req,res) => {
    const id = req.params.id
    Tutorial.findByIdAndRemove(id).then(data => {
        if (!data) {
            res.status(404).send({
                message : 'Cannot delete tutorial with id '+id
            })
        } else {
            res.send({
                message : 'Tutorial deleted successfully'
            })
        }
    }).catch(err => {
        res.status(500).send({
            message : 'Error while deleting tutorial with id '+id
        })
    })
}

exports.deleteAll = (req,res) => {
    Tutorial.deleteMany({}).then(data => {
        res.send({
            message : 'All tutorials were deleted successfully'
        })
    }).catch(err => {
        res.status(500).send({
            message : err.message || 'Some error occured while deleting all tutorials'
        })
    })
}

exports.findAllPublished = (req,res) => {
    Tutorial.find({ published : true}).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message : err.message || 'Some error occured while retrieving tutorials'
        })
    })
}


