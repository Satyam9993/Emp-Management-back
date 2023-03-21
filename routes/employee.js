const Employee = require("../models/Employee");
const Eid = require("../models/EId");

exports.createEmployee = async (req, res) => {
    try {
        if (!req.body.name || !req.body.department || !req.body.status || !req.body.location || !req.body.dob) {
            return res
                .status(400)
                .json({ success: false, errmsg: "Some data is missing" });
        }

        await Eid.findById({ _id: process.env.EMP_ID }).then(async (ID) => {
            emp = await Employee.create({
                eId: (ID.eId + 1),
                name: req.body.name,
                dob: new Date(req.body.dob),
                department: req.body.department,
                status: req.body.status,
                location: req.body.location
            }).then(async (u) => {
                console.log("Emp created Succesfully");
                res.status(200).send({ success: true });
                await Eid.findByIdAndUpdate({ _id: process.env.EMP_ID }, { $set: { "eId": (ID.eId + 1) } });
            }).catch((err) => {
                res.status(403).send({ success: false, errmsg: err });
            })
        }).catch((err) => {
            res.status(403).send({ success: false, errmsg: err });
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ success: false, error: "server error" });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById({_id : req.body.eId});
        console.log(employee);
        if (!employee) {
            return res
                .status(402)
                .json({ success: false, errmsg: "Some data is missing" });
        }

        if (!req.body.name || !req.body.department || !req.body.status || !req.body.location || !req.body.dob) {
            return res
                .status(400)
                .json({ success: false, errmsg: "Some data is missing" });
        }

        const emps = await Employee.findByIdAndUpdate({_id:req.body.eId}, {
            $set :{
                name: req.body.name,
                dob: new Date(req.body.dob),
                department: req.body.department,
                status: req.body.status,
                location: req.body.location
            }
        });

        await emps.save();
        res.status(200).send({ success: true, employee : emps });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ success: false, error: "server error" });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById({_id : req.body.eId});
        if (!employee) {
            return res
                .status(402)
                .json({ success: false, errmsg: "Some data is missing" });
        }

        const emps = await Employee.findByIdAndDelete({_id:req.body.eId});
        if(emps){
            res.status(200).send({ success: true });
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ success: false, error: "server error" });
    }
};

exports.getAllEmployee = async (req, res) => {
    try {
        const emps = await Employee.find();
        res.status(200).send({ "employees": emps });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ success: false, error: "server error" });
    }
};