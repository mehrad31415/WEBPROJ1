
const artists = JSON.parse(ejsArtists);

for (let i = 0; i < artists.length; i++){
    const artistTemp = new Artists(
        artists[i].artistName,
        artists[i].artistYearBirth,
        artists[i].artistYearDeath,
        artists[i].artistLink);
    artistTemp.role = artists[i].artistRole;
    artistTemp.info = artists[i].artistInfo;
    arrayTemp = artists[i].artistArray.split(',');
    for (let j = 0; j < arrayTemp.length; j++){
        artistTemp.infoArray.push(arrayTemp[j]);
    }
    artistTemp.toTooltip();
}