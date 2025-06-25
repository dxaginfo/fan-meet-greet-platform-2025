/**
 * Initial database schema for Fan Meet & Greet Manager platform
 */
exports.up = function(knex) {
  return Promise.all([
    // Users table
    knex.schema.createTable('users', (table) => {
      table.uuid('id').primary();
      table.string('email').unique().notNullable();
      table.string('password_hash').notNullable();
      table.string('first_name');
      table.string('last_name');
      table.string('phone', 20);
      table.enum('user_type', ['artist', 'manager', 'staff', 'fan']).notNullable();
      table.timestamps(true, true);
    }),

    // Artists table
    knex.schema.createTable('artists', (table) => {
      table.uuid('id').primary();
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.string('artist_name').notNullable();
      table.text('bio');
      table.string('profile_image_url');
      table.timestamps(true, true);
    }),

    // Events table
    knex.schema.createTable('events', (table) => {
      table.uuid('id').primary();
      table.uuid('artist_id').references('id').inTable('artists').onDelete('CASCADE');
      table.string('venue_name').notNullable();
      table.text('venue_address');
      table.date('event_date').notNullable();
      table.time('start_time').notNullable();
      table.time('end_time').notNullable();
      table.integer('max_attendees');
      table.text('description');
      table.enum('status', ['scheduled', 'in-progress', 'completed', 'cancelled']).defaultTo('scheduled');
      table.timestamps(true, true);
    }),

    // Packages table
    knex.schema.createTable('packages', (table) => {
      table.uuid('id').primary();
      table.uuid('event_id').references('id').inTable('events').onDelete('CASCADE');
      table.string('name').notNullable();
      table.text('description');
      table.decimal('price', 10, 2);
      table.boolean('includes_photo').defaultTo(false);
      table.boolean('includes_autograph').defaultTo(false);
      table.boolean('includes_conversation').defaultTo(false);
      table.integer('max_duration_minutes');
      table.timestamps(true, true);
    }),

    // Registrations table
    knex.schema.createTable('registrations', (table) => {
      table.uuid('id').primary();
      table.uuid('event_id').references('id').inTable('events').onDelete('CASCADE');
      table.uuid('package_id').references('id').inTable('packages').onDelete('SET NULL');
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.enum('status', ['pending', 'approved', 'checked-in', 'completed', 'no-show']).defaultTo('pending');
      table.string('qr_code');
      table.text('notes');
      table.timestamp('registration_time');
      table.timestamp('check_in_time');
      table.timestamp('completion_time');
      table.timestamps(true, true);
    }),

    // Queue positions table
    knex.schema.createTable('queue_positions', (table) => {
      table.uuid('id').primary();
      table.uuid('event_id').references('id').inTable('events').onDelete('CASCADE');
      table.uuid('registration_id').references('id').inTable('registrations').onDelete('CASCADE');
      table.integer('position').notNullable();
      table.timestamp('estimated_time');
      table.enum('status', ['waiting', 'ready', 'in-progress', 'completed']).defaultTo('waiting');
      table.timestamps(true, true);
    }),

    // Merchandise distributions table
    knex.schema.createTable('merchandise_distributions', (table) => {
      table.uuid('id').primary();
      table.uuid('registration_id').references('id').inTable('registrations').onDelete('CASCADE');
      table.string('item_name').notNullable();
      table.integer('quantity').defaultTo(1);
      table.timestamp('distributed_at').notNullable();
      table.uuid('distributed_by').references('id').inTable('users');
      table.timestamps(true, true);
    }),

    // Photos table
    knex.schema.createTable('photos', (table) => {
      table.uuid('id').primary();
      table.uuid('registration_id').references('id').inTable('registrations').onDelete('CASCADE');
      table.string('photo_url').notNullable();
      table.string('thumbnail_url');
      table.timestamp('taken_at');
      table.enum('status', ['processing', 'available', 'delivered']).defaultTo('processing');
      table.timestamps(true, true);
    }),

    // Interactions table
    knex.schema.createTable('interactions', (table) => {
      table.uuid('id').primary();
      table.uuid('registration_id').references('id').inTable('registrations').onDelete('CASCADE');
      table.integer('duration_seconds');
      table.text('notes');
      table.boolean('is_vip').defaultTo(false);
      table.text('special_requests');
      table.timestamps(true, true);
    }),

    // Notifications table
    knex.schema.createTable('notifications', (table) => {
      table.uuid('id').primary();
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.uuid('event_id').references('id').inTable('events').onDelete('CASCADE');
      table.text('message').notNullable();
      table.enum('type', ['instruction', 'queue', 'thank-you']).notNullable();
      table.boolean('is_read').defaultTo(false);
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTableIfExists('notifications'),
    knex.schema.dropTableIfExists('interactions'),
    knex.schema.dropTableIfExists('photos'),
    knex.schema.dropTableIfExists('merchandise_distributions'),
    knex.schema.dropTableIfExists('queue_positions'),
    knex.schema.dropTableIfExists('registrations'),
    knex.schema.dropTableIfExists('packages'),
    knex.schema.dropTableIfExists('events'),
    knex.schema.dropTableIfExists('artists'),
    knex.schema.dropTableIfExists('users')
  ]);
};