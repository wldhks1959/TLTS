// adminController.js
const db = require('../config/db');

exports.getHobbyKeywords = (req, res) => {
    const query = 'SHOW COLUMNS FROM hobbies';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching columns:', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.status(200).json(results);
        }
    });
};

// Assuming this is part of a controller file such as hobbyController.js

exports.saveHobby = (req, res) => {
    const hobbyData = req.body;  // Assuming hobby data is sent as JSON in the request body

    // Check if the hobby exists in the database
    const hobbyId = hobbyData.hobby_id;
    const queryCheck = `SELECT * FROM hobbies WHERE hobby_id = ?`;

    db.query(queryCheck, [hobbyId], (err, results) => {
        if (err) {
            console.error('Error checking hobby:', err);
            return res.status(500).send('Database query error');
        }
        if (results.length > 0) {
            // Hobby exists, perform an update
            const updateQuery = 'UPDATE hobbies SET ? WHERE hobby_id = ?';

            db.query(updateQuery, [hobbyData, hobbyId], (err, updateResults) => {
                if (err) {
                    console.error('Error updating hobby:', err);
                    return res.status(500).send('Error updating hobby');
                } else {
                    res.send('Hobby updated successfully');
                }
            });
        } else {
            // Hobby does not exist, perform an add
            const insertQuery = 'INSERT INTO hobbies SET ?';
            
            db.query(insertQuery, hobbyData, (err, insertResults) => {
                if (err) {
                    console.error('Error adding hobby:', err);
                    return res.status(500).send('Error adding hobby');
                } else {
                    res.send('Hobby added successfully');
                }
            });
        }
    });
};

