Meteor.startup(function () {
    DB.Swimmers.remove()


    var swimmersData=[

        //====
        {Student_Name:'Allen Liu',Primary_Guardia:'John Liu',Secondary_Guardia:'Alice Wu',Primary_Phon:'510-234-5678',
            Email:'jliu@gmail.com',Class_Level:"SPR I",Gender:'M',DOB:'8/3/06','Status':"" ,
            accountId:'jliu@gmail.com',
            _id:'jliu@gmail.com_Allen-Liu'
        },
        {Student_Name:'Daniel Liu',Primary_Guardia:'John Liu',Secondary_Guardia:'Alice Wu',Primary_Phon:'510-234-5678',
            Email:'jliu@gmail.com',Class_Level:"CRL III",Gender:'M',DOB:'4/13/09','Status':'',
            accountId:'jliu@gmail.com',
            _id:'jliu@gmail.com_Daniel-Liu'
        },
        {Student_Name:'Lily Liu',Primary_Guardia:'John Liu',Secondary_Guardia:'Alice Wu',Primary_Phon:'510-234-5678',
            Email:'jliu@gmail.com',Class_Level:"CHL II",Gender:'F',DOB:'4/8/03','Status':"",
            accountId:'jliu@gmail.com',
            _id:'jliu@gmail.com_Lily-Liu'
        },

        //========
        {Student_Name:'Angle He',Primary_Guardia:'',Secondary_Guardia:'',Primary_Phon:'',
            Email:'jbhe@gmail.com',Class_Level:"MST I",Gender:'',DOB:'','Status':"",
            accountId:'jbhe@gmail.com',
            _id:'jbhe@gmail.com_Angle-He'
        },
        {Student_Name:'Mattew He',Primary_Guardia:'',Secondary_Guardia:'',Primary_Phon:'',
            Email:'jbhe@gmail.com',Class_Level:"RCR III",Gender:'',DOB:'','Status':'',
            accountId:'jbhe@gmail.com',
            _id:'jbhe@gmail.com_Mattew-He'
        },

        //=========
        {Student_Name:'Mia Fear',Primary_Guardia:'',Secondary_Guardia:'',Primary_Phon:'',
            Email:'jandmfear@gmail.com',Class_Level:"BUB III",Gender:'',DOB:'','Status':'',
            accountId:'jandmfear@gmail.com',
            _id:'jandmfear@gmail.com_Mia-Fear'
        },
        {Student_Name:'David Fear',Primary_Guardia:'',Secondary_Guardia:'',Primary_Phon:'',
            Email:'jandmfear@gmail.com',Class_Level:"SPP III",Gender:'',DOB:'','Status':'',
            accountId:'jandmfear@gmail.com',
            _id:'jandmfear@gmail.com_David-Fear'
        },

        //==========
        {Student_Name:'Arush Rojan',Primary_Guardia:'',Secondary_Guardia:'',Primary_Phon:'',
            Email:'dave_IrisRojan@gmail.com',Class_Level:"CRL I",Gender:'',DOB:'','Status':'',
            accountId:'dave_IrisRojan@gmail.com',
            _id:'dave_IrisRojan@gmail.com_Arush-Rojan'
        }

    ]

    if (DB.Swimmers.find({}).count() === 0) {
        swimmersData.forEach(function(item){
            DB.Swimmers.insert({  //account1 第1个孩子
                _id:item._id,
                name: item.Student_Name,
                accountId: item.accountId,
                location:'Fremont',
                level:item.Class_Level

            });
        })
    }

    /*
        * todo swimmers
        *
        * 去年报过名的
        * swimmer的亲戚，但未报过名
        * 正在参加的
        *
        * */
    //if (DB.Swimmers.find({}).count() === 0) {
    //
    //    DB.Swimmers.insert({  //account1 第1个孩子
    //        _id:'swimmer1',//swimmer1
    //        name: 'swimmer1',
    //        accountId: 'account1',
    //        location:'Fremont',
    //        level:'BUB I'
    //
    //    });
    //
    //    DB.Swimmers.insert({  //account1 第2个孩子
    //        _id:'swimmer2',// swimmer2
    //        name: 'swimmer2',
    //        accountId: 'account1',
    //        location:'Fremont',
    //        level:'BUB I'
    //
    //    });
    //
    //    //account2 有两个孩子
    //    _(2).times(function(n){
    //        DB.Swimmers.insert({
    //            _id:'swimmer'+(2+n+1), //swimmer3 swimmer4
    //            name: 'swimmer'+(2+n+1),
    //            accountId: 'account2',
    //            location:'Fremont',
    //            level:'BUB III'
    //
    //        });
    //    });
    //}

});