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
    }
};

module.exports = Mutations;
