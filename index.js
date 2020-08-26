const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://testuser:testPassword@cluster0.whizl.mongodb.net/playground?retryWrites=true&w=majority')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Cannot connect to MongoDB', err));

const courseSchema = new mongoose.Schema({
    _id: String,
    name: String,
    auther: String,
    tags: [String],
    date: { type: Date, default: Date.now},
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse(courseitem){
    const course = new Course(courseitem)
    
    const result = await course.save();
    console.log(result);
};

const item1 = {
        name: 'English Course',
        auther: 'Chird',
        tags: ['node', 'beginner'],
        isPublished: true
}

//createCourse(item1);
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


//Query and update
async function updateCourses(id) {
    const course = await Course.findById(id);
    
    if(!course) return;

    course.isPublished = true;
    course.author = "Chirdchai";    

    const result = await course.save();
}

//Update Directly

async function updateCourses2(id) {
    const result = await Course.update( {name: id} , {
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




updateCourses('5a68fdf95db93f6477053ddd');


