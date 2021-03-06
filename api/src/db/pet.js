const nanoid = require('nanoid')

const createPetModel = db => {
  return {
    findMany(filter) {
      return db.get('pet')
        .filter(filter)
        .orderBy(['createdAt'], ['desc'])
        .value()
    },

    findOne(filter) {
      return db.get('pet')
        .find(filter)
        .value()
    },

    create(pet) {
      const created = new Date()
      const newPet = {id: nanoid(), createdAt: created.toISOString(), ...pet}
      
      db.get('pet')
        .push(newPet)
        .write()

      return newPet
    }
  }
}

module.exports = createPetModel
