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

function fetchAllCats(callback) {
  const allCats = [];
  fetchAllOwners((err, owners) => {
    if (err) callback(err);
    else
      owners.forEach(owner => {
        fetchCatsByOwner(owner, (err, cats) => {
          if (err) callback(err);
          allCats.push(cats);
          if (allCats.length === owners.length) {
            const flatCats = allCats.flat();
            callback(null, flatCats.sort());
          }
        });
      });
  });
}

function fetchOwnersWithCats(callback) {
  const arrOfOwnerObjs = [];
  fetchAllOwners((err, ownerData) => {
    if (err) console.log(err);
    ownerData.forEach((catOwner, index) => {
      fetchCatsByOwner(catOwner, (err, catData) => {
        arrOfOwnerObjs[index] = { owner: catOwner, cats: catData };
        if (
          arrOfOwnerObjs.length === ownerData.length &&
          arrOfOwnerObjs.includes(undefined) === false
        ) {
          console.log(arrOfOwnerObjs);
          callback(err, arrOfOwnerObjs);
        }
      });
    });
  });
}

function kickLegacyServerUntilItWorks(callback) {
  request(`/legacy-status`, (err, data) => {
    if (err) kickLegacyServerUntilItWorks(callback);
    else callback(err, data);
  });
}

function buySingleOutfit(outfit, callback) {
  let hasBeenCalled = false;
  request(`/outfits/${outfit}`, (err, data) => {
    if (err) callback(err);
    else if (!hasBeenCalled) callback(err, data);
    hasBeenCalled = true;
  });
}

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
