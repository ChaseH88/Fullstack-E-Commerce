const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Mutations = {

  // CREATE ITEM
  async createItem(parent, args, ctx, info){
    // Check if logged in

    const item = await ctx.db.mutation.createItem({data: { ...args }}, info );
      return item
    },
    
    // UPDATE ITEM
    updateItem(parent, args, ctx, info){
      const updates = { ...args };
      //remove the id from the arguments
      delete updates.id;
      //run the update method
      return ctx.db.mutation.updateItem({
        data: updates,
        where: {
          id: args.id
        },
        info
      });
    }, 

    // DELETE ITEM
    async deleteItem(parent, args, ctx, info){
      const where = { id: args.id };
      // find the item
      const item = await ctx.db.query.item({ where }, `{id title}`)
      // check if they have permissions
      //##########
      // delete the item
      return ctx.db.mutation.deleteItem({ where }, info);
    },

    // SIGNUP
    async signup(parent, args, ctx, info){
      args.email = args.email.toLowerCase();
      //hash the password
      const password = await bcrypt.hash(args.password, 11);
      //create the user
      const user = await ctx.db.mutation.createUser({
        data: {
          ...args,
          password,
          permissions: { set: ["USER"] } //reference the ENUM
        }
      }, info); //info is returned to the client
      // generate the JWT for the new user
      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
      //set the cookie and send the response
      ctx.response.cookie("token", token, {
        httpOnly: true, //prevents JS from accessing the cookie
        maxAge: 1000 * 60 * 60 * 24 * 365 // set the life span of the cookie
      });
      // return the user to the browser
      return user;
    },

    // SIGN-IN
    async signin(parent, { email, password }, ctx, info){
      //check if user exist
      const user = await ctx.db.query.user({ where: { email }});
      if(!user){
        throw new Error(`No account exist for ${email}`);
      }
      //check if password is correct
      const valid = await bcrypt.compare(password, user.password);
      if(!valid) {
        throw new Error("Invalid Password");
      }
      //generate the JWT
      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
      //set the cookie
      ctx.response.cookie("token", token, {
        httpOnly: true, //prevents JS from accessing the cookie
        maxAge: 1000 * 60 * 60 * 24 * 365 // set the life span of the cookie
      });
      //return the user
      return user;
    },

    // SIGN-OUT
    signout(parent, args, ctx, info){
      ctx.response.clearCookie("token");
      return { message: "You have signed out." }
    }
};

module.exports = Mutations;
