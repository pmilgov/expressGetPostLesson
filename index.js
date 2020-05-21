const express = require('express')
const app = express()
const port = 3000

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const fs = require('fs')
const students = JSON.parse(fs.readFileSync('students.json'))

// GET student - returns a list of all students
//app.get("/students", (req,res) => res.json(students))
app.get("/students", (req, res) => {
    var result = { students }

    if (req.query.firstName && req.query.lastName) {
        result = students.filter(student => {
            return student.lastName === req.query.lastName && student.firstName === req.query.firstName
        })
        console.log(result)
    } else if (req.query.lastName) {
        result = students.filter(student => {
            return student.lastName === req.query.lastName
        })
    } else if (req.query.firstName) {
        result = students.filter(student => {
            return student.firstName === req.query.firstName
        })
    } else {
        result == { students }
    }
    res.json(result)
})

// GET - return details of a specific student id
app.get("/students/:id", (req, res) => {
    var result = students.filter(student => {
        return student.studentId == req.params.id

    })
    res.json(result)
})

// GET - return all grades for a given student by student id
app.get("/grades/:studentId", (req, res) => {
    var result = students.filter(student => {
        return student.studentId == req.params.studentId

    })
    // assuming only one student with id (unique id)
    console.log(result[0].grades)
    res.json(result[0].grades)
})

// POST - record a new grade for a student
app.post("/grade", jsonParser, (req, res) => {
    console.log("POST grade for studentId")
    console.log(req.body)
    var studentId = req.body.studentId
    var grade = req.body.grade

    if (studentId && grade) {
        console.log("I have a studentId and a grade")
        res.status(200).send("Everything is good")
    } else if (studentId) {
        console.log("I only have a studentId")
        res.status(201).send("Missing grade for student")
    } else if (grade) {
        console.log("I only have a grade")
        res.status(201).send("Missing studentId for student")
    } else {
        console.log("I am missing both")
        res.status(201).send("Missing both studentId and grade")
    }
})

// POST register - create a new user
app.post('/register', jsonParser, (req, res) => {

    console.log("POST register new user")
    console.log(req.body)

    var studentId = 5
    var firstName = req.body.firstName
    var lastName = req.body.lastName
    var email = req.body.email
    var student

    if (firstName && lastName && email) {
        //register the student -- write the student to the students.json file
        students.push({ "studentId": studentId, "firstName": firstName, "lastName": lastName, "email": email })
        fs.writeFile('students.json', JSON.stringify(students), (err) => { 
            if (err) 
              console.log(err); 
            else { 
              console.log("File written successfully\n"); 

            } 
          }); 

        res.status(200).send("Student information is good - student is now registered")
    } else if (firstName & lastName) {
        // Student is missing email
        res.status(201).send("Student is missing email. Please provide an email")
    } else if ((email & firstName) || (email && lastName)) {
        res.status(202).send("Please provide full Name")
    } else {
        res.status(210).send("Please provide first name, last name, and email")
    }
})

app.listen(port, () => console.log('Example app listening at http://localhost:3000'))
