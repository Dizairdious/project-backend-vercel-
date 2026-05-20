const mongoose = require('mongoose');

const ItinerarySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  activity: { type: String, required: true },
  location: { type: String, required: true },
  cost: { type: Number, default: 0 }
});

const TripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  destination: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalBudget: { type: Number, required: true },
  currency: { type: String, default: 'USD' }, // Supports dynamic multi-currency display
  mapEmbedUrl: { type: String }, // Stores structural coordinate links
  itineraries: [ItinerarySchema]
}, { timestamps: true });

module.exports = mongoose.model('Trip', TripSchema);