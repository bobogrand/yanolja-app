// global.d.ts
import { MongoClient } from 'mongodb';

declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}


// 이 파일이 모듈로 인식되도록 하는 코드 (중복 타입 오류 방지)
export {};


