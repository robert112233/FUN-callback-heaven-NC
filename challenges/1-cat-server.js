const request = require('../utils/server');

function checkServerStatus(callback) {
  request('/status', (err, status) => {
    if (err) callback(err);
    callback(null, status);
  });
}

function fetchBannerContent(callback) {
  request('/banner', (err, banner) => {
    if (err) callback(err);
    const updatedBanner = { ...banner };
    updatedBanner.copyrightYear = 2022;
    callback(null, updatedBanner);
  });
}

function fetchAllOwners(callback) {
  request('/owners', (err, owners) => {
    if (err) callback(err);
    const newOwners = owners.map(owner => {
      return owner.toLowerCase();
    });
    callback(null, newOwners);
  });
}

function fetchCatsByOwner(name, callback) {
  request(`/owners/${name}/cats`, (err, cats) => {
    if (err) callback(err);
    else callback(null, cats);
  });
}

function fetchCatPics(picArr, callback) {
  const jpgArr = [];
  if (picArr.length === 0) {
    callback(null);
  }
  picArr.forEach(str => {
    request(`/pics/${str}`, (err, pic) => {
      if (err) jpgArr.push('placeholder.jpg');
      else jpgArr.push(pic);
      if (picArr.length === jpgArr.length) {
        callback(null, jpgArr);
      }
    });
  });
}

function fetchAllCats() {}

function fetchOwnersWithCats() {}

function kickLegacyServerUntilItWorks() {}

function buySingleOutfit() {}

module.exports = {
  buySingleOutfit,
  checkServerStatus,
  kickLegacyServerUntilItWorks,
  fetchAllCats,
  fetchCatPics,
  fetchAllOwners,
  fetchBannerContent,
  fetchOwnersWithCats,
  fetchCatsByOwner
};
