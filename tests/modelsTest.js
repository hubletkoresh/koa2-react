/*
const { expect } = require('chai');
const { Utils, Logger } = require('common');
const { User, Comment } = require('models');
const { MongoDatabase } = require('database');

const db = new MongoDatabase(encodeURI(`mongodb://${process.env['MONGO_TEST_USER']}:${process.env['MONGO_TEST_PASS']}@${process.env['MONGO_TEST_HOST']}/testdb`));
//Change database to the test one
User.DB = db;
Comment.DB = db;

describe('User model:', async function() {
  Logger.info(`Testing user model. Database ${User.DB.url} and collection ${User.DATASTORE}`);
  it('tests whether connection works', async function() {
    await User.where({username: 'nopestitynopes'}); //this will create the collection implicitly
    const count = await User.DB.connect().then(db=>db.collection(User.DATASTORE).count());
    expect(count).to.equal(0);
  });
  it('inserts a user into the database', async function(){
    let newUser = new User({username: 'engi', avatar: 'http://i0.kym-cdn.com/photos/images/newsfeed/000/820/444/f64.gif'});
    let inserted = await newUser.save();
    expect(inserted).to.be.an('object');
    expect(newUser.id).to.be.a('string');
  });
  it('inserts multiple users into the database', async function(){
    let newUsers = await User.insert([
      {
        username: 'bunny',
        avatar: 'http://3.bp.blogspot.com/-fGQcKmfH_hY/UgQb8T-A9WI/AAAAAAAAEwI/cT7SWjTiwg4/s1600/7+normal,+hapless.jpg'
      },
      {
        username: 'penny',
        avatar: 'https://i.ytimg.com/vi/HqkoWv-Jfto/maxresdefault.jpg'
      },
      {
        username: 'mrnode',
        avatar: 'https://www.mrnode.tk/tophatlogo%20(2).png'
      }
    ]);
    expect(newUsers).to.have.length(3);
  })
  it('updates users in the database', async function(){    
    let updatedCount = await User.update({username: 'penny'}, {favouriteWeapon: 'Jet Hammer'});
    expect(updatedCount).to.equal(1);    
    let mrNode = await User.find({username: 'mrnode'});
    expect(mrNode.id).to.be.a('string');
    mrNode.favouriteWeapon = 'v8';    
    let inserted = await mrNode.save();    
    expect(inserted).to.equal(false);
    mrNode = await User.find({favouriteWeapon: 'v8'});    
    expect(mrNode.favouriteWeapon).to.equal('v8');
    let penny = await User.find({username: 'penny'});
    expect(penny.favouriteWeapon).to.equal('Jet Hammer');
  })
  it('finds many users from the database', async function(){
    let usersWithAvatars = await User.where({avatar: { '$exists': true }});
    expect(usersWithAvatars).to.have.length(4);
  })
  it('cleans up all the users in the database', async function(){
    let allUsers = await User.where();
    expect(allUsers).to.have.length(4);
    await allUsers[0].delete(); //delete one using instance method
    let count = await User.count();
    expect(count).to.equal(3);
    let deletedCount = await User.delete({username: allUsers[1].username});//delete a user using static method
    expect(deletedCount).to.equal(1);    
    count = await User.count();
    expect(count).to.equal(2);
    await User.delete(); //delete the rest
    count = await User.count();
    expect(count).to.equal(0);   
  })
});
//Test associations between user and comment
describe('Comment', function() {
  Logger.info(`Testing comment model. Database ${Comment.DB.url} and collection ${Comment.DATASTORE}`);
  it('tests whether connection works', async function() {    
    const count = await Comment.count();
    expect(count).to.equal(0);
  });
  it('posts a comment as a user', async function(){
    //create a user
    let user = new User({username: 'XxX_must4p4sk4_XxX'});
    let insered = await user.save();
    expect(insered).to.be.an('object');
    let commentsAdded = await user.addComments('I like trains');    
    let foundComment = await Comment.find({userId: user.id});
    expect(foundComment.text).to.equal(commentsAdded[0].text);
  });
  it('posts another comment as a user', async function(){
    let user = await User.find({username: 'XxX_must4p4sk4_XxX'});
    let commentsAdded = await user.addComments('N0sc0p3d bi4tch!');  
    let count = await Comment.count();
    expect(count).to.equal(2);
  })
  it('likes a comment', async function(){
    let user = await User.find({username: 'XxX_must4p4sk4_XxX'});
    let comment = (await user.comments)[0];
    let likes = Math.round(Math.random()*10)+1;
    comment.likes += likes;
    await comment.save();
    comment = await Comment.find(comment.id);
    expect(comment.likes).to.equal(likes);
  })
  it('updates an existing comment', async function(){
    let user = await User.find({username: 'XxX_must4p4sk4_XxX'});
    let comment = (await user.comments)[0];
    let text = 'Looks like I was really high that time...';
    comment.text = text;
    await comment.save();
    comment = await Comment.find(comment.id);
    expect(comment.text).to.equal(text);
  })
  it('cleans up all the comments in the database', async function(){
    let users = await User.where();    
    const toDelete = [];
    for(let i=0; i<users.length;i++){      
      toDelete.push(users[i].delete());
      toDelete.concat((await users[i].comments).map(comment=>comment.delete()));      
    }
    await Promise.all(toDelete);
    const count = await User.count();
    expect(count).to.equal(0);
    const commentCount = await Comment.count();
    expect(commentCount).to.equal(0);    
  })
});

after(async function(){
  Logger.info('Cleanup: Dropping user collection');
  await User.DB.connect().then(db=>db.dropCollection(User.DATASTORE));
  Logger.info('Cleanup: Dropping comment collection');
  await Comment.DB.connect().then(db=>db.dropCollection(Comment.DATASTORE));
})

//*/