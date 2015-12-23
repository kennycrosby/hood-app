angular.module('App').factory('Utils', function($ionicLoading,$ionicPopup) {

	var Utils = {

    show: function() {
      $ionicLoading.show({
  	    animation: 'none',
  	    showBackdrop: true,
  	    maxWidth: 200,
  	    showDelay: 0,
        duration: 10000,
        template: '<div class="spinner"</div>'
      });
    },

    timer : '',

    showReload: function(cb) {
      var self = this;
      $('.exLoader').addClass('loading');
      setTimeout(cb, 300);
      self.timer = setTimeout(function(){
        self.hideReload();
      }, 3000);
    },

    hideReload: function() {
      clearTimeout(this.timer);
      $('.exLoader').removeClass('loading');
    },

    hide: function(){
      $ionicLoading.hide();
    },

		alertshow: function(tit,msg){
			var alertPopup = $ionicPopup.alert({
				title: tit,
				template: msg
			});
			alertPopup.then(function(res) {
				//console.log('Registrado correctamente.');
			});
		},

		errMessage: function(err) {

	    var msg = "Unknown Error...";

	    if(err && err.code) {
	      switch (err.code) {
	        case "EMAIL_TAKEN":
	          msg = "This Email has been taken."; break;
	        case "INVALID_EMAIL":
	          msg = "Invalid Email."; break;
          case "NETWORK_ERROR":
	          msg = "Network Error."; break;
	        case "INVALID_PASSWORD":
	          msg = "Invalid Password."; break;
	        case "INVALID_USER":
	          msg = "Invalid User."; break;
	      }
	    }
			Utils.alertshow("Error",msg);
	  },

      get_people : function() {
        return people;
      }

  };

	return Utils;

})
.filter('capitalize', function() {
  return function(input, all) {
    var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
    return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
  }
})

.filter('cut', function () {
    return function (value, numWords) {
        if (!value) return '';
        numWords = parseInt(numWords);
        if (value.split(/\s+/).length > numWords) {
          return value.split(/\s+/).slice(0,numWords).join(' ');
        } else {
          return value;
        }
    };
})
.filter('tel', function () {
    return function (tel) {
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 10: // +1PPP####### -> C (PPP) ###-####
                country = 1;
                city = value.slice(0, 3);
                number = value.slice(3);
                break;

            case 11: // +CPPP####### -> CCC (PP) ###-####
                country = value[0];
                city = value.slice(1, 4);
                number = value.slice(4);
                break;

            case 12: // +CCCPP####### -> CCC (PP) ###-####
                country = value.slice(0, 3);
                city = value.slice(3, 5);
                number = value.slice(5);
                break;

            default:
                return tel;
        }

        if (country == 1) {
            country = "";
        }

        number = number.slice(0, 3) + '-' + number.slice(3);

        return (country + " (" + city + ") " + number).trim();
    };
})

.filter('tweetLinky',['$filter',
  function($filter) {
    return function(text, target) {
      if (!text) return text;

      var replacedText = $filter('linky')(text, target);
      var targetAttr = "";
      if (angular.isDefined(target)) {
          targetAttr = ' target="' + target + '"';
      }

      var opennew = ' onclick=\"window.open(\'this.href\',\'_blank\',\'location=yes\')\;return false\;\"';

      // replace #hashtags and send them to twitter
      var replacePattern1 = /(^|\s)#(\w*[a-zA-Z_]+\w*)/gim;
      replacedText = text.replace(replacePattern1, '$1<a href="https://twitter.com/search?q=%23$2"' + targetAttr + ' >#$2</a>');
      // replace @mentions but keep them to our site
      var replacePattern2 = /(^|\s)\@(\w*[a-zA-Z_]+\w*)/gim;
      replacedText = replacedText.replace(replacePattern2, '$1<a href="https://twitter.com/$2"' + targetAttr + opennew + '>@$2</a>');
      return replacedText;
    };
  }
])
.filter('instagramLinky',['$filter',
    function($filter) {
        return function(text, target) {
            if (!text) return text;

            var replacedText = $filter('linky')(text, target);
            var targetAttr = "";
            if (angular.isDefined(target)) {
                targetAttr = ' target="' + target + '"';
            }
            // replace #hashtags and send them to twitter
            var replacePattern1 = /(^|\s)#(\w*[a-zA-Z_]+\w*)/gim;
            replacedText = text.replace(replacePattern1, '$1<a href="https://www.instagram.com/explore/tags/$2"' + targetAttr + '>#$2</a>');
            // replace @mentions but keep them to our site
            var replacePattern2 = /(^|\s)\@(\w*[a-zA-Z_]+\w*)/gim;
            replacedText = replacedText.replace(replacePattern2, '$1<a href="https://www.instagram.com/$2"' + targetAttr + '>@$2</a>');
            return replacedText;
        };
    }
])
.filter('hrefToJS', function ($sce, $sanitize) {
    return function (text) {
        var regex = /href="([\S]+)"/g;
        var newString = $sanitize(text).replace(regex, "onClick=\"window.open('$1', '_blank', 'location=yes')\"");
        return $sce.trustAsHtml(newString);
    }
});

