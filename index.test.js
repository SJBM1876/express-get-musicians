const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const {seedMusician} = require("./seedData");
const syncSeed = require("./seed.js");

describe('GET /musicians', () => {
    it('should return all musicians', async () => {
        const response = await request(app).get('/musicians');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        // Add more checks based on the shape of your data, e.g.,:
        expect(response.body[0]).toHaveProperty('name');
        expect(response.body[0]).toHaveProperty('instrument');
    });
});
describe('GET /musicians/:id', () => {
    it('should return a musician by ID', async () => {
        const response = await request(app).get('/musicians/1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('instrument');
    });

    it('should return 404 if musician not found', async () => {
        const response = await request(app).get('/musicians/999');
        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe('Musician not found');
    });
});

describe('POST /musicians', () => {
    it('should create a new musician', async () => {
        const response = await request(app).post('/musicians').send({
            name: 'John Doe',
            instrument: 'Guitar'
        });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('name', 'John Doe');
        expect(response.body).toHaveProperty('instrument', 'Guitar');
    });
});

describe('PUT /musicians/:id', () => {
    it('should update a musician', async () => {
        const response = await request(app).put('/musicians/1').send({
            name: 'Updated Name',
            instrument: 'Drums'
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe('Updated Name');
    });
});

describe('DELETE /musicians/:id', () => {
    it('should delete a musician', async () => {
        const response = await request(app).delete('/musicians/1');
        expect(response.statusCode).toBe(204);
    });
});

describe('Musicians API', () => {
    it('should return all musicians', async () => {
        const response = await request(app).get('/musicians');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should create a new musician', async () => {
        const response = await request(app).post('/musicians').send({
            name: 'Test Musician',
            instrument: 'Piano'
        });
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe('Test Musician');
    });

    it('should return a musician by ID', async () => {
        const response = await request(app).get('/musicians/1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('name');
    });

    it('should update a musician', async () => {
        const response = await request(app).put('/musicians/1').send({
            name: 'Updated Musician',
            instrument: 'Guitar'
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe('Updated Musician');
    });

    it('should delete a musician', async () => {
        const response = await request(app).delete('/musicians/1');
        expect(response.statusCode).toBe(204);
    });
});

describe('Bands API', () => {
    it('should return all bands with musicians', async () => {
        const response = await request(app).get('/bands');
        expect(response.statusCode).toBe(200);
        expect(response.body[0]).toHaveProperty('musicians');
    });

    it('should return a band by ID with its musicians', async () => {
        const response = await request(app).get('/bands/1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('musicians');
    });
});








    

