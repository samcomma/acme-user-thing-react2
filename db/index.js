const Sequelize = require('sequelize') 
const conn = new Sequelize(process.env.DATABASE_URL)

const User = conn.define('user', {
  name: Sequelize.STRING
})

const Thing = conn.define('thing', {
  name: Sequelize.STRING
})

const UserThing = conn.define('userThing', {
  name: Sequelize.STRING
})


User.hasMany(UserThing)
Thing.hasMany(UserThing)
UserThing.belongsTo(User)
UserThing.belongsTo(Thing)


const syncAndSeed = ()=> {
  return conn.sync({ force: true })
    .then( async ()=> {
      const [moe, larry, shep, joe, curly] = await Promise.all([
        User.create({name: 'moe'}),
        User.create({name: 'larry'}),
        User.create({name: 'shep'}),
        User.create({name: 'joe'}),
        User.create({name: 'curly'})
      ])
      const [foo, bar, bazz] = await Promise.all([
        Thing.create({name: 'foo'}),
        Thing.create({name: 'bar'}),
        Thing.create({name: 'bazz'})
      ])
      await Promise.all([
        UserThing.create({ userId: moe.id, thingId: foo.id}),
        UserThing.create({ userId: moe.id, thingId: foo.id}),
        UserThing.create({ userId: larry.id, thingId: bazz.id}),
        UserThing.create({ userId: larry.id, thingId: foo.id}),
        UserThing.create({ userId: shep.id, thingId: bar.id})
      ])
  })
}


module.exports = {
  syncAndSeed,
  models: {
    User, 
    Thing, 
    UserThing
  }
}