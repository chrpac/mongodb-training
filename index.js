const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://testuser:testPassword@cluster0.whizl.mongodb.net/playground?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Cannot connect to MongoDB', err));

const courseSchema = new mongoose.Schema({
    name: { 
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true 
    },
    author: String,
    tags: [String],
    date: Date,
    isPublished: Boolean,
    Price: Number
});

const Course = mongoose.model('Course', courseSchema, 'courses');

async function createCourse(courseitem){
    const course = new Course(courseitem)
    try {
        const result = await course.save();
        console.log(result);
    }
    catch(ex){
        console.log(ex.message);
    }
    
};

const item1 = {
        //name: 'My New Course',
        author: 'Chirdchai Dam',
        tags: ['react', 'beginner'],
        isPublished: true,
        price: 20
}

createCourse(item1);
async function getCourses(){
    const pageNumber = 1;
    const pageSize = 3;

    const course = await Course
        .find({ author: 'Mosh' })
        .skip((pageNumber-1) * pageSize)
        .limit(pageSize)
        .sort({name: 1})
        .select({name: 1, price: 1, tags: 1, author: 1, isPublished: 1});

    console.log(course);
}

async function getCourses2(){
    const course = await Course.find()
    console.log(course)
}


//Query and update
async function updateCourses(id) {
    const course = await Course.findById(id);
    
    if(!course) return;

    course.isPublished = true;
    course.author = 'Chirdchai';
    course.price = 15;   
    console.log(course) 

    const result = await course.save();
    console.log(result);
}

//Update Directly

async function updateCourses2(id) {
    const result = await Course.update( {_id: id} , {
        $set: {
            author: 'Chirdchai',
            isPublished: false
        }
    } );
    
    console.log(result);
}

//Remove 1 Document 

async function removeCourses1(id){
    const result = await Course.deleteOne({_id: id})
    console.log(reult)
}

async function removeCourses3(id){
    const result = await Course.findByIdAndRemove(id)
    console.log(reult)
}

//Remove Many Documents
async function removeCourses2(id){
    const result = await Course.deleteMany({_id: id})
    console.log(reult)
}




//updateCourses('5f4782e07b332558fc48fd8d');
//getCourses2();

