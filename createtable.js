const db = require("./db");

(async () => {
  const exists = await db.schema.hasTable("users");

  if (!exists) {
    await db.schema.createTable("users", (table) => {
      table.increments("id");   // column: id
      table.string("name");     // column: name
      table.integer("age");     // column: age
    });
    console.log("Users table created");
  } else {
    console.log("Users table already exists");
  }
})();
