const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://testuser:testPassword@cluster0.whizl.mongodb.net/courses?retryWrites=true&w=majority')
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

createCourse(item1);



