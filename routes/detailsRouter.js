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

router.post('/upload', upload.single('candidateDetails'), async (req, res) => {
    const { wing, division, postStatus, vacancyDate, advertiseDate, appointmentDate } = req.body;
    // console.log("Received data:", wing, division, postStatus, vacancyDate, advertiseDate, appointmentDate);

    let candidateDetails = null; 
    if (req.file) {
        candidateDetails = `/upload/images/${req.file.filename}`;
        console.log("File uploaded:", req.file.filename);
    } else {
        console.log("No file uploaded");
    }

    try {
        const conn = await sql.connect();
        const request = conn.request();

        let query = `INSERT INTO details (Wing, Division, PostStatus, DateAriseVacancy, DateVacancyAdvertised, DateAppointment, CandidateDetails)
                     VALUES ('${wing}', '${division}', '${postStatus}', '${vacancyDate}', '${advertiseDate}', '${appointmentDate}', '${candidateDetails}')`;
        const result = await request.query(query);
        // console.log(result);

        res.send('Upload successful');
    } catch (err) {
        console.error('Database connection error:', err);
        res.status(500).send("Data not inserted");
    }
});


module.exports = router;



//Handle the form submission
// router.post('/', upload.single('candidateDetails'),
// async(req,res)=>{
//     const { wing, division, postStatus,vacancyDate,advertiseDate, appointmentDate} = req.body;
//     console.log("wing, division, postStatus,vacancyDate,advertiseDate, appointmentDate",wing, division, postStatus,vacancyDate,advertiseDate, appointmentDate);
//     const candidateDetails = `/uploads/${req.file.filename}`;
    
//         // Check if file was uploaded
//         if (!req.file) {
//             return res.status(400).send("No file uploaded");
//         }
//     try{

//              // Connect to the database
//             await sql.connect();

//             // Create a request to perform operations
//             const request = new sql.Request();

//             let query = `INSERT INTO detailsdb (wing, division,PostStatus,vacancyDate,advertiseDate, appointmentDate, candidateDetails)
//                  VALUES('${wing},${division},${postStatus},${vacancyDate},${advertiseDate},${appointmentDate},${candidateDetails})`
//             const result = await request.query(query);
//             console.log(result);

//             res.send('Upload successful');
//             // res.redirect('/add-details');
//         }catch(err){
//             console.error('Database connection error:', err);
//             res.send("Data not inserted")
//         }
// });
