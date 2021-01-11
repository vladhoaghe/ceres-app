const express = require('express');
const router = express.Router();
const Parcel = require('../models/Parcel');
const { Kafka } = require('kafkajs');
const kafkaConfig = require('../config/kafka');

// Get a Kafka producer
const kafka = new Kafka(kafkaConfig);
const kafkaProducer = kafka.producer();

router.post('/:userId', async (req, res) => {
    const parcelCollection = req.body;
    const crs = parcelCollection.crs;

    const parcels = parcelCollection.features.map(parcel => {
        return {
            uid: req.params.userId,
            type: parcel.type,
            crs: crs,
            properties: parcel.properties,
            geometry: parcel.geometry,
            data: []
        }
    })

    // Save parcels to Database
    let parcelDocuments;
    try {
        parcelDocuments = await Parcel.create(parcels);
    } catch(err) {
        res.status(500);
    }

    // Send parcels to Kafka for async processing
    try {
        await kafkaProducer.connect();

        parcelDocuments.forEach((parcelDocument) => {
            kafkaProducer.send({
                topic: kafkaConfig.kafka_topic,
                messages: [{value: JSON.stringify(parcelDocument)}]
            })
            .then(() => {
                console.log("Message sent");
            })
            .catch(err => {
                console.log(err);
            })
        });

        kafkaProducer.disconnect();
    } catch(err) {
        res.status(500);
    }

    // Return response to user
    res.json(parcelDocuments);
});

router.get('/:userId', (req, res) => {
    console.log(req.params.userId)
    Parcel.find({uid: req.params.userId})
    .then(parcels => {
        res.json(parcels);
    })
    .catch(err => {
        console.log(err);
        res.status(500);
    })
}); 

router.get('/:userId/:parcelID', (req, res) => {
    Parcel.findById(req.params.parcelID)
    .then(parcel => {
        res.json(parcel)
    })
    .catch(err => {
        console.log(err);
        res.status(500);
    })
});

router.patch('/:userID/:parcelID', (req, res) => {
    const data = req.body;
    console.log(req.body);
    console.log(data)

    Parcel.findByIdAndUpdate(
        req.params.parcelID, 
        {$push: {data: data}},
        {new: true}
    )
    .then(parcel => {
        res.json(parcel)
    })
    .catch(err => {
        console.log(err)
        res.status(500);
    })
})

module.exports = router;
