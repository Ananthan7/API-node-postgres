const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db")

// middleware
app.use(cors());
app.use(express.json());

// create a student

app.post("/student", async(req,res)=>{
    try {
        const { name,subject,rol_no } = req.body;
        const newStudent = await pool.query("INSERT INTO student (name,subject,rol_no) VALUES($1, $2, $3) RETURNING *", [name, subject,rol_no]);
        res.json(newStudent.rows[0]);
    } catch (error) {
        console.log(error);
        
    }
})

// get all students
app.get("/getStudent", async(req,res)=>{
    try {
        const data = await pool.query("SELECT * FROM student");
        res.json(data.rows);
    } catch (error) {
        console.log(error);
        
    }
})

// get student with id
app.get('/getStudent/:id',async(req,res)=>{
    try {
        const {id} = req.params
        const idData = await pool.query("SELECT * FROM student WHERE id = $1", [id]);
        res.json(idData.rows);
    } catch (error) 
    {
        console.log(error);
    }
})

// update a student

app.put("/updateStudent/:id", async(req,res)=>{
    try {
        const { id } = req.params;
        const { name } = req.body;
        const newName = await pool.query("UPDATE student SET name = $1 WHERE id = $2", [name, id]);
        res.json("updated");
    } catch (error) 
    {
        console.log(error);
    }
})

// delete Todo 

app.delete("/deleteStudent/:id", async(req,res)=>{
    try {
        const { id } = req.params;
        const deleteStudent = await pool.query("DELETE FROM student WHERE id = $1", [id]);
        res.json("DELETED");
    } catch (error) 
    {
        console.log(error);
    }
})


app.listen(3000,()=>{
    console.log("server started at 3000");
    // start command npm start
})