const { Schema, model } = require("mongoose")

const schemaCountry = Schema({
  name: String,
  topLevelDomain: Array,
  alpha2Code: String,
  alpha3Code: String,
  callingCodes: Array,
  capital: String,
  altSpellings: Array,
  subregion: String,
  region: String,
  population: Number,
  latlng: Array,
  demonym: String,
  area: Number,
  timezones: Array,
  borders: Array,
  nativeName: String,
  numericCode: String,
  flags: Object,
  currencies: Array,
  languages: Array,
  translations: Object,
  regionalBlocs: Array,
});

const Countries = model("countries", schemaCountry);

module.exports = {Countries}