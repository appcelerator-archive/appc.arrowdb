var APIBuilder = require('apibuilder');

module.exports = APIBuilder.Model.extend('acl',{
	fields: {
		created_at: { type: Date },
		name: { type: String },
		pretty_json: { type: Boolean },
		reader_ids: { type: Array },
		writer_ids: { type: Array },
		public_read: { type: Boolean },
		public_write: { type: Boolean },
		readers: { type: Array },
		updated_at: { type: Date },
		users: { type: Object },
		user_id: { type: String }
	}
});
