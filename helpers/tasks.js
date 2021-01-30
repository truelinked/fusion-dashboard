var celery = require('node-celery');

client = celery.createClient({
    CELERY_BROKER_URL: 'amqp://guest:guest@localhost:5672//',
    CELERY_RESULT_BACKEND: 'amqp://'
});

client.on('error', function(err) {
    console.log(err);
});

client.on('connect', function() {
    client.call('mytask', ['Hello World!'], function(result) {
        console.log(result);
        client.end();
    });
});

module.exports = client;