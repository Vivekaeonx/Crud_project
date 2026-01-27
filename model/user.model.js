const db = require("../config/db")



exports.getUserId = (id,cd) =>{                                              
        const sql = 'select * from student where id=? and is_deleted=0'
        db.query(sql,[id],cd);
};
 

exports.putUser = (id, data, cd) => {
  const sql = 'UPDATE student SET s_name = ?, s_std = ?, gender = ?, adress = ? WHERE id = ? AND is_deleted = 0';
  db.query(sql, [data.s_name, data.s_std, data.gender, data.adress, id], cd);
}

exports.AddUser =(data,cd) =>{
  const sql ='insert into student(s_rollno, s_name, s_std, s_dob, gender, adress) values(?, ?, ? , ?, ?, ?)'
  db.query(sql,[data.s_rollno,data.s_name,data.s_std,data.s_dob,data.gender,data.adress],cd);
};

exports.DellUser =(id,cd) =>{
  const sql ='update student set is_deleted=1 where id = ? and is_deleted=0'
  db.query(sql,[id],cd)
};