const express = require('express');
const multer = require('multer');
const path = require('path');
const sql = require('../config/dbconfig');

const router = express.Router();

//diskStorage = localStorage
//cb-callback function
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req,file,cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({storage:storage});


// Render the form
// router.get('/add-details',(req,res)=>{
//     res.render('add-details');
// });


//Handle the form submission
router.post('/add-details',
    upload.single('candidateDetails'),
async(req,res)=>{
    const { Wing, Division, PostStatus,DateAriseVacancy,DateVacancyAdvertised, DateAppointment} = req.body;
    const CandidateDetails = req.file.fieldname;
    
        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).send("No file uploaded");
        }
    try{

             // Connect to the database
            await sql.connect();

            // Create a request to perform operations
            const request = new sql.Request();

            await request.query(`INSERT INTO detailsdb (Wing, Division,PostStatus,DateAriseVacancy,DateVacancyAdvertised, DateAppointment, CandidateDetails)
                 VALUES('${Wing},${Division},${PostStatus},${DateAriseVacancy},${DateVacancyAdvertised},${DateAppointment},${CandidateDetails})`);
            res.redirect('/add-details');
        }catch(err){
            console.error('Database connection error:', err);
            res.send("Data not inserted")
        }
});

//Display All records
router.get('/details',async(req,res)=>{
    try{
        await sql.connect();
        const request = new sql.sql.Request();
        const result = await request.query('SELECT * FROM details');
        res.render('details',{data: result.recordset});

    }catch(error){
        console.log(error)
        res.send("error retrieving data")
    }
});

module.exports = router;
