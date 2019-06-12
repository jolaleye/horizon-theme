import axios from 'axios';

const marketplaceURL = 'https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery/';
const downloadStat = document.getElementById('download-count');
const ratingStat = document.getElementById('rating');

// fetch stats
axios
  .post(
    marketplaceURL,
    {
      filters: [
        {
          criteria: [{ filterType: 7, value: 'jolaleye.horizon-theme-vscode' }]
        }
      ],
      flags: 914
    },
    {
      headers: {
        accept: 'application/json;api-version=3.0-preview.1',
        'content-type': 'application/json'
      }
    }
  )
  .then(({ data }) => {
    const stats = data.results[0].extensions[0].statistics;
    const downloadCount =
      stats.find(s => s.statisticName === 'install').value + stats.find(s => s.statisticName === 'updateCount').value;
    const rating = stats.find(s => s.statisticName === 'averagerating').value;
    downloadStat.innerHTML = downloadCount.toLocaleString();
    ratingStat.innerHTML = '★'.repeat(rating);
  });
