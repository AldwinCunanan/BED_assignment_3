import * as eventService from '../src/api/v1/services/eventServices';
import * as firestoreRepository from '../src/api/v1/repositories/firestoreRepository';
import { Post } from "../src/api/v1/models/postModels"
import { db } from '../config/firebaseConfig';
import { mock } from 'node:test';

jest.mock('../config/firebaseConfig', () => ({
  db: {
    runTransaction: jest.fn(),
    collection: jest.fn()
  }
}));

describe('Event Services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Event Service - CreatePost', () => {
    it('should create a new event successfully', async () => {
      // Arrange
      const mockInput = {
        name: 'Tech Conference',
        date: new Date('2026-12-15T09:00:00Z'),
        category: 'conference',
        capacity: 100,
        registrationCount: 0,
        status: 'active'
      };

      const mockId = 'evt_000001';

      // mock the set function inside a document reference
      const mockSet = jest.fn();
      const mockDoc = jest.fn(() => ({ set: mockSet }));

      // mock db.collection() to return an object with doc()
      (db.collection as jest.Mock).mockReturnValue({
        doc: mockDoc
      });

      // mock runTransaction to call the callback with a fake transaction
      (db.runTransaction as jest.Mock).mockImplementation(async (callback: any) => {
        return await callback({
          get: jest.fn().mockResolvedValue({ exists: false, data: () => ({ lastId: 0 }) }),
          set: mockSet
        });
      });

      // Act
      const result = await eventService.createPost(mockInput);

      // Assert
      expect(result).toEqual(expect.objectContaining({
        id: expect.any(String),
        name: mockInput.name,
        date: mockInput.date,
        category: mockInput.category,
        capacity: mockInput.capacity,
        registrationCount: mockInput.registrationCount,
        status: mockInput.status,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      }));
    });
  });
});