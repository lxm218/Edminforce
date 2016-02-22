
let H = {
    getDepModule(){
        return {
            ClassStudent : KG.get('EF-ClassStudent'),
            Student : KG.get('EF-Student'),
            Customer : KG.get('EF-Customer')
        };

    },

    getCustomerByClassData(classData){
        let m = this.getDepModule();
        let list = m.ClassStudent.getAll({classID:classData._id});

        let rs = [];
        _.each(list, (doc)=>{
            let so = m.Student.getDB().findOne({_id : doc.studentID});

            let co = m.Customer.getDB().findOne({_id : so.accountID});

            rs.push(co);
        });

        return rs;
    }
};

KG.DataHelper = H;