Meteor.startup(function () {


    var swimmersData=[

        //====
        {Student_Name:'Allen Liu',Primary_Guardia:'John Liu',Secondary_Guardia:'Alice Wu',Primary_Phon:'510-234-5678',
            Email:'jliu@gmail.com',Class_Level:"SPR1",Gender:'M',DOB:'8/3/06','Status':"" ,
            accountId:'jliu@gmail.com',location:'Fremont',
            _id:'jliu@gmail.com_Allen-Liu'
        },
        {Student_Name:'Daniel Liu',Primary_Guardia:'John Liu',Secondary_Guardia:'Alice Wu',Primary_Phon:'510-234-5678',
            Email:'jliu@gmail.com',Class_Level:"CRL1",Gender:'M',DOB:'4/13/09','Status':'',
            accountId:'jliu@gmail.com',location:'Fremont',
            _id:'jliu@gmail.com_Daniel-Liu'
        },
        {Student_Name:'Lily Liu',Primary_Guardia:'John Liu',Secondary_Guardia:'Alice Wu',Primary_Phon:'510-234-5678',
            Email:'jliu@gmail.com',Class_Level:"CHL2",Gender:'F',DOB:'4/8/03','Status':"",
            accountId:'jliu@gmail.com',location:'Fremont',
            _id:'jliu@gmail.com_Lily-Liu'
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
                level:item.Class_Level

            });
        })

    }

    if (DB.Swimmers.find({}).count() === 0) {
        resetData();
    }

    calTestData.resetSwimmers = resetData



});