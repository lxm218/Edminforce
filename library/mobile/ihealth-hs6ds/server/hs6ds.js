Measurements = new Mongo.Collection('measurements');
Devices = new Mongo.Collection('devices');

// try {
//   var data = YAML.safeLoad(Assets.getText('hs6ds-spec.yml'));
//   console.log(data);
// } catch (e) {
//   console.log(e);
// }

let mkResponse = ({QueueNum, ResultMessage, ReturnValue, Result = 1}) => {
  let TS = (new Date()).valueOf();
  let response = {
    Result, TS, QueueNum, ResultMessage, ReturnValue
  };
  return response;
};

let mkRestAPI = (url, func) => {
  WebApp.connectHandlers.use(url, function(req, res, next) {
    console.log("req", req.body)
    let response = func(req.body);
    // check(arg1, String);
    // check(arg2, [Number]);
    // if (/* you want to throw an error */) {
    //   throw new Meteor.Error("pants-not-found", "Can't find my pants");
    // }
    console.log("response", response)
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(JSON.stringify(response));
    res.end();
  });
};

// 1.regional domain request
// HHH should this be based on a list of Sc/Sv?
mkRestAPI("/net_device/get_mapping", ({QueueNum, Sc, Sv}) => {
  if(R.isNil(Sc) && R.isNil(Sv)) {
    return mkResponse({QueueNum, ResultMessage: 201, Result: 4, ReturnValue: 'Bad request format'});
  } else {
    let regionMap = {
      US: {
        Sc: ['d52aa0612e9108a934051b4f5070920d'],
        Sv: ['085a48d31f479f350ecda31084909f67'],
        UrlVar: 'https://www.ihealth.com:8080',
        TimeZone: -8
      },
      CN: {
        Sc: [],
        Sv: [],
        UrlVar: 'https://www.ihealth.com:8080',
        TimeZone: +8
      },
      EU: {
        Sc: [],
        Sv: [],
        UrlVar: 'https://www.ihealth.com:8080',
        TimeZone: 0
      }
    };

    let regionLookup = (Sc, Sv) => {
      let f = (regionFound, region) => {
        let regionDetails = regionMap[region];

        // skip search if region is already found
        if(R.isNil(regionFound)) {
          let matchRegion = R.contains(Sc, regionDetails.Sc) || R.contains(Sv, regionDetails.Sv);
          return (matchRegion ? region : null);
        } else {
          return regionFound;
        };
      };
      // HHH should we default to US?
      return R.reduce(f, null, R.keys(regionMap)) // || 'US';
    };
    let region = regionLookup(Sc, Sv);
    if(region) {
      let ReturnValue = {
        Region: region,
        UrlVar: regionMap[region].UrlVar,
        TimeZone: regionMap[region].TimeZone
      };
      return mkResponse({QueueNum, ResultMessage: 100, ReturnValue});
    } else {
      return mkResponse({QueueNum, ResultMessage: 200.01, Result: 2, ReturnValue: 'Sc/Sv not found in Region Map'});
    };
  }
});

// 2.3.1 Certification request
mkRestAPI("/net_device/auth", ({QueueNum}) => {
  let ReturnValue = uuid.v1().replace('-','').toUpperCase();
  return mkResponse({QueueNum, ResultMessage: 100.1, ReturnValue});
});
// 2.3.2 returnedto cloud encrypted random number
mkRestAPI("/net_device/auth", ({QueueNum, RN1}) => {
  let ReturnValue;
  let success = true; // cloud to device Authentication
  if (success) {
    ReturnValue = RN1;
  } else {
    ReturnValue = null;
  };

  return mkResponse({QueueNum, ResultMessage: 100, ReturnValue});
});

// 3. Get Product Configuration Information
mkRestAPI("/net_device/product_set", ({QueueNum, Unencrypted}) => {
  let encrypted = CryptoJS.AES.encrypt(Unencrypted, "Passphrase");
  console.log('encrypted ' + Unencrypted + ' to ' + encrypted);
  let ReturnValue = {
    IsEncrypted: 0,
    UserProfiles: 'MTAxMTAwMTExMDAxMTAxMDExMTAwMTAwMTAwMDAw',
    Encrypted: encrypted.toString()
	};
  return mkResponse({QueueNum, ResultMessage: 100, ReturnValue});
});

// 4. Product data communications
mkRestAPI("/net_device/product_data", ({QueueNum}) => {
  let ReturnValue = 1;
  return mkResponse({QueueNum, ResultMessage: 100, ReturnValue});
});

// 5. Networking equipment upgrade license inquiries
mkRestAPI("/net_device/upgrage_auth", ({QueueNum}) => {
  let ReturnValue = {
        Auth: 0
	};
  return mkResponse({QueueNum, ResultMessage: 100, ReturnValue});
});

// HS6 auth
// 1. User login authentication
mkRestAPI("/verify.htm", ({QueueNum}) => {
  let region = 'US';
  let RegionFlag;
  switch(region) {
    case 'CN':
      RegionFlag = 0;
      break;
    case 'US':
      RegionFlag = 1;
      break;
    case 'FR':
      RegionFlag = 2;
      break;
    default:
      RegionFlag = 0;
  };

  let ReturnValue = {
    AccessToken: 'nPBECdZ-Ur86T41OFhmxHcxqJDO4ZvRdmLVFRBuUT-UZSCcMEzQZc4ogsfRJrXmGweXqXiW6QCX95ONZtHlFKsLHKF6EAUYkxxReCGVtH6X2Ew1h5A6ZkVmdMHJL7XtFQFx04l9fWuOru2ugzoKc9A',
    Expires: 1435137013,
    ID: 749553,
    RefreshToken: 'x1hQYTF9vnMC7ECHDjx6a3dJKgDTf0uojxKmx1VpboFU-YWfDdflv2zYRgo0NwnUEI4O9FuFLDIR9bNqfu16AvVCwEcZJwc3rGkpGWBdqDE8D1ir7JCS3Wi9EkngyrVWCce92d5fbuUnkbB5BSSA0w',
    RegionHost: 'https://api.ihealthlabs.com:8443',
    RegionFlag
  };
  return mkResponse({QueueNum, ResultMessage: 100, ReturnValue});
});

// 2.  Binding networked devices
mkRestAPI("/user_netdevice_bind.htm", ({QueueNum}) => {
  let ReturnValue = {
    MAC: 'DeviceMac',
    Status: 1,
    Position: 1
  };
  return mkResponse({QueueNum, ResultMessage: 100, ReturnValue});
});


// Meteor.methods("add-numbers", (a=1, b=2) => {
//   return a + b;
// }, {
//   url: "add-numbers",
//   getArgsFromRequest: function (request) {
//     // Let's say we want this function to accept a form-encoded request with
//     // fields named `a` and `b`.
//     var content = request.body;
//
//     // Since form enconding doesn't distinguish numbers and strings, we need
//     // to parse it manually
//     return [ parseInt(content.a, 10), parseInt(content.b, 10) ];
//   }
// })
