const http = require('http');
const app = require('./app.js');
require('dotenv').config()

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1';
const server = http.createServer(app);
server.listen(Number(PORT), HOST, () => {
    console.log(`Server listening on port ${PORT} for ${HOST}`);
});

const { Classes, Topic } = require('./db/models');

(async function(){
    try {
        // const newClass1 = { title: "Test1"}
        // const createdClass1 = Classes.create(newClass1);

        // const newClass2 = { title: "Test2"}
        // const createdClass2 = Classes.create(newClass2);
        
        // const newTopic1 = { caption: "HTML", classId: 1}
        // const createTopic1 = Topic.create(newTopic1);

        // const newTopic2 = { caption: "CSS", classId: 1}
        // const createdTopic2 = Topic.create(newTopic2);
        // const classWithTopics = await Classes.findAll({include: Topic, raw: true});
        // const topics = await Topic.findAll({include: Classes, raw: true});

        // const class1 = await Classes.findByPk(1)
        // const topicsByClass1 = await class1.getTopics();
        // console.log('topicsByClass1', topicsByClass1)

        // const topic1 = await Topic.findByPk(1)
        // const classByTopic1 = await topic1.getClass()
        // console.log('classByTopic1', classByTopic1)

        // console.log(topics)
     } catch (error) {
        console.log('error', error)
    }
})()
