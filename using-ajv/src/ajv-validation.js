var Ajv = require('ajv');
var ajv = new Ajv({allErrors: true});

var schema = {
	"required": ["store", "upc", "banner"],
	"properties":{
	  "store": { "type": "integer", "minimum": 1000, "maxLength": 5},
	  "temperatureIndicator": { "type": "string"},
	  "unitPromoPrice": {},
	  "unitRegularPrice": {"type": "number", "minimum" : 0},
	  "upc": {"type" : "string", "minLength": 13},
	  "products" : {"type":"array", "maxItems": 3, "uniqueItems": true, "items": { "type": "integer" }},
	  "banner" : {
	  	"type" : "object", "required" : ["name", "url", "location"],
	  	"properties": {
	  		"name": {"type":"string"},
	  		"url" : {"type" :"string", "pattern": "https://www.[\\w]+.com"},
	  		"location" : {"type": "string"}
	  	},
	  	"additionalProperties" : false
	  }
	},
	"additionalProperties": true
};

var validate = ajv.compile(schema);

var validStoreData = {
	"store":2222,
	"foo": "abc",
	"bar": 2,
	"unitPromoPrice": 23,
	upc:'123456789abcdefgh',
	"products":[1,3,2],
	"banner" : {
		"name" : "abcd3",
		"url" : "https://www.asd12.com",
		"location": "uk"
	}
};

test(validStoreData);

function test(data) {
  var valid = validate(data);
  if (valid) console.log('Valid!');
  else console.log('Invalid: ' + ajv.errorsText(validate.errors));
}