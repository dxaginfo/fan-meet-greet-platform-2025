const db = require('../knex');
const { v4: uuidv4 } = require('uuid');

class Event {
  /**
   * Get all events with optional filtering
   * @param {Object} filters - Optional filters
   * @returns {Promise<Array>} Array of events
   */
  static async getAll(filters = {}) {
    const query = db('events')
      .join('artists', 'events.artist_id', '=', 'artists.id')
      .select(
        'events.*',
        'artists.artist_name',
        'artists.profile_image_url'
      );

    // Apply filters if provided
    if (filters.status) {
      query.where('events.status', filters.status);
    }

    if (filters.artistId) {
      query.where('events.artist_id', filters.artistId);
    }

    if (filters.fromDate) {
      query.where('events.event_date', '>=', filters.fromDate);
    }

    if (filters.toDate) {
      query.where('events.event_date', '<=', filters.toDate);
    }

    // Sort by date (newest first by default)
    query.orderBy('events.event_date', filters.sortDirection || 'desc');

    return query;
  }

  /**
   * Get event by ID
   * @param {string} id - Event ID
   * @returns {Promise<Object>} Event object
   */
  static async getById(id) {
    return db('events')
      .join('artists', 'events.artist_id', '=', 'artists.id')
      .select(
        'events.*',
        'artists.artist_name',
        'artists.profile_image_url'
      )
      .where('events.id', id)
      .first();
  }

  /**
   * Create new event
   * @param {Object} eventData - Event data
   * @returns {Promise<Object>} Created event
   */
  static async create(eventData) {
    const id = eventData.id || uuidv4();
    const newEvent = {
      id,
      ...eventData,
      created_at: new Date(),
      updated_at: new Date()
    };

    await db('events').insert(newEvent);
    return this.getById(id);
  }

  /**
   * Update event
   * @param {string} id - Event ID
   * @param {Object} eventData - Updated event data
   * @returns {Promise<Object>} Updated event
   */
  static async update(id, eventData) {
    const updateData = {
      ...eventData,
      updated_at: new Date()
    };

    await db('events')
      .where('id', id)
      .update(updateData);

    return this.getById(id);
  }

  /**
   * Delete event
   * @param {string} id - Event ID
   * @returns {Promise<boolean>} Success status
   */
  static async delete(id) {
    const result = await db('events')
      .where('id', id)
      .del();
    
    return result > 0;
  }

  /**
   * Get event attendee count
   * @param {string} id - Event ID
   * @returns {Promise<number>} Count of attendees
   */
  static async getAttendeeCount(id) {
    const result = await db('registrations')
      .count('id as count')
      .where('event_id', id)
      .whereIn('status', ['approved', 'checked-in', 'completed'])
      .first();
    
    return parseInt(result.count, 10);
  }

  /**
   * Get packages for an event
   * @param {string} id - Event ID
   * @returns {Promise<Array>} Array of packages
   */
  static async getPackages(id) {
    return db('packages')
      .where('event_id', id)
      .orderBy('price', 'asc');
  }
}

module.exports = Event;