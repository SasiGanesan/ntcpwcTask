const express = require('express');
const router = express.Router();
const sql = require('../config/detailsdb');

// router.get('/', (req, res) => {
//     res.render('form');
// });

const storage = multer.diskStorage({
    destination : function (req,file,cb){
        cb(null,'uploads/');
    },
    filename: function(req,file,cb){
        cb(null,Date.now()+Path2D.extname(file.originalname));
    }
});
const upload = multer({storage:storage});


//Render the form
app.get('add-details',(req,res)=>{
    res.render('add-details');
});

//Handle the form submission
app.post('/add-details',
    upload.single('candidateDetails'),
async(req,res)=>{
    const { wing, division, vacancyDate, advertisedDate, appointmentDate } = req.body;
    const candidateDetails = req.file.filename;
        try{
            const request = new sql.Request();
            const insertData=await request.query(`INSERT INTO detailsdb (Wing, Division, VacancyDate, AdvertisedDate, AppointmentDate, CandidateDetails) VALUES('${wing},${division},${vacancyDate},${advertisedDate},${appointmentDate},${candidateDetails})`);
            res.redirect('/add-details');
        }catch(err){
            console.error(err);
            res.send("Data not inserted")
        }
})

//Display All records
app.get('/details',async(req,res)=>{
    try{
        const request = new sql.Request();
        const result = await request.query('SELECT * FROM details');
        res.render('details',{data: result.recordset});

    }catch(error){
        console.log(error)
        res.send("error retrieving data")
    }
})

module.exports = router;
