//"https://coronavirusapi.com/"

"https://coronavirusapi.com/getTimeSeries/[stateAbbreviation]"

function covidData() {
    if (!showCovid) {
      const formatedDate = moment.unix(date - 604800).format("YYYY-MM-DD");
      axios({
        method: "get",
        url: ``
      })
        .then((response) => {
          let current = response.data;
          setLatestCovid(current);
          //console.log(current);
        })
        .catch((error) => {
          console.log(error);
        });
    setShowCovid(!showCovid);
  }