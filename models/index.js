const Band = require('./Band')
const Musician = require('./Musician')

Band.hasMany(Musician, { as: 'musicians' });
Musician.belongsTo(Band, {
    foreignKey: 'bandId',
    as: 'band'
});

module.exports = {
    Band,
    Musician
};
