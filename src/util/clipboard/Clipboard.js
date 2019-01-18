import { clipboard } from 'electron';
// const {binding} = require('./../../../lib/addons.node');
import { Database } from 'sqlite3';

class Clipboard {
  static readBuffer() {
    let availableFormats = clipboard.read('CBF_TEXT');
    // console.log("hello_chenchen: " + binding.hello());
    // console.log("hello_chenchen: " + JSON.stringify(availableFormats) + "length: " + availableFormats.length);
    console.log(Database);

    var db = new Database(':memory:');

    db.serialize(function() {
      db.run("CREATE TABLE lorem (info TEXT)");

      var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
      for (var i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
      }
      stmt.finalize();

      db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
        console.log(row.id + ": " + row.info);
      });
    });

    db.close();

    return availableFormats;
  }
}

export default Clipboard;