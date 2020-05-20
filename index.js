const express = require('express')
const app = express()
const port = 3000

const fs = require('fs')
const students = JSON.parse(fs.readFileSync('students.json'))

//Create a list of students (just firstName and lastName)
const studentList = students.map(student => {
    return student.firstName + " " + student.lastName
})

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
        result == {students}
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

// POST register - create a new user


app.listen(port, () => console.log('Example app listening at http://localhost:3000'))
