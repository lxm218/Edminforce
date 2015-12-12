Meteor.startup(function () {


    var swimmersData=[

        //====
        {Student_Name:'Allen Liu',Primary_Guardia:'John Liu',Secondary_Guardia:'Alice Wu',Primary_Phon:'510-234-5678',
            Email:'jliu@gmail.com',Class_Level:"CRL3",Gender:'M',DOB:'8/3/06','Status':"" ,
            accountId:'jliu@gmail.com',location:'Fremont',
            _id:'jliu@gmail.com_Allen-Liu', birthday:'03/01/2000'
        },
        {Student_Name:'Daniel Liu',Primary_Guardia:'John Liu',Secondary_Guardia:'Alice Wu',Primary_Phon:'510-234-5678',
            Email:'jliu@gmail.com',Class_Level:"MST2",Gender:'M',DOB:'4/13/09','Status':'',
            accountId:'jliu@gmail.com',location:'Fremont',
            _id:'jliu@gmail.com_Daniel-Liu', birthday:'12/01/2009'
        },
        {Student_Name:'Lily Liu',Primary_Guardia:'John Liu',Secondary_Guardia:'Alice Wu',Primary_Phon:'510-234-5678',
            Email:'jliu@gmail.com',Class_Level:"SPR2",Gender:'F',DOB:'4/8/03','Status':"",
            accountId:'jliu@gmail.com',location:'Fremont',
            _id:'jliu@gmail.com_Lily-Liu',birthday:'03/01/2008'
        },
        {Student_Name:'Kevin Liu',Primary_Guardia:'John Liu',Secondary_Guardia:'Alice Wu',Primary_Phon:'510-234-5678',
            Email:'jliu@gmail.com',Class_Level:"GLD2",Gender:'F',DOB:'4/8/03','Status':"",
            accountId:'jliu@gmail.com',location:'Fremont',
            _id:'jliu@gmail.com_Kevin-Liu',birthday:'12/11/2010'
        },

        //========
        {Student_Name:'Angle He',Primary_Guardia:'',Secondary_Guardia:'',Primary_Phon:'',
            Email:'jbhe@gmail.com',Class_Level:"MST1",Gender:'',DOB:'','Status':"",
            accountId:'jbhe@gmail.com',location:'Dublin',
            _id:'jbhe@gmail.com_Angle-He'
        },
        {Student_Name:'Mattew He',Primary_Guardia:'',Secondary_Guardia:'',Primary_Phon:'',
            Email:'jbhe@gmail.com',Class_Level:"RCR3",Gender:'',DOB:'','Status':'',
            accountId:'jbhe@gmail.com',location:'Dublin',
            _id:'jbhe@gmail.com_Mattew-He'
        },

        //=========
        {Student_Name:'Mia Fear',Primary_Guardia:'',Secondary_Guardia:'',Primary_Phon:'',
            Email:'jandmfear@gmail.com',Class_Level:"BUB3",Gender:'',DOB:'','Status':'',
            accountId:'jandmfear@gmail.com',location:'Fremont',
            _id:'jandmfear@gmail.com_Mia-Fear'
        },
        {Student_Name:'David Fear',Primary_Guardia:'',Secondary_Guardia:'',Primary_Phon:'',
            Email:'jandmfear@gmail.com',Class_Level:"SPR3",Gender:'',DOB:'','Status':'',
            accountId:'jandmfear@gmail.com',location:'Fremont',
            _id:'jandmfear@gmail.com_David-Fear'
        },

        //==========
        {Student_Name:'Arush Rojan',Primary_Guardia:'',Secondary_Guardia:'',Primary_Phon:'',
            Email:'dave_IrisRojan@gmail.com',Class_Level:"CRL1",Gender:'',DOB:'','Status':'',
            accountId:'dave_IrisRojan@gmail.com',location:'Dublin',
            _id:'dave_IrisRojan@gmail.com_Arush-Rojan'
        }

    ]

    function resetData(){
        DB.Swimmers.remove({})

        swimmersData.forEach(function(item){
            DB.Swimmers.insert({  //account1 第1个孩子
                _id:item._id,
                name: item.Student_Name,
                accountId: item.accountId,
                location:item.location,
                level:item.Class_Level,
                birthday: item.birthday
            });
        })

    }

    if (DB.Swimmers.find({}).count() === 0) {
        resetData();
    }

    calTestData.resetSwimmers = resetData



});