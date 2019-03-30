import axios from 'axios';
import Glide from '@glidejs/glide';

const marketplaceURL = 'https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery/';
const downloadStat = document.querySelector('.downloads span');
const ratingStat = document.querySelector('.rating');

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

// preview slideshow
new Glide('.glide', {
  type: 'carousel',
  autoplay: 5000,
  animationDuration: 1000
}).mount();
