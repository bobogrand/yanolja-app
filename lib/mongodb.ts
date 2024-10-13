// lib/mongodb.js
import {MongoClient} from 'mongodb';

const uri = process.env.mongo_uri;
const options = {
        auth: {
            username: process.env.mongo_user,
            password: process.env.mongo_password,
        }
    }
;

let client : MongoClient;
let clientPromise : Promise<MongoClient>;

if (!process.env.mongo_uri) {
    throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === 'development') {
    // 개발 환경에서는 전역 변수를 사용하여 MongoDB 연결을 재사용
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // 프로덕션에서는 MongoClient 연결을 캐싱
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;
