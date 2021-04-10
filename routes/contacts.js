const express = require("express");
const { check, validationResult } = require("express-validator");

const auth = require("../middleware/auth");

const route = express.Router();

const User = require("../models/User");
const Contact = require("../models/Contact");

//@api          Get /api/contacts
//@desc         get all contacts
//@access       Private
route.get("/", auth, async (req, res) => {
    try {
        const contacts = await Contact.find({user: req.user.id});
        res.json(contacts);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "there was an error" });
    }
});


//@api          Post /api/contacts
//@desc         create a new contact
//@access       Private
route.post("/", [
    auth,
    [
        check("name", "please add a name for the contact").not().isEmpty()
    ]
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(500).json(errors.array());
    }

    const { name, email, phone, type, user } = req.body;

    try {   

        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        });

        const contact = await newContact.save();
        return res.json(contact);
        
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({msg: "there is an error"})
    }

    
});



//@api          Put /api/contacts/:id
//@desc         update a contact
//@access       Private
route.put("/:id", auth, async (req, res) => {
    let updateContact = {}

    const { name, email, phone, type } = req.body;

    if (name) updateContact.name = name;
    if (email) updateContact.email = email;
    if (phone) updateContact.phone = phone;
    if (type) updateContact.type = type;

    try {
        // fetch the user form the database
        let contact = await Contact.findById(req.params.id)
        // check if the user is authorized to update the contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "you're not authorized to update this contact" });
        } else {
            contact = await Contact.findByIdAndUpdate(req.params.id, { $set: updateContact}, {new: true});
            return res.json(contact);
        }
        
    } catch (err) {
        console.log(err.message)
        return res.json({ msg: "there is an error" })
    }
});



//@api          delete /api/contacts/:id
//@desc         delete a contact
//@access       Private
route.delete("/:id", auth, async (req, res) => {
    try {
        // fetch the contact form the database
        let contact = await Contact.findById(req.params.id);
        // check for the current user
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "unAuthorized to delete this contact" });
        } else {
            await Contact.findByIdAndRemove(req.params.id);
            return res.json({ msg: "contact deleted successfully" });
        }
    } catch (err) {
        console.log(err.message);
        return res.json({ msg: "there is an error" });
    }
});

module.exports = route;