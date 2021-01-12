module.exports = {
    clientId: 'parcel-manager',
    kafka_topic: 'parcels',
    brokers: ['kafka:9092'],
    connectionTimeout: 3000,
    authenticationTimeout: 1000,
    reauthenticationThreshold: 10000,
};