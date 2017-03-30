import Postcodes from '/imports/db/postcodes';

export default function getSuburb(inputValue = '') {
  return new Promise((resolve, reject) => {
    const re = new RegExp(inputValue.toUpperCase());
    const result = Postcodes.find({ suburb: re }, { limit: 6 }).fetch();
    resolve(result);
  });
}