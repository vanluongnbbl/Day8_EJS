const express = require('express')
const reload = require('reload')

const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {cb(null, './public')},
    filename: (req, file, cb) => cb(null, Date.now() + file.originalname) 
})

function fileFilter(req, file, cb) {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
        return cb(null, true)
    }
    cb(new Error('File must be PNG or JPG'))
}

const limits = { fileSize: 102400}

const upload = multer({storage, limits, fileFilter})

const app = express()

app.set('views', './views')
app.set('view engine', 'ejs')

const arrPeople = [
    {name: 'Ti', age: 19},
    {name: 'Teo', age: 20},
    {name: 'To', age: 21},
]
app.locals.arrPeople = arrPeople
   
const arrSubjects = ['Mongo', 'Express', 'Angular', 'Nodejs']
// app.locals.arrSubject = arrSubjects

app.get('/', (req, res) => res.render('home.ejs'))
app.post('/signup', upload.single('profile'), (req, res) => {
    res.send(req.body)
})

app.get('/learn', (req, res) => res.render('learn.ejs', {username: 'Luong Course', arrSubject: arrSubjects}))

reload(app)

app.listen(3000, () => console.log('server running on port 3000'))

