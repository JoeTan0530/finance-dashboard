const app = require('./app');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;

// MongoDB Connection
// Only connect when running the server directly
if (require.main == module) {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('✅ Connected to MongoDB');

        // Start server only after successful DB connection
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error('❌ MongoDB connection error:', err));
}
