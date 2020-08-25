const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://testuser:testPassword@cluster0.whizl.mongodb.net/playground?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Cannot connect to MongoDB', err));

const courseSchema = new mongoose.Schema({
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
        .find({author: 'Mosh'})
        .skip((pageNumber-1) * pageSize)
        .limit(pageSize)
        .sort({name: 1})
        .select({name: 1, price: 1, tags: 1, author: 1, isPublished: 1});

    console.log(course);
}

getCourses();