function escapeHTML(text) {
  return $('<div/>').text(text).html()
}




var people = [
  {
    "lastname":"Aberi",
    "firstname":"Layla",
    "title": "Account Coordinator",
    "email":"layla.aberi@ddbcalifornia.com"
  },
  {
    "lastname" : "Bernacchi",
    "firstname" : "Nancy",
    "title" : "Account Director",
    "email" : "nancy.bernacchi@ddbcalifornia.com"
  },
  {
    "lastname":"Blaugh",
    "firstname":"Kristin",
    "title": "SVP Group Business Director",
    "email":"kristin.barbour@ddbcalifornia.com"
  },
  {
    "lastname":"Bukzin",
    "firstname":"Michael",
    "title": "Account Director",
    "email":"michael.bukzin@ddbcalifornia.com"
  },
  {
    "lastname":"Dillingham",
    "firstname":"Shannon",
    "title": "Account Supervisor",
    "email":"shannon.dillingham@sf.ddbremedy.com"
  },
  {
    "lastname":"Dirvianskis",
    "firstname":"Jennifer",
    "title": "Account Manager",
    "email":"jennifer.dirvianskis@ddbcalifornia.com"
  },
  {
    "lastname":"Durbin",
    "firstname":"Erin",
    "title": "Account Manager",
    "email":"erin.durbin@ddbcalifornia.com"
  },
  {
    "lastname":"Fung-A-Ling",
    "firstname":"Michael",
    "title": "EVP Managing Director",
    "email":"michael.ling@sf.ddbremedy.com"
  },
  {
    "lastname":"Graeff",
    "firstname":"Megan",
    "title": "Account Director",
    "email":"meg.graeff@ddbcalifornia.com"
  },
  {
    "lastname":"Gustafson",
    "firstname":"Callen",
    "title": "Account Manager",
    "email":"callen.gustafson@ddbcalifornia.com"
  },
  {
    "lastname":"Hines",
    "firstname":"Rebecca",
    "title": "Group Account Director",
    "email":"rebecca.hines@ddbcalifornia.com"
  },
  {
    "lastname":"Hrack",
    "firstname":"Lindsay",
    "title": "Account Manager",
    "email":"lindsay.hrack@ddbcalifornia.com"
  },
  {
    "lastname":"Kavaney",
    "firstname":"Kanok-Rakha",
    "title": "Account Supervisor",
    "email":"pepper.kavaney@ddbcalifornia.com"
  },
  {
    "lastname":"Larson",
    "firstname":"Kelly",
    "title": "Account Director",
    "email":"kelly.davis@sf.ddbremedy.com"
  },
  {
    "lastname":"Lucero",
    "firstname":"Lindsey",
    "title": "Account Director",
    "email":"lindsey.lucero@ddbcalifornia.com"
  },
  {
    "lastname":"Mascaro",
    "firstname":"Pedro",
    "title": "Global Account Director",
    "email":"pedro.mascaro@ddbcalifornia.com"
  },
  {
    "lastname":"McLeod",
    "firstname":"Ross",
    "title": "Account Supervisor",
    "email":"ross.mcleod@sf.ddbremedy.com"
  },
  {
    "lastname":"Rollins",
    "firstname":"Britton",
    "title": "Account Director",
    "email":"britton.rollins@sf.ddbremedy.com"
  },
  {
    "lastname":"Trinetti",
    "firstname":"Lea",
    "title": "Account Manager",
    "email":"lea.trinetti@ddbcalifornia.com"
  },
  {
    "lastname":"Turcotte",
    "firstname":"Jeffrey",
    "title": "Account Director",
    "email":"jeffrey.turcotte@sf.ddbremedy.com"
  },
  {
    "lastname":"Wakefield",
    "firstname":"Kevin",
    "title": "Business Lead",
    "email":"kevin.wakefield@ddbcalifornia.com"
  },
  {
    "lastname":"Wang",
    "firstname":"Alan",
    "title": "Account Supervisor",
    "email":"alan.wang@ddbcalifornia.com"
  },
  {
    "lastname":"Wood",
    "firstname":"Jordan",
    "title": "Account Supervisor",
    "email":"jordan.wood@ddbcalifornia.com"
  },
  {
    "lastname":"Dieringer",
    "firstname":"Margaret",
    "title": "Project Manager",
    "email":"maggie.dieringer@ddbcalifornia.com"
  },
  {
    "lastname":"Gibson",
    "firstname":"Amanda",
    "title": "Senior Project Manager",
    "email":"amanda.gibson@ddbcalifornia.com"
  },
  {
    "lastname":"Menge",
    "firstname":"Allison",
    "title": "Project Manager",
    "email":"yvonne.resendez@sf.ddbremedy.com"
  },
  {
    "lastname":"Resendez",
    "firstname":"Yvonne",
    "title": "Traffic Manager",
    "email":"jennifer.zhu@ddbcalifornia.com"
  },
  {
    "lastname":"Zhu",
    "firstname":"Jennifer",
    "title": "Project Manager",
    "email":"allison.menge@sf.ddbremedy.com"
  },
  {
    "lastname":"Harris",
    "firstname":"Stacey",
    "title": "Managing Director",
    "email":"stacey.grier@ddbcalifornia.com"
  },
  {
    "lastname":"Jensen",
    "firstname":"Jeanne",
    "title": "Strategic Planner",
    "email":"jeanne.jensen@sf.ddbremedy.com"
  },
  {
    "lastname":"Rovai",
    "firstname":"Mark",
    "title": "Planning Director",
    "email":"mark.rovai@ddbcalifornia.com"
  },
  {
    "lastname":"Smith",
    "firstname":"Aaron",
    "title": "Strategy Director",
    "email":"aaron.smith@ddbcalifornia.com"
  },
  {
    "lastname":"Walters",
    "firstname":"Kathryn",
    "title": "Strategy Director",
    "email":"kate.walters@ddbcalifornia.com"
  },
  {
    "lastname":"Winetroub",
    "firstname":"Meghan",
    "title": "Associate Director Strategy",
    "email":"meghan.tetwiler@ddbcalifornia.com"
  },
  {
    "lastname":"Barrows",
    "firstname":"Lena",
    "title": "Art Director ",
    "email":"lena.barrows@ddbcalifornia.com"
  },
  {
    "lastname":"Berg",
    "firstname":"Katelyn",
    "title": "Junior Art Director",
    "email":"katelyn.berg@ddbcalifornia.com"
  },
  {
    "lastname":"Bosiljevac",
    "firstname":"James",
    "title": "Group Creative Director",
    "email":"jim.bosiljevac@ddbcalifornia.com"
  },
  {
    "lastname":"Brown",
    "firstname":"Samantha",
    "title": "Associate Creative Director",
    "email":"sam.brown@ddbcalifornia.com"
  },
  {
    "lastname":"Cabral",
    "firstname":"Andre",
    "title": "Designer",
    "email":"andre.cabral@ddbcalifornia.com"
  },
  {
    "lastname":"Connor",
    "firstname":"John",
    "title": "Senior Copywriter",
    "email":"john.connor@ddbcalifornia.com"
  },
  {
    "lastname":"Day",
    "firstname":"Aubrey",
    "title": "Art Director",
    "email":"aubrey.day@ddbcalifornia.com"
  },
  {
    "lastname":"Guzeloglu",
    "firstname":"Tufan",
    "title": "Art Director",
    "email":"tufan.guzeloglu@ddbcalifornia.com"
  },
  {
    "lastname":"Holdeman",
    "firstname":"Andrew",
    "title": "Junior Copywriter",
    "email":"andy.holdeman@ddbcalifornia.com"
  },
  {
    "lastname":"Isaza",
    "firstname":"Pablo",
    "title": "Copywriter",
    "email":"pablo.isaza@ddbcalifornia.com"
  },
  {
    "lastname":"Johnston",
    "firstname":"Katie",
    "title": "Copywriter",
    "email":"katie.johnston@ddbcalifornia.com"
  },
  {
    "lastname":"Kologlu",
    "firstname":"Victoria",
    "title": "Senior Art Director",
    "email":"tor.kologlu@ddbcalifornia.com"
  },
  {
    "lastname":"Macdonald",
    "firstname":"Oliver",
    "title": "Junior Art Director",
    "email":"oliver.macdonald@ddbcalifornia.com"
  },
  {
    "lastname":"Oppedisano",
    "firstname":"Shaun",
    "title": "Copywriter",
    "email":"shaun.oppedisano@ddbcalifornia.com"
  },
  {
    "lastname":"Overfelt",
    "firstname":"Terry",
    "title": "Assoc Creative Dir / Art Dir",
    "email":"guy.overfelt@ddbcalifornia.com"
  },
  {
    "lastname":"Read",
    "firstname":"Daniel",
    "title": "Associate Creative Director",
    "email":"dan.read@ddbcalifornia.com"
  },
  {
    "lastname":"Sanchez",
    "firstname":"Aaron",
    "title": "Assoc Creative Dir/Copywriter",
    "email":"aaron.sanchez@ddbcalifornia.com"
  },
  {
    "lastname":"Sjoberg",
    "firstname":"Michelle",
    "title": "Assoc Creative Dir / Art Dir",
    "email":"michelle.sjoberg@ddbcalifornia.com"
  },
  {
    "lastname":"Stielow",
    "firstname":"Justin",
    "title": "Art Director",
    "email":"justin.stielow@ddbcalifornia.com"
  },
  {
    "lastname":"Whalen",
    "firstname":"Andrew",
    "title": "Copywriter",
    "email":"andy.whalen@ddbcalifornia.com"
  },
  {
    "lastname":"Whalen",
    "firstname":"Christina",
    "title": "Senior Art Director",
    "email":"christina.whalen@ddbcalifornia.com"
  },
  {
    "lastname":"Yeh",
    "firstname":"I-Hsuan",
    "title": "Assistant Art Director",
    "email":"eva.yeh@ddbcalifornia.com"
  },
  {
    "lastname":"Zukoski",
    "firstname":"Tracy",
    "title": "Creative Resource Manager",
    "email":"tracy.urquhart@ddbcalifornia.com"
  },
  {
    "lastname":"Falvo",
    "firstname":"Lisa",
    "title": "Content Business Manager",
    "email":"lisa.falvo@ddbcalifornia.com"
  },
  {
    "lastname":"Hernandez",
    "firstname":"Randy",
    "title": "Broadcast Business Assistant",
    "email":"randy.hernandez@ddbcalifornia.com"
  },
  {
    "lastname":"Jordan",
    "firstname":"Sheila",
    "title": "Traffic Manager",
    "email":"sheila.jordan@ddbcalifornia.com"
  },
  {
    "lastname":"Mirshah",
    "firstname":"Ramin",
    "title": "Director Business Affairs",
    "email":"trung.nguyen@ddbcalifornia.com"
  },
  {
    "lastname":"Nguyen",
    "firstname":"Trungnghia",
    "title": "Broadcast Traffic Manager",
    "email":"trungnghia.nguyen@ddbcalifornia.com"
  },
  {
    "lastname":"Baez",
    "firstname":"Whitney",
    "title": "Senior Print Producer",
    "email":"whitney.baez@ddbcalifornia.com"
  },
  {
    "lastname":"Drawbaugh",
    "firstname":"Jon",
    "title": "Head of Production",
    "email":"jon.drawbaugh@ddbcalifornia.com"
  },
  {
    "lastname":"Flaker",
    "firstname":"Matthew",
    "title": "Senior Producer",
    "email":"matt.flaker@ddbcalifornia.com"
  },
  {
    "lastname":"Hammer",
    "firstname":"Jessica",
    "title": "Senior Digital Producer",
    "email":"jessie.hammer@ddbcalifornia.com"
  },
  {
    "lastname":"Hernandez",
    "firstname":"Adrian",
    "title": "Integrated Producer",
    "email":"adrian.hernandez@ddbcalifornia.com"
  },
  {
    "lastname":"Holtz",
    "firstname":"Amanda",
    "title": "Senior Account Executive",
    "email":"amanda.holtz@ddbcalifornia.com"
  },
  {
    "lastname":"Rosenthal",
    "firstname":"Andrew",
    "title": "Senior Producer",
    "email":"andy.rosenthal@ddbcalifornia.com"
  },
  {
    "lastname":"Tobin",
    "firstname":"Mark",
    "title": "Executive Broadcast Producer",
    "email":"mark.tobin@ddbcalifornia.com"
  },
  {
    "lastname":"Diaz",
    "firstname":"Joshua",
    "title": "Content Producer",
    "email":"josh.diaz@ddbcalifornia.com"
  },
  {
    "lastname":"Hagedorn",
    "firstname":"James",
    "title": "Director of Content Production",
    "email":"james.hagedorn@ddbcalifornia.com"
  },
  {
    "lastname":"Hess",
    "firstname":"Nicholas",
    "title": "Studio Specialist",
    "email":"nick.hess@ddbcalifornia.com"
  },
  {
    "lastname":"Hopper",
    "firstname":"Joel",
    "title": "Editor",
    "email":"joel.hopper@ddbcalifornia.com"
  },
  {
    "lastname":"Miller",
    "firstname":"Jason",
    "title": "Studio Artist",
    "email":"jason.miller@sf.ddbremedy.com"
  },
  {
    "lastname":"Moore",
    "firstname":"Michael",
    "title": "Editor",
    "email":"michael.moore@ddbcalifornia.com"
  },
  {
    "lastname":"Weldon",
    "firstname":"Cameron",
    "title": "Production Artist",
    "email":"cameron.weldon@sf.ddbremedy.com"
  },
  {
    "lastname":"Yount",
    "firstname":"Ashley",
    "title": "Production Artist",
    "email":"rose.yount@ddbcalifornia.com"
  },
  {
    "lastname":"Ibanez",
    "firstname":"Tania",
    "title": "Finance Assistant",
    "email":"john.minty@ddbcalifornia.com"
  },
  {
    "lastname":"Lieu",
    "firstname":"Julianna",
    "title": "Accounting Supervisor",
    "email":"tania.ibanez@ddbcalifornia.com"
  },
  {
    "lastname":"Martinez",
    "firstname":"Maika",
    "title": "Client Accounting Manager",
    "email":"julianna.lieu@sf.ddbremedy.com"
  },
  {
    "lastname":"Minty",
    "firstname":"John",
    "title": "Chief Operating Officer",
    "email":"amy.zierath@ddbcalifornia.com"
  },
  {
    "lastname":"Zierath",
    "firstname":"Amy",
    "title": "Billing Manager",
    "email":"maika.martinez@ddbcalifornia.com"
  },
  {
    "lastname":"Doering",
    "firstname":"Kaitlin",
    "title": "Human Resources Manager",
    "email":"kaitlin.doering@ddbcalifornia.com"
  },
  {
    "lastname":"Vriavas",
    "firstname":"Lindsay",
    "title": "Senior Recruiter",
    "email":"lindsay.vriavas@ddbcalifornia.com"
  },
  {
    "lastname":"Beck",
    "firstname":"Kendall",
    "title": "Agency Concierge",
    "email":"kendall.beck@ddbcalifornia.com"
  },
  {
    "lastname":"Frash",
    "firstname":"Carrie",
    "title": "Director of Culture ",
    "email":"carrie.frash@ddbcalifornia.com"
  },
  {
    "lastname":"Kingston",
    "firstname":"Helena",
    "title": "Receptionist",
    "email":"helena.kingston@ddbcalifornia.com"
  },
  {
    "lastname":"Kjos",
    "firstname":"Elena",
    "title": "Agency Concierge",
    "email":"elena.kjos@ddbcalifornia.com"
  },
  {
    "lastname":"Roach",
    "firstname":"Jessica",
    "title": "Agency Concierge",
    "email":"jessica.roach@ddbcalifornia.com"
  },
  {
    "lastname":"Agbodjan",
    "firstname":"Georgia",
    "title": "Assistant",
    "email":"georgia.agbodjan@ddbcalifornia.com"
  },
  {
    "lastname":"Andrews",
    "firstname":"Seth",
    "title": "Freelance Assistant Editor",
    "email":"seth.andrews@ddbcalifornia.com"
  },
  {
    "lastname":"Beauregard",
    "firstname":"Jennifer",
    "title": "Freelance Digital Producer",
    "email":"jen.beauregard@ddbcalifornia.com"
  },
  {
    "lastname":"Calder",
    "firstname":"Ray",
    "title": "Media Accounting Supervisor",
    "email":"ray.calder@sf.ddbremedy.com"
  },
  {
    "lastname":"Campbell",
    "firstname":"Cathy",
    "title": "Freelance Art Director",
    "email":"cathy.campbell@sf.ddbremedy.com"
  },
  {
    "lastname":"Cendoma",
    "firstname":"Gabriel",
    "title": "Freelance Copywriter",
    "email":"gabriel.cedoma@ddbcalifornia.com"
  },
  {
    "lastname":"Corriveau",
    "firstname":"Jonathan",
    "title": "Freelance Motion GraphicArtist",
    "email":"jonathan.corriveau@ddbcalifornia.com"
  },
  {
    "lastname":"Courcier",
    "firstname":"Diana",
    "title": "Freelance Print Producer",
    "email":"diana.courcier@ddbcalifornia.com"
  },
  {
    "lastname":"Crosby",
    "firstname":"Kenneth",
    "title": "Freelance Creative Technologist",
    "email":"kenny.crosby@ddbcalifornia.com"
  },
  {
    "lastname":"Cummings",
    "firstname":"Alexander",
    "title": "Freelance Motion GraphicArtist",
    "email":"alec.cummings@ddbcalifornia.com"
  },
  {
    "lastname":"Eddleman",
    "firstname":"Angela",
    "title": "Freelance Bus Affairs Manager",
    "email":"angela.eddleman@ddbcalifornia.com"
  },
  {
    "lastname":"Filteau",
    "firstname":"Ellen",
    "title": "Freelance Account Manager",
    "email":"ellen.filteau@sf.ddbremedy.com"
  },
  {
    "lastname":"Fuerle",
    "firstname":"Torben",
    "title": "Freelance Retoucher",
    "email":"toby.fuerle@la.ddb.com"
  },
  {
    "lastname":"Geiger",
    "firstname":"Peter",
    "title": "Freelance Assistant Editor",
    "email":"peter.geiger@ddbcalifornia.com"
  },
  {
    "lastname":"Hom-Berry",
    "firstname":"Denise",
    "title": "Freelance Studio Specialist",
    "email":"denise.hom-berry@sf.ddbremedy.com"
  },
  {
    "lastname":"Huber",
    "firstname":"Stephen",
    "title": "Freelance Medical Director",
    "email":"steve.huber@sf.ddbremedy.com"
  },
  {
    "lastname":"Joyce",
    "firstname":"Peyton",
    "title": "Proofreader",
    "email":"peyton.joyce@ddbcalifornia.com"
  },
  {
    "lastname":"Khoury",
    "firstname":"Allison",
    "title": "Freelance Copywriter",
    "email":"allison.khoury@ddbcalifornia.com"
  },
  {
    "lastname":"Lemcke",
    "firstname":"Karen",
    "title": "Freelance Art Director",
    "email":"karen.lemcke@ddbcalifornia.com"
  },
  {
    "lastname":"Long",
    "firstname":"Michael",
    "title": "Associate Creative Director",
    "email":"mike.long@sf.ddbremedy.com"
  },
  {
    "lastname":"Moe",
    "firstname":"Diane",
    "title": "Freelance Copywriter",
    "email":"diane.moe@sf.ddbremedy.com"
  },
  {
    "lastname":"Reece",
    "firstname":"Deborah",
    "title": "Freelance Proofreader",
    "email":"deborah.reece@sf.ddbremedy.com"
  },
  {
    "lastname":"Stephenson",
    "firstname":"Susan",
    "title": "Freelance Creative Director",
    "email":"sue.stephenson@sf.ddbremedy.com"
  },
  {
    "lastname":"Toland",
    "firstname":"Christopher",
    "title": "Freelance Creative Director",
    "email":"chris.toland@ddbcalifornia.com"
  },
  {
    "lastname":"Van Bueren",
    "firstname":"Jeff",
    "title": "Freelance Proofreader",
    "email":"jeff.vanbueren@sf.ddbremedy.com"
  },
  {
    "lastname":"Wilson",
    "firstname":"Emil",
    "title": "Freelance Art Director",
    "email":"emil.wilson@ddbcalifornia.com"
  }
];


